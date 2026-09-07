import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Avatar } from './avatar';
import { AvatarAddButton } from './avatar-add-button';
import { componentTypography, textStyle } from '../tokens/typography';

export type AvatarGroupSize = 'xs' | 'sm' | 'md';

export interface AvatarGroupItem {
  src?: string;
  initials?: string;
  alt?: string;
  // Color de fondo del placeholder cuando no hay src/initials — solo lo usa
  // CardBanner para replicar los 3 colores rotados (brand/success/warning)
  // de su fallback real cuando no hay avatares reales todavía.
  placeholderBg?: string;
}

const AVATAR_PX: Record<AvatarGroupSize, number> = { xs: 24, sm: 32, md: 40 };
const GROUP_OVERLAP: Record<AvatarGroupSize, number> = { xs: 8, sm: 12, md: 16 };

@Component({
  selector: 'cs-avatar-group',
  imports: [Avatar, AvatarAddButton, NgStyle],
  templateUrl: './avatar-group.html',
  styleUrl: './avatar-group.css',
})
export class AvatarGroup {
  @Input() size: AvatarGroupSize = 'sm';
  @Input() avatars: AvatarGroupItem[] = [];
  @Input() maxVisible = 3;
  @Input() showAddButton = true;
  @Input() showPlaceholderIcon = true;
  @Output() add = new EventEmitter<void>();

  get px(): number {
    return AVATAR_PX[this.size];
  }
  get overlap(): number {
    return GROUP_OVERLAP[this.size];
  }
  get visible(): AvatarGroupItem[] {
    return this.avatars.slice(0, this.maxVisible);
  }
  get extra(): number {
    return Math.max(0, this.avatars.length - this.maxVisible);
  }
  get extraTextStyle(): Record<string, string> {
    return textStyle(componentTypography.avatar[this.size], 'accent');
  }

  marginFor(index: number): string {
    const isLast = index === this.visible.length - 1;
    return !isLast || this.extra > 0 ? `-${this.overlap}px` : '0';
  }
}
