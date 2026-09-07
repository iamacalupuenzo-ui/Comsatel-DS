import { Component, computed, input, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { highlight } from './highlight';

// Puerto 1:1 de CodeBlock en DocsComponents.tsx — versión standalone para
// secciones que no usan el Canvas/Toolbar completo de <app-demo-shell> (ej.
// Variantes y Tamaños en la página de Button, que en React envuelven el
// bloque de código directo bajo su propia caja, sin el selector de tema).
@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.html',
  styleUrl: './code-block.css',
})
export class CodeBlock {
  readonly code = input('');
  protected readonly copied = signal(false);

  protected readonly highlightedCode = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(highlight(this.code())),
  );

  constructor(private sanitizer: DomSanitizer) {}

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Sin permisos de portapapeles: no rompe el resto de la página.
    }
  }
}
