import { Component, computed, signal } from '@angular/core';
import { Textarea } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const FIELD_STATES = [
  { value: 'default', label: 'Por defecto', when: 'Campo editable para texto libre de varias líneas.', props: '—' },
  { value: 'invalid', label: 'Error', when: 'El texto falta o no es válido. Siempre con un mensaje que explique cómo resolverlo.', props: '[invalid]="true" errorMessage="…"' },
  { value: 'readonly', label: 'Solo lectura', when: 'El texto se lee y se copia, pero no se edita; por ejemplo, en un detalle ya confirmado.', props: '[readonly]="true"' },
  { value: 'disabled', label: 'Deshabilitado', when: 'El campo no está disponible en el paso actual.', props: '[disabled]="true"' },
];

interface StateDemo { key: string; title: string; intro: string; attrs: string[] }

const STATES: StateDemo[] = [
  { key: 'empty', title: 'Vacío', intro: 'El placeholder dice qué escribir.', attrs: ['placeholder="Describe la observación"'] },
  { key: 'filled', title: 'Con texto', intro: 'El usuario puede estirar el alto hacia abajo.', attrs: ['[value]="texto"'] },
  { key: 'counter', title: 'Con contador', intro: 'Con maxLength aparece «n/máximo»; al llegar al 90 % toma el tono de aviso.', attrs: ['[maxLength]="120"'] },
  { key: 'helper', title: 'Con ayuda', intro: 'Una línea de ayuda debajo, enlazada con aria-describedby.', attrs: ['helperText="Incluye la dirección y la hora aproximada."'] },
  { key: 'invalid', title: 'Error', intro: 'El mensaje reemplaza a la ayuda y se enlaza con aria-errormessage.', attrs: ['[invalid]="true"', 'errorMessage="Describe la observación antes de continuar."'] },
  { key: 'required', title: 'Requerido', intro: 'El asterisco aparece junto al label.', attrs: ['[required]="true"'] },
  { key: 'readonly', title: 'Solo lectura', intro: 'Se lee y se copia, pero no se edita.', attrs: ['[value]="texto"', '[readonly]="true"'] },
  { key: 'disabled', title: 'Deshabilitado', intro: 'El campo no está disponible en el paso actual.', attrs: ['[disabled]="true"'] },
];

@Component({
  selector: 'app-textarea-page',
  imports: [Textarea, DemoShell],
  templateUrl: './textarea-page.html',
  styleUrl: './textarea-page.css',
})
export class TextareaPage {
  protected readonly sample = 'La unidad se ubicó en el estacionamiento del centro comercial. El conductor no estaba presente.';
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: FIELD_STATES.map(({ value, label }) => ({ value, label })), default: 'default' },
    { kind: 'select', label: 'Líneas', key: 'rows', options: ['2', '3', '5'], default: '3' },
    { kind: 'toggle', label: 'Contador', key: 'counter', default: true },
    { kind: 'toggle', label: 'Estirable', key: 'resize', default: true },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
  ];
  protected readonly pgState = signal('default');
  protected readonly pgRows = signal(3);
  protected readonly pgCounter = signal(true);
  protected readonly pgResize = signal(true);
  protected readonly pgRequired = signal(false);
  protected readonly pgValue = signal(this.sample);
  protected readonly pgStateInfo = computed(() => FIELD_STATES.find((s) => s.value === this.pgState()) ?? FIELD_STATES[0]);

  protected onPlaygroundState(s: DemoState): void {
    if (s['state']) this.pgState.set(String(s['state']));
    if (s['rows']) this.pgRows.set(Number(s['rows']));
    if (s['counter'] !== undefined) this.pgCounter.set(!!s['counter']);
    if (s['resize'] !== undefined) this.pgResize.set(!!s['resize']);
    if (s['required'] !== undefined) this.pgRequired.set(!!s['required']);
  }

  protected readonly pgCode = computed(() => {
    const props = ['label="Descripción de la observación"', 'placeholder="Describe la observación"', '[value]="texto"', '(valueChange)="texto = $event"'];
    if (this.pgRows() !== 3) props.push(`[rows]="${this.pgRows()}"`);
    if (this.pgCounter()) props.push('[maxLength]="500"');
    if (!this.pgResize()) props.push('resize="none"');
    if (this.pgRequired()) props.push('[required]="true"');
    const state = this.pgStateInfo();
    if (state.props !== '—') props.push(state.props);
    return `<cs-textarea\n  ${props.join('\n  ')}\n/>`;
  });

  protected readonly states = STATES;
  protected readonly counterValue = signal('Unidad ubicada en el centro comercial; se coordina con la comisaría.');
  protected stateCode(state: StateDemo): string {
    return `<cs-textarea\n  label="Descripción de la observación"\n  ${state.attrs.join('\n  ')}\n/>`;
  }
}
