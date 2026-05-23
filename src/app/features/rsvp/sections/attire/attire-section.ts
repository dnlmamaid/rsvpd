import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { Invite } from '../../rsvp.types';

interface AttireColorSet {
  name: string;
  role: string;
  hexes: string[]; // multiple hex variants for the set
}

interface AttireGuide {
  label: string;
  description: string;
  colors: AttireColorSet[];
}

@Component({
  selector: 'app-attire-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attire-section.html',
  styleUrl: './attire-section.scss',
})
export class AttireSection {
  readonly invite = input<Invite | null>(null);

  readonly title = signal('Kasuotan');

  // Palette sets (each is a small family of hex variants)
  private readonly champagne: AttireColorSet = {
    name: 'Champagne',
    role: 'Base color',
    hexes: ['#f7e4ce', '#f7e7ce', '#f7eace', '#f7eece', '#f7f1ce'],
  };

  private readonly cerulean: AttireColorSet = {
    name: 'Cerulean',
    role: 'Entourage / Abay',
    hexes: ['#00819f', '#00749f', '#00679f', '#005a9f', '#004c9f'],
  };

  private readonly terracotta: AttireColorSet = {
    name: 'Terracotta',
    role: 'Principal Sponsors',
    hexes: ['#cb5d43', '#cb6843', '#cb7343', '#cb7f43', '#cb8a43'],
  };

  private readonly mutedOlive: AttireColorSet = {
    name: 'Muted Olive',
    role: 'Guests',
    hexes: ['#a2c183', '#9dc183', '#98c183', '#93c183', '#8ec183'],
  };

  private readonly goldSet: AttireColorSet = {
    name: 'Gold',
    role: 'Guests',
    hexes: ['#ffc200', '#ffd700', '#ffec00', '#fdff00', '#e7ff00'],
  };

  private readonly guestGuides: Record<0 | 1 | 2, AttireGuide> = {
    0: {
      label: 'Principal Sponsors/Ninong at Ninang',
      description:
        "Para sa mga Ninong at Ninang, gamitin ang Champagne bilang base at Terracotta bilang pangunahing accent color.",
      colors: [this.champagne, this.terracotta],
    },
    1: {
      label: 'Entourage / Abay',
      description:
        'Para sa entourage, gamitin ang Champagne bilang base at Cerulean bilang pangunahing accent color.',
      colors: [this.champagne, this.cerulean],
    },
    2: {
      label: 'Pamilya at Kaibigan',
      description:
        'Para sa pamilya at mga kaibigan, gamitin ang Champagne bilang base at pumili ng Muted Olive o Gold bilang accent color.',
      colors: [this.champagne, this.mutedOlive, this.goldSet],
    },
  };

  readonly guide = computed(() => {
    const guestType = Number(this.invite()?.guestType);

    if (guestType === 0 || guestType === 1 || guestType === 2) {
      return this.guestGuides[guestType as 0 | 1 | 2];
    }

    return this.guestGuides[2];
  });

  // Provide per-gender lines depending on guest type. For family & friends (2)
  // use the new semi-formal definitions; otherwise keep the existing wording.
  readonly maleLines = computed(() => {
    const guestType = Number(this.invite()?.guestType);
    if (guestType === 2) {
      return [
        'Semi-formal',
        'Barong-inspired attire',
        'Polo (Long/Short Sleeves)',
        'Pantalon',
      ];
    }

    return ['Barong Tagalog', 'Kamisa de Tsino', 'Itim/Neutral na kulay na Pantalon'];
  });

  readonly femaleLines = computed(() => {
    const guestType = Number(this.invite()?.guestType);
    if (guestType === 2) {
      return [
        'Semi-formal',
        'Filipiniana-inspired attire',
        'Midi Dress',
        'Blouse at Pantalon/Palda',
      ];
    }

    return ['Moderno o Tradisyonal na Filipiniana Gown/Maxi Dress'];
  });

  readonly fullPalette = signal<AttireColorSet[]>([
    this.champagne,
    this.cerulean,
    this.terracotta,
    this.mutedOlive,
    this.goldSet,
  ]);
}
