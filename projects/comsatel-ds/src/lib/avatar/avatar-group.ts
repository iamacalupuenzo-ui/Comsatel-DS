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

const AVATAR_SIZE: Record<AvatarGroupSize, string> = {
  xs: 'var(--layout-size-sm)',
  sm: 'var(--layout-size-base)',
  md: 'var(--layout-size-md)',
};
// Las fotos toleran un solapamiento más denso; las iniciales no, porque el
// avatar siguiente tapa su lado derecho. La variante de texto usa 6px para
// mantener las dos letras legibles sin perder la densidad del grupo.
const GROUP_OVERLAP: Record<AvatarGroupSize, string> = {
  xs: 'var(--layout-gap-md)',
  sm: 'var(--layout-gap-md)',
  md: 'var(--layout-gap-xl)',
};

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

  get sizeValue(): string {
    return AVATAR_SIZE[this.size];
  }
  get overlap(): string {
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

  marginFor(index: number, avatar: AvatarGroupItem): string {
    const isLast = index === this.visible.length - 1;
    if (isLast && this.extra === 0) return '0';
    const overlap = avatar.initials && !avatar.src ? 'var(--layout-gap-sm)' : this.overlap;
    return `calc(-1 * ${overlap})`;
  }
}
