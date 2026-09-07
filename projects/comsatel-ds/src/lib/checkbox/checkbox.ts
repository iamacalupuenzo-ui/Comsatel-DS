import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { textStyle, type StyleName } from '../tokens/typography';

export type CheckboxSize = 'sm' | 'md' | 'lg';

const SIZE_BOX: Record<CheckboxSize, number> = { sm: 14, md: 16, lg: 18 };
const SIZE_ICON: Record<CheckboxSize, number> = { sm: 9, md: 10, lg: 12 };
// El label y la description escalan con el tamaño del checkbox.
const LABEL_STYLE: Record<CheckboxSize, StyleName> = { sm: 'content/note', md: 'content/caption', lg: 'content/body' };
const DESC_STYLE: Record<CheckboxSize, StyleName> = { sm: 'label/small', md: 'content/note', lg: 'content/caption' };
// Interlineado real de cada LABEL_STYLE (tamaño × 1.5). Con dos líneas, el
// checkbox se centra con la primera (el label), no con su propia caja.
const LABEL_LINE_HEIGHT: Record<CheckboxSize, number> = { sm: 18, md: 21, lg: 24 };

let uid = 0;

@Component({
  selector: 'cs-checkbox',
  imports: [NgStyle],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox implements OnChanges, AfterViewInit {
  @Input() size: CheckboxSize = 'md';
  @Input() label?: string;
  @Input() description?: string;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>;

  protected readonly inputId = `cs-checkbox-${++uid}`;
  protected readonly isChecked = signal(false);

  ngOnChanges(): void {
    this.isChecked.set(this.checked);
    this.syncIndeterminate();
  }

  ngAfterViewInit(): void {
    this.isChecked.set(this.checked);
    this.syncIndeterminate();
  }

  private syncIndeterminate(): void {
    if (this.inputRef) this.inputRef.nativeElement.indeterminate = this.indeterminate;
  }

  protected onChange(value: boolean): void {
    this.isChecked.set(value);
    this.indeterminate = false;
    this.syncIndeterminate();
    this.checkedChange.emit(value);
  }

  get box(): number {
    return SIZE_BOX[this.size];
  }
  get icon(): number {
    return SIZE_ICON[this.size];
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
