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
    { kind: 'select', label: 'Mensaje', key: 'message', options: [{ value: 'none', label: 'Ninguno' }, { value: 'helper', label: 'Ayuda' }, { value: 'error', label: 'Error' }], default: 'helper' },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: true },
  ];
  protected readonly message = signal<'none' | 'helper' | 'error'>('helper');
  protected readonly required = signal(true);

  protected onState(s: DemoState): void {
    if (s['message']) this.message.set(s['message'] as 'none' | 'helper' | 'error');
    if (s['required'] !== undefined) this.required.set(!!s['required']);
  }

  protected readonly helper = computed(() => (this.message() === 'helper' ? 'Placa o código interno de la unidad.' : ''));
  protected readonly error = computed(() => (this.message() === 'error' ? 'Ingresa el código de la unidad.' : ''));

  protected readonly code = computed(() => {
    const props = ['for="unit-code"', 'label="Código de unidad"'];
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
