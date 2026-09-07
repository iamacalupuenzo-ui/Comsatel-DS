import { Component, EventEmitter, Input, OnInit, Output, computed, input, signal } from '@angular/core';
import { InputDropdown, type InputDropdownOption } from 'comsatel-ds';
import { CodeBlock } from './code-block';

export type DemoMode = 'light' | 'dark';
export type DemoValue = string | boolean;
export type DemoState = Record<string, DemoValue>;

export interface ControlOption {
  value: string;
  label: string;
}

export interface ControlDef {
  kind: 'select' | 'toggle';
  label: string;
  key: string;
  default: DemoValue;
  // La mayoría de los controles son valores literales de prop (size='sm',
  // variant='primary') y se muestran tal cual. Cuando la opción no es un
  // valor de prop real (ej. "Tipo" de Input, que elige qué composición de
  // InputGroup previsualizar), se pasa {value,label} para mostrar la
  // etiqueta en español sin perder el value interno.
  options?: readonly (string | ControlOption)[];
}

// Puerto 1:1 de DemoShell/Canvas/Toolbar/CodeBlock en DocsComponents.tsx
// (sistema React) — mismo contenedor con Canvas (grid de puntos + tema
// claro/oscuro propio del demo), Toolbar (controles + selector de tema) y
// CodeBlock (resaltado de sintaxis + copiar, reusado como <app-code-block>).
// El estado vive acá adentro, igual que el useState de DemoShell; la página
// consumidora se entera de cada cambio vía (stateChange) y de ahí recalcula
// su propio preview y su propio código — el mismo patrón preview(state)/
// code(state) de React, adaptado a projected content en vez de render props.
@Component({
  selector: 'app-demo-shell',
  imports: [CodeBlock, InputDropdown],
  templateUrl: './demo-shell.html',
  styleUrl: './demo-shell.css',
})
export class DemoShell implements OnInit {
  @Input() controls: ControlDef[] = [];
  // input() en vez de @Input() plano: computed() solo invalida su caché
  // cuando lee una signal real. Con un @Input clásico, `code` cambia como
  // propiedad de clase, pero un computed() que lo lea nunca se entera y se
  // queda pegado al primer valor — bug real encontrado al probar la
  // interacción (el código mostrado no seguía a los controles).
  readonly code = input('');
  @Output() stateChange = new EventEmitter<DemoState>();

  protected readonly state = signal<DemoState>({ mode: 'light' });
  protected readonly mode = computed(() => this.state()['mode'] as DemoMode);

  ngOnInit(): void {
    const s: DemoState = { mode: 'light' };
    for (const c of this.controls) s[c.key] = c.default;
    this.state.set(s);
    this.stateChange.emit(s);
  }

  protected onChange(key: string, value: DemoValue): void {
    const next = { ...this.state(), [key]: value };
    this.state.set(next);
    this.stateChange.emit(next);
  }

  protected valueOf(key: string): DemoValue {
    return this.state()[key];
  }

  // El Toolbar de React arma un InputDropdown size="xs" a partir de
  // ctrl.options (cada opción usa el mismo string como value y label) —
  // acá se replica igual, en vez de un <select> nativo suelto que no
  // comparte estructura ni tokens con el combobox real de la librería.
  protected optionsFor(ctrl: ControlDef): InputDropdownOption[] {
    return (ctrl.options ?? []).map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  }
}
