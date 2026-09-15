import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';
import { InputGroup } from './input-group';
import { InputGroupAddon } from './input-group-addon';
import { InputGroupInput } from './input-group-input';
import type { InputFieldSize } from './input-tokens';

// Molécula de autenticación: centraliza únicamente el comportamiento estable
// de una contraseña (mostrar/ocultar y su accesibilidad). Etiqueta, validación,
// reglas de longitud y recuperación permanecen en el formulario consumidor.
@Component({
  selector: 'cs-password-input',
  imports: [Icon, InputGroup, InputGroupAddon, InputGroupInput],
  templateUrl: './password-input.html',
  styleUrl: './password-input.css',
})
export class PasswordInput {
  @Input() fieldSize: InputFieldSize = 'md';
  @Input() id?: string;
  @Input() name = '';
  @Input() placeholder = '';
  @Input() autocomplete = 'current-password';
  @Input() required = false;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() leadingIcon: IconName | null = 'lock';
  @Input('aria-label') ariaLabel = '';
  @Input('aria-labelledby') ariaLabelledby = '';
  @Input('aria-describedby') ariaDescribedby = '';
  @Input('aria-errormessage') ariaErrormessage = '';
  @Input() showPasswordLabel = 'Mostrar contraseña';
  @Input() hidePasswordLabel = 'Ocultar contraseña';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() visibilityChange = new EventEmitter<boolean>();

  protected readonly visible = signal(false);

  protected onInput(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  protected toggleVisibility(): void {
    this.visible.update((visible) => !visible);
    this.visibilityChange.emit(this.visible());
  }
}
