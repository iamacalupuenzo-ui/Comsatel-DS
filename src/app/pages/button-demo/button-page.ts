import { Component, computed, signal } from '@angular/core';
import { Button, Icon, type ButtonSize, type ButtonVariant } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'default', 'tertiary', 'subtle', 'link', 'destructive', 'success', 'warning'];
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg'];
const SIZE_ORDER: ButtonSize[] = ['lg', 'md', 'sm', 'xs'];
const SIZE_INFO: Record<ButtonSize, { label: string; usage: string }> = {
  lg: { label: 'Large', usage: 'Secciones hero y acciones primarias de modal.' },
  md: { label: 'Medium', usage: 'Formularios y la mayoría de acciones primarias a nivel de página.' },
  sm: { label: 'Small', usage: 'Por defecto. Tarjetas, sidebars y filas secundarias.' },
  xs: { label: 'X-Small', usage: 'Toolbars, tablas densas y controles inline.' },
};

@Component({
  selector: 'app-button-page',
  imports: [Button, Icon, DemoShell, CodeBlock],
  templateUrl: './button-page.html',
  styleUrl: './button-page.css',
})
export class ButtonPage {
  protected readonly variants = VARIANTS;
  protected readonly sizeOrder = SIZE_ORDER;
  protected readonly sizeInfo = SIZE_INFO;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Variante', key: 'variant', options: VARIANTS, default: 'primary' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'sm' },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
    { kind: 'toggle', label: 'Cargando', key: 'loading', default: false },
    { kind: 'toggle', label: 'Seleccionado', key: 'selected', default: false },
  ];

  protected readonly pgVariant = signal<ButtonVariant>('primary');
  protected readonly pgSize = signal<ButtonSize>('sm');
  protected readonly pgDisabled = signal(false);
  protected readonly pgLoading = signal(false);
  protected readonly pgSelected = signal(false);

  protected onPlaygroundState(s: DemoState): void {
    if (s['variant']) this.pgVariant.set(s['variant'] as ButtonVariant);
    if (s['size']) this.pgSize.set(s['size'] as ButtonSize);
    if (s['disabled'] !== undefined) this.pgDisabled.set(!!s['disabled']);
    if (s['loading'] !== undefined) this.pgLoading.set(!!s['loading']);
    if (s['selected'] !== undefined) this.pgSelected.set(!!s['selected']);
  }

  protected readonly pgCode = computed(() => {
    const variantProp = this.pgVariant() !== 'primary' ? ` variant="${this.pgVariant()}"` : '';
    const sizeProp = this.pgSize() !== 'sm' ? ` size="${this.pgSize()}"` : '';
    const disabledProp = this.pgDisabled() ? ` [disabled]="true"` : '';
    const loadingProp = this.pgLoading() ? ` [loading]="true"` : '';
    const selectedProp = this.pgSelected() ? ` [selected]="true"` : '';
    return `<cs-button${variantProp}${sizeProp}${disabledProp}${loadingProp}${selectedProp}>\n  Etiqueta del botón\n</cs-button>`;
  });

  /* Variantes */
  protected readonly variantsCode = VARIANTS.map((v) => `<cs-button variant="${v}">${v}</cs-button>`).join('\n');

  /* Estado seleccionado (demo local, sin DemoShell) */
  protected readonly selected = signal(true);
  protected toggleSelected(): void {
    this.selected.update((v) => !v);
  }
  protected readonly selectedCode = computed(
    () =>
      `<cs-button variant="default" [selected]="selected" (click)="selected = !selected">\n` +
      `  Botón seleccionado\n` +
      `</cs-button>`,
  );

  /* Estado cargando (demo local, sin DemoShell) */
  protected readonly isLoading = signal(true);
  protected toggleLoading(): void {
    this.isLoading.update((v) => !v);
  }
  protected readonly loadingCode = computed(
    () => `<cs-button variant="primary" [loading]="${this.isLoading()}">\n  Guardar cambios\n</cs-button>`,
  );
}
