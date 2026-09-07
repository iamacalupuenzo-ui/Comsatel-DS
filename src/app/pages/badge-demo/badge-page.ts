import { Component, computed, signal } from '@angular/core';
import { Badge, Icon, type BadgeSize, type BadgeVariant } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const VARIANTS: BadgeVariant[] = [
  'neutral',
  'brand',
  'success',
  'warning',
  'danger',
  'neutral-solid',
  'brand-solid',
  'success-solid',
  'warning-solid',
  'danger-solid',
  'outline',
];
const SIZES: BadgeSize[] = ['sm', 'md', 'lg'];
const ICON_OPTIONS = ['ninguno', 'inicio', 'final', 'ambos'] as const;
type IconOption = (typeof ICON_OPTIONS)[number];

@Component({
  selector: 'app-badge-page',
  imports: [Badge, Icon, DemoShell],
  templateUrl: './badge-page.html',
  styleUrl: './badge-page.css',
})
export class BadgePage {
  protected readonly variants = VARIANTS;
  protected readonly sizes = SIZES;
  protected readonly solidVariants: BadgeVariant[] = ['brand-solid', 'success-solid', 'warning-solid', 'danger-solid', 'neutral-solid'];
  protected readonly pillVariants: BadgeVariant[] = ['neutral', 'brand', 'success', 'warning', 'danger'];

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Variante', key: 'variant', options: VARIANTS, default: 'brand' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'toggle', label: 'Pill', key: 'pill', default: false },
    { kind: 'select', label: 'Ícono', key: 'icon', options: ICON_OPTIONS, default: 'ninguno' },
  ];

  protected readonly variant = signal<BadgeVariant>('brand');
  protected readonly size = signal<BadgeSize>('md');
  protected readonly pill = signal(false);
  protected readonly iconOption = signal<IconOption>('ninguno');

  protected onPlaygroundState(s: DemoState): void {
    if (s['variant']) this.variant.set(s['variant'] as BadgeVariant);
    if (s['size']) this.size.set(s['size'] as BadgeSize);
    if (s['pill'] !== undefined) this.pill.set(!!s['pill']);
    if (s['icon']) this.iconOption.set(s['icon'] as IconOption);
  }

  protected readonly showLeading = computed(() => this.iconOption() === 'inicio' || this.iconOption() === 'ambos');
  protected readonly showTrailing = computed(() => this.iconOption() === 'final' || this.iconOption() === 'ambos');

  protected readonly pgCode = computed(() => {
    const variantProp = this.variant() !== 'neutral' ? ` variant="${this.variant()}"` : '';
    const sizeProp = this.size() !== 'md' ? ` size="${this.size()}"` : '';
    const pillProp = this.pill() ? ` [pill]="true"` : '';
    const leading = this.showLeading() ? `\n  <cs-icon name="tag" [size]="12"></cs-icon>` : '';
    const trailing = this.showTrailing() ? `\n  <cs-icon name="x" [size]="12"></cs-icon>` : '';
    return `<cs-badge${variantProp}${sizeProp}${pillProp}>${leading}\n  Nueva función${trailing}\n</cs-badge>`;
  });
}
