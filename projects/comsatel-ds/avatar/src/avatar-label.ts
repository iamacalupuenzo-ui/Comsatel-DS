import { Component, Input } from '@angular/core';
import { Avatar, type AvatarStatus } from './avatar';

export type AvatarLabelSize = 'xs' | 'sm' | 'md';

interface LabelFont {
  namePx: string;
  nameLh: string;
  subPx: string;
  subLh: string;
}

const LABEL_FONT: Record<AvatarLabelSize, LabelFont> = {
  xs: { namePx: 'var(--font-size-content-note)', nameLh: 'var(--font-line-height-content-note)', subPx: 'var(--font-size-content-note)', subLh: 'var(--font-line-height-content-note)' },
  sm: { namePx: 'var(--font-size-content-caption)', nameLh: 'var(--font-line-height-content-caption)', subPx: 'var(--font-size-content-note)', subLh: 'var(--font-line-height-content-note)' },
  md: { namePx: 'var(--font-size-content-caption)', nameLh: 'var(--font-line-height-content-caption)', subPx: 'var(--font-size-content-caption)', subLh: 'var(--font-line-height-content-caption)' },
};

@Component({
  selector: 'cs-avatar-label',
  imports: [Avatar],
  templateUrl: './avatar-label.html',
  styleUrl: './avatar-label.css',
})
export class AvatarLabel {
  @Input() size: AvatarLabelSize = 'sm';
  @Input() src?: string;
  @Input() alt = '';
  @Input() initials?: string;
  @Input() status?: AvatarStatus;
  @Input() name = 'Name';
  @Input() subtitle?: string;

  get font(): LabelFont {
    return LABEL_FONT[this.size];
  }
}
