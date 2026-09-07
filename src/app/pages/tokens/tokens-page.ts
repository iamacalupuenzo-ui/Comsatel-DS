import { Component, computed, signal } from '@angular/core';
import { ALL_TOKENS, type TokenSection } from 'comsatel-ds';

@Component({
  selector: 'app-tokens-page',
  templateUrl: './tokens-page.html',
  styleUrl: './tokens-page.css',
})
export class TokensPage {
  protected readonly query = signal('');
  protected readonly copiedValue = signal<string | null>(null);

  protected readonly sections = computed<TokenSection[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return ALL_TOKENS;

    return ALL_TOKENS.map((section) => ({
      ...section,
      groups: section.groups
        .map((group) => ({
          ...group,
          rows: group.rows.filter(
            (row) =>
              row.name.toLowerCase().includes(q) || row.usage.toLowerCase().includes(q),
          ),
        }))
        .filter((group) => group.rows.length > 0),
    })).filter((section) => section.groups.length > 0);
  });

  protected readonly totalMatches = computed(() =>
    this.sections().reduce(
      (sum, section) => sum + section.groups.reduce((s, g) => s + g.rows.length, 0),
      0,
    ),
  );

  protected isColor(value: string): boolean {
    return value.startsWith('#') || value.startsWith('rgb') || value.startsWith('rgba');
  }

  protected onQueryChange(value: string): void {
    this.query.set(value);
  }

  protected async copy(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.copiedValue.set(value);
      setTimeout(() => {
        if (this.copiedValue() === value) this.copiedValue.set(null);
      }, 1500);
    } catch {
      // Clipboard API sin permiso — no bloquea el resto de la página.
    }
  }
}
