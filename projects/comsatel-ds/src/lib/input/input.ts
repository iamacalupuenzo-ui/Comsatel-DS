import { Component, EventEmitter, Input as NgInput, Output } from '@angular/core';
import { INPUT_FIELD_TOKENS, type InputFieldSize } from './input-tokens';

let uid = 0;

// Puerto 1:1 de Input en input.tsx (React). React usa @base-ui/react/input
// (un wrapper fino sobre <input> nativo, sin lógica propia de accesibilidad
// más allá de lo que el navegador ya da) — acá un <input> nativo directo
// cubre lo mismo sin necesitar una dependencia externa.
//
// Import alias `Input as NgInput`: la clase de este componente se llama
// `Input` (como en React) y choca con el decorador @Input() de Angular en
// el mismo archivo — sin el alias, TypeScript reporta "Duplicate identifier".
@Component({
  selector: 'cs-input',
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  @NgInput() fieldSize: InputFieldSize = 'md';
  @NgInput() type = 'text';
  @NgInput() id?: string;
  @NgInput() name = '';
  @NgInput() placeholder = '';
  @NgInput() autocomplete = '';
  @NgInput() required = false;
  @NgInput() readonly = false;
  @NgInput() disabled = false;
  @NgInput() invalid = false;
  @NgInput('aria-label') ariaLabel = '';
  @NgInput('aria-labelledby') ariaLabelledby = '';
  @NgInput('aria-describedby') ariaDescribedby = '';
  @NgInput('aria-errormessage') ariaErrormessage = '';
  @NgInput() min?: string | number;
  @NgInput() max?: string | number;
  @NgInput() step?: string | number;
  @NgInput() value = '';
  @Output() valueChange = new EventEmitter<string>();

  private readonly autoId = `cs-input-${++uid}`;

  get resolvedId(): string {
    return this.id ?? this.autoId;
  }

  get tok() {
    return INPUT_FIELD_TOKENS[this.fieldSize];
  }

  onInput(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
