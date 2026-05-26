import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { Invite } from '../../rsvp.types';

interface AttireColorSet {
  name: string;
  role: string;
  hexes: string[];
}

interface AttireGuide {
  label: string;
  description: string;

  image: {
    src: string;
    alt: string;
  };

  colors: AttireColorSet[];

  maleLines: string[];
  femaleLines: string[];
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

  readonly roleIntro = 'Para sa mga';
  readonly maleTitle = 'Para sa mga Lalaki';
  readonly femaleTitle = 'Para sa mga Babae';

  private readonly champagne: AttireColorSet = {
    name: 'Champagne',
    role: 'Base color',
    hexes: ['#f7e4ce', '#f7e7ce', '#f7eace', '#f7eece', '#f7f1ce'],
  };

  private readonly cerulean: AttireColorSet = {
    name: 'Cerulean',
    role: 'Abay',
    hexes: ['#00819f', '#00749f', '#00679f', '#005a9f', '#004c9f'],
  };

  private readonly terracotta: AttireColorSet = {
    name: 'Terracotta',
    role: 'Ninong at Ninang',
    hexes: ['#cb5d43', '#cb6843', '#cb7343', '#cb7f43', '#cb8a43'],
  };

  private readonly olive: AttireColorSet = {
    name: 'Olive',
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
      label: 'Ninong at Ninang',

      description:
        'Para sa mga Ninong at Ninang, gamitin ang Champagne bilang base at Terracotta bilang pangunahing accent color.',

      image: {
        src: 'assets/images/kasuotan-principal-sponsors.png',
        alt: 'Principal sponsors attire guide',
      },

      colors: [this.champagne, this.terracotta],

      maleLines: [
        'Barong Tagalog',
        'Kamisa de Tsino',
        'Itim/Neutral na kulay ng Pantalon',
      ],

      femaleLines: [
        'Moderno o Tradisyonal na Filipiniana Gown/Maxi Dress',
      ],
    },

    1: {
      label: 'Abay',

      description:
        'Para sa entourage, gamitin ang Champagne bilang base at Cerulean bilang pangunahing accent color.',

      image: {
        src: 'assets/images/kasuotan-entourage.png',
        alt: 'Entourage attire guide',
      },

      colors: [this.champagne, this.cerulean],

      maleLines: [
        'Barong Tagalog',
        'Kamisa de Tsino',
        'Itim/Neutral na kulay ng Pantalon',
      ],

      femaleLines: [
        'Moderno o Tradisyonal na Filipiniana Gown/Maxi Dress',
      ],
    },

    2: {
      label: 'Pamilya at Kaibigan',

      description:
        'Para sa pamilya at mga kaibigan, gamitin ang Champagne bilang base at pumili ng Muted Olive o Gold bilang accent color.',

      image: {
        src: 'assets/images/kasuotan-general.png',
        alt: 'Guest attire guide',
      },

      colors: [this.champagne, this.olive, this.goldSet],

      maleLines: [
        'Semi-formal',
        'Barong-inspired attire',
        'Polo (Long/Short Sleeves)',
        'Pantalon',
      ],

      femaleLines: [
        'Semi-formal',
        'Filipiniana-inspired attire',
        'Midi Dress',
        'Blusa at Pantalon/Palda',
      ],
    },
  };

  readonly guide = computed(() => {
    const guestType = Number(this.invite()?.guestType);

    return this.guestGuides[guestType as 0 | 1 | 2] ?? this.guestGuides[2];
  });

  readonly fullPalette = signal<AttireColorSet[]>([
    this.champagne,
    this.cerulean,
    this.terracotta,
    this.olive,
    this.goldSet,
  ]);
}