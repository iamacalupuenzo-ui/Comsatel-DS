import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { textStyle, type StyleName } from '../tokens/typography';
import { radioDotSize } from '../shared/radio-glyph';

export type RadioSize = 'sm' | 'md' | 'lg';

// Mismos tamaños y textStyles que Checkbox: Radio y Checkbox son controles de
// selección hermanos y deben pesar visualmente igual dentro de un formulario.
const SIZE_BOX: Record<RadioSize, number> = { sm: 14, md: 16, lg: 18 };
const LABEL_STYLE: Record<RadioSize, StyleName> = { sm: 'content/note', md: 'content/caption', lg: 'content/body' };
const DESC_STYLE: Record<RadioSize, StyleName> = { sm: 'label/small', md: 'content/note', lg: 'content/caption' };
const LABEL_LINE_HEIGHT: Record<RadioSize, number> = { sm: 18, md: 21, lg: 24 };

let uid = 0;

/**
 * Solo tiene sentido dentro de un `<cs-radio-group>` (comparte name/value
 * por el grupo padre, igual que un `<input type="radio">` nativo real). El
 * padre setea `checked`/`groupName`/`groupDisabled` directo vía
 * `@ContentChildren` — mismo mecanismo que Accordion/AccordionItem, ver el
 * comentario en radio-group.ts sobre por qué no usa inyección de
 * dependencias para esto.
 */
@Component({
  selector: 'cs-radio',
  imports: [NgStyle],
  templateUrl: './radio.html',
  styleUrl: './radio.css',
})
export class Radio {
  @Input() size: RadioSize = 'md';
  @Input() label?: string;
  @Input() description?: string;
  @Input({ required: true }) value!: string;
  @Input() disabled = false;
  @Input() id?: string;
  @Input('aria-label') ariaLabel = '';
  @Input('aria-describedby') ariaDescribedby = '';
  @Output() readonly selectedChange = new EventEmitter<string>();

  readonly checked = signal(false);
  readonly groupName = signal('');
  readonly groupDisabled = signal(false);
  readonly groupRequired = signal(false);
  readonly groupInvalid = signal(false);
  readonly groupDescribedBy = signal('');
  readonly groupErrorMessage = signal('');

  private readonly generatedId = `cs-radio-${++uid}`;

  protected get inputId(): string {
    return this.id ?? this.generatedId;
  }

  protected get isDisabled(): boolean {
    return this.disabled || this.groupDisabled();
  }

  protected onChange(): void {
    if (this.isDisabled) return;
    this.selectedChange.emit(this.value);
  }

  protected get describedBy(): string | null {
    const ids = [this.ariaDescribedby, this.groupDescribedBy()].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  }

  get box(): number {
    return SIZE_BOX[this.size];
  }
  get dot(): number {
    return radioDotSize(this.box);
  }
  get hasTwoLines(): boolean {
    return !!this.label && !!this.description;
  }
  get descMarginTop(): number {
    return (LABEL_LINE_HEIGHT[this.size] - this.box) / 2;
  }
  get labelStyle(): Record<string, string> {
    return textStyle(LABEL_STYLE[this.size], 'accent');
  }
  get descStyle(): Record<string, string> {
    return textStyle(DESC_STYLE[this.size]);
  }
}
