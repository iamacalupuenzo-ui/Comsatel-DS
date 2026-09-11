import { Component, computed, signal } from '@angular/core';
import { Icon, Radio, RadioGroup, type RadioSize } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

interface ColorOption {
  value: string;
  label: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { value: 'red', label: 'Rojo' },
  { value: 'blue', label: 'Azul' },
  { value: 'yellow', label: 'Amarillo' },
  { value: 'green', label: 'Verde' },
];

const SIZES: RadioSize[] = ['sm', 'md', 'lg'];
const ORIENTATION_OPTIONS = ['vertical', 'horizontal'] as const;

@Component({
  selector: 'app-radio-page',
  imports: [Icon, Radio, RadioGroup, DemoShell, CodeBlock],
  templateUrl: './radio-page.html',
  styleUrl: './radio-page.css',
})
export class RadioPage {
  protected readonly colorOptions = COLOR_OPTIONS;
  protected readonly sizes = SIZES;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'select', label: 'Orientación', key: 'orientation', options: ORIENTATION_OPTIONS, default: 'vertical' },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
  ];
  protected readonly pgSize = signal<RadioSize>('md');
  protected readonly pgOrientation = signal<(typeof ORIENTATION_OPTIONS)[number]>('vertical');
  protected readonly pgDisabled = signal(false);

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as RadioSize);
    if (s['orientation']) this.pgOrientation.set(s['orientation'] as (typeof ORIENTATION_OPTIONS)[number]);
    if (s['disabled'] !== undefined) this.pgDisabled.set(!!s['disabled']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = ['defaultValue="blue"'];
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgOrientation() === 'horizontal') props.push('orientation="horizontal"');
    if (this.pgDisabled()) props.push('[disabled]="true"');
    return `<cs-radio-group ${props.join(' ')}>\n  <cs-radio value="red" label="Rojo" />\n  <cs-radio value="blue" label="Azul" />\n  ...\n</cs-radio-group>`;
  });

  protected readonly sizesCode = `<cs-radio-group size="sm" defaultValue="a"><cs-radio value="a" label="A" size="sm" /></cs-radio-group>\n<cs-radio-group size="md" defaultValue="a"><cs-radio value="a" label="A" size="md" /></cs-radio-group>\n<cs-radio-group size="lg" defaultValue="a"><cs-radio value="a" label="A" size="lg" /></cs-radio-group>`;

  protected readonly descriptionCode = `<cs-radio-group defaultValue="email">\n  <cs-radio value="email" label="Email" description="Recibe una notificación en tu correo." />\n  <cs-radio value="sms" label="SMS" description="Recibe un mensaje de texto en tu teléfono." />\n  <cs-radio value="none" label="Ninguno" description="Desactiva las notificaciones por completo." />\n</cs-radio-group>`;

  protected readonly disabledCode = `<!-- Una opción puntual deshabilitada -->\n<cs-radio-group defaultValue="a">\n  <cs-radio value="a" label="Opción A" />\n  <cs-radio value="b" label="Opción B" [disabled]="true" />\n</cs-radio-group>\n\n<!-- Todo el grupo deshabilitado -->\n<cs-radio-group [disabled]="true" defaultValue="a">...</cs-radio-group>`;

  protected readonly validationCode = `<cs-radio-group label="Rojo / Azul" [required]="true" [invalid]="true" errorText="Elige un color para continuar.">\n  <cs-radio value="red" label="Rojo" />\n  <cs-radio value="blue" label="Azul" />\n</cs-radio-group>`;
}
