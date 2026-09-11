import { Component, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { textStyle, type StyleName } from '../tokens/typography';

export type ToggleSize = 'sm' | 'md' | 'lg';

interface Track {
  w: number;
  h: number;
  thumb: number;
  on: number;
  off: number;
}

const TRACK: Record<ToggleSize, Track> = {
  sm: { w: 28, h: 16, thumb: 12, on: 14, off: 2 },
  md: { w: 36, h: 20, thumb: 16, on: 18, off: 2 },
  lg: { w: 44, h: 24, thumb: 20, on: 22, off: 2 },
};
const LABEL_STYLE: Record<ToggleSize, StyleName> = { sm: 'content/note', md: 'content/caption', lg: 'content/body' };
const DESC_STYLE: Record<ToggleSize, StyleName> = { sm: 'label/small', md: 'content/note', lg: 'content/caption' };
const LABEL_LINE_HEIGHT: Record<ToggleSize, number> = { sm: 18, md: 21, lg: 24 };

let uid = 0;

@Component({
  selector: 'cs-toggle',
  imports: [NgStyle],
  templateUrl: './toggle.html',
  styleUrl: './toggle.css',
})
export class Toggle implements OnChanges {
  @Input() size: ToggleSize = 'md';
  @Input() label?: string;
  @Input() description?: string;
  /** Nombre accesible para el caso sin etiqueta visible. */
  @Input('aria-label') ariaLabel = '';
  @Input() disabled = false;
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  protected readonly inputId = `cs-toggle-${++uid}`;
  protected readonly isChecked = signal(false);

  ngOnChanges(): void {
    this.isChecked.set(this.checked);
  }

  protected onChange(value: boolean): void {
    this.isChecked.set(value);
    this.checkedChange.emit(value);
  }

  get track(): Track {
    return TRACK[this.size];
  }
  get hasTwoLines(): boolean {
    return !!this.label && !!this.description;
  }
  get descMarginTop(): number {
    return (LABEL_LINE_HEIGHT[this.size] - this.track.h) / 2;
  }
  get thumbTop(): number {
    return (this.track.h - this.track.thumb) / 2;
  }
  get thumbLeft(): number {
    return this.isChecked() ? this.track.on : this.track.off;
  }
  get labelStyle(): Record<string, string> {
    return textStyle(LABEL_STYLE[this.size], 'accent');
  }
  get descStyle(): Record<string, string> {
    return textStyle(DESC_STYLE[this.size]);
  }
}
