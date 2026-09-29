import { Component, computed, signal } from '@angular/core';
import { FormField, Icon, Input, InputGroup, InputGroupAddon, InputGroupInput } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

@Component({
  selector: 'app-form-field-page',
  imports: [FormField, Icon, Input, InputGroup, InputGroupAddon, InputGroupInput, DemoShell],
  templateUrl: './form-field-page.html',
  styleUrl: './form-field-page.css',
})
export class FormFieldPage {
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'message', options: [{ value: 'none', label: 'Por defecto' }, { value: 'helper', label: 'Con ayuda' }, { value: 'error', label: 'Con error' }], default: 'helper' },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: true },
    { kind: 'select', label: 'Tamaño', key: 'size', options: [{ value: 'sm', label: 'sm' }, { value: 'md', label: 'md' }, { value: 'lg', label: 'lg' }], default: 'md' },
  ];
  protected readonly message = signal<'none' | 'helper' | 'error'>('helper');
  protected readonly required = signal(true);
  protected readonly size = signal<'sm' | 'md' | 'lg'>('md');
  protected readonly states = [
    { key: 'none', title: 'Por defecto', intro: 'Etiqueta y control sin texto auxiliar.', props: 'label="Código de unidad"' },
    { key: 'helper', title: 'Con ayuda', intro: 'Explica el formato esperado antes de escribir.', props: 'helperText="Placa o código interno de la unidad."' },
    { key: 'error', title: 'Con error', intro: 'Reemplaza la ayuda y vincula el mensaje al control.', props: 'errorMessage="Ingresa el código de la unidad."' },
    { key: 'required', title: 'Requerido', intro: 'Muestra el asterisco junto a la etiqueta.', props: '[required]="true"' },
  ];
  protected readonly stateSizeControls: ControlDef[] = [{ kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' }];
  protected readonly stateSizes = signal<Record<string, 'sm' | 'md' | 'lg'>>({});
  protected stateSizeOf(key: string): 'sm' | 'md' | 'lg' { return this.stateSizes()[key] ?? 'md'; }
  protected onStateSize(key: string, s: DemoState): void { if (s['size']) this.stateSizes.update((sizes) => ({ ...sizes, [key]: s['size'] as 'sm' | 'md' | 'lg' })); }
  protected stateCode(key: string): string { return `<cs-form-field for="unit-${key}" label="Código de unidad" size="${this.stateSizeOf(key)}" ${this.states.find((state) => state.key === key)?.props ?? ''}>\n  <cs-input id="unit-${key}" fieldSize="${this.stateSizeOf(key)}" />\n</cs-form-field>`; }

  protected onState(s: DemoState): void {
    if (s['message']) this.message.set(s['message'] as 'none' | 'helper' | 'error');
    if (s['required'] !== undefined) this.required.set(!!s['required']);
    if (s['size']) this.size.set(s['size'] as 'sm' | 'md' | 'lg');
  }

  protected readonly helper = computed(() => (this.message() === 'helper' ? 'Placa o código interno de la unidad.' : ''));
  protected readonly error = computed(() => (this.message() === 'error' ? 'Ingresa el código de la unidad.' : ''));

  protected readonly code = computed(() => {
    const props = ['for="unit-code"', 'label="Código de unidad"'];
    if (this.size() !== 'md') props.push(`size="${this.size()}"`);
    if (this.required()) props.push('[required]="true"');
    if (this.helper()) props.push(`helperText="${this.helper()}"`);
    if (this.error()) props.push(`errorMessage="${this.error()}"`);
    const control = this.error()
      ? '<cs-input id="unit-code" [invalid]="true" aria-errormessage="unit-code-error" />'
      : `<cs-input id="unit-code"${this.helper() ? ' aria-describedby="unit-code-help"' : ''} />`;
    return `<cs-form-field ${props.join(' ')}>\n  ${control}\n</cs-form-field>`;
  });

  protected readonly groupCode = '<cs-form-field for="email" label="Correo corporativo" helperText="Usa tu correo de la empresa.">\n  <cs-input-group>\n    <cs-input-group-addon><cs-icon name="mail" [size]="16" aria-hidden="true" /></cs-input-group-addon>\n    <cs-input-group-input id="email" type="email" aria-describedby="email-help" />\n  </cs-input-group>\n</cs-form-field>';
}
