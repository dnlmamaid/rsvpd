import {Component, computed, effect, inject, input, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: "app-custom-icon",
  templateUrl: "./custom-icon.html",
  styleUrl: "./custom-icon.scss",
})
export class CustomIcon {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  readonly src = input.required<string>();
  readonly size = input<number | string>(28);

  readonly svg = signal<SafeHtml | null>(null);

  readonly resolvedSize = computed(() =>
    typeof this.size() === 'number' ? `${this.size()}px` : this.size()
  );

  readonly loadSvgEffect = effect(() => {
    this.http
      .get(this.src(), { responseType: 'text' })
      .subscribe(svg => this.svg.set(this.sanitizer.bypassSecurityTrustHtml(svg)));
  });
}
