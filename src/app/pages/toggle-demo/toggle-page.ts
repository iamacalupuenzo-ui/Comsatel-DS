import { Component, computed, signal } from '@angular/core';
import { Toggle, type ToggleSize } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const SIZES: ToggleSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'app-toggle-page',
  imports: [Toggle, DemoShell],
  templateUrl: './toggle-page.html',
  styleUrl: './toggle-page.css',
})
export class TogglePage {
  protected readonly sizes = SIZES;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'toggle', label: 'Etiqueta', key: 'label', default: true },
    { kind: 'toggle', label: 'Descripción', key: 'description', default: false },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
  ];

  protected readonly pgSize = signal<ToggleSize>('md');
  protected readonly pgLabel = signal(true);
  protected readonly pgDescription = signal(false);
  protected readonly pgDisabled = signal(false);

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as ToggleSize);
    if (s['label'] !== undefined) this.pgLabel.set(!!s['label']);
    if (s['description'] !== undefined) this.pgDescription.set(!!s['description']);
    if (s['disabled'] !== undefined) this.pgDisabled.set(!!s['disabled']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [];
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgLabel()) props.push(`label="Notificaciones por correo"`);
    if (this.pgDescription()) props.push(`description="Recibe un resumen diario de la actividad."`);
    if (this.pgDisabled()) props.push(`[disabled]="true"`);
    props.push(`[checked]="true"`);
    const attrs = props.length ? `\n  ${props.join('\n  ')}\n` : '';
    return `<cs-toggle${attrs}></cs-toggle>`;
  });
}
