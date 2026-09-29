import { Component, EventEmitter, Input, Output } from '@angular/core';

let uid = 0;

/**
 * Campo de texto de varias líneas para descripciones, observaciones y comentarios. Con `maxLength`
 * muestra un contador; el contador y el mensaje de error se enlazan al campo con aria-describedby y
 * aria-errormessage. Mismos bordes, foco, error y autocompletado que Input.
 */
@Component({
  selector: 'cs-textarea',
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
})
export class Textarea {
  @Input() id?: string;
  @Input() label = '';
  @Input('aria-label') ariaLabel = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Output() readonly valueChange = new EventEmitter<string>();
  /** Alto inicial en líneas. */
  @Input() rows = 3;
  /** Máximo de caracteres; muestra el contador «n/máximo». */
  @Input() maxLength?: number;
  @Input() required = false;
  @Input() invalid = false;
  /** Mensaje de error visible, enlazado con aria-errormessage. */
  @Input() errorMessage = '';
  /** Texto de ayuda debajo del campo. */
  @Input() helperText = '';
  @Input() readonly = false;
  @Input() disabled = false;
  /** Permite estirar el campo en vertical, o fijar su alto. */
  @Input() resize: 'vertical' | 'none' = 'vertical';

  private readonly uidValue = `cs-textarea-${++uid}`;

  get inputId(): string {
    return this.id ?? this.uidValue;
  }
  get helperId(): string {
    return `${this.inputId}-help`;
  }
  get errorId(): string {
    return `${this.inputId}-error`;
  }
  get counterId(): string {
    return `${this.inputId}-counter`;
  }
  protected get describedBy(): string | null {
    const ids = [this.helperText ? this.helperId : '', this.maxLength ? this.counterId : ''].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  }
  protected get nearLimit(): boolean {
    return !!this.maxLength && this.value.length >= this.maxLength * 0.9;
  }

  protected onInput(text: string): void {
    this.value = text;
    this.valueChange.emit(text);
  }
}
