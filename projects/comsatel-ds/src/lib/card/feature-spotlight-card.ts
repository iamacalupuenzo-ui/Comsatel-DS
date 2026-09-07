import { Component, Input } from '@angular/core';
import { Avatar } from '../avatar/avatar';

export interface AvatarPosition {
  size: 32 | 40;
  x: string;
  y: string;
  z: number;
}

// Constelación decorativa de 13 avatares — coordenadas geométricas propias
// del ilustración, no espaciado del sistema (por eso quedan explícitas,
// igual que FIELD_WIDTH en DateTimePicker). Los tamaños 40/32 SÍ son
// tokens reales: coinciden exacto con AvatarSize 'md'/'sm' (ver avatar.ts).
export const AVATAR_POSITIONS: AvatarPosition[] = [
  { size: 40, x: '50%', y: '50%', z: 10 },
  { size: 32, x: 'calc(50% - 72px)', y: '50%', z: 5 },
  { size: 32, x: 'calc(50% + 72px)', y: '50%', z: 5 },
  { size: 32, x: '50%', y: 'calc(50% - 44px)', z: 5 },
  { size: 32, x: '50%', y: 'calc(50% + 44px)', z: 5 },
  { size: 32, x: 'calc(50% - 40px)', y: 'calc(50% - 36px)', z: 3 },
  { size: 32, x: 'calc(50% + 40px)', y: 'calc(50% - 36px)', z: 3 },
  { size: 32, x: 'calc(50% - 40px)', y: 'calc(50% + 36px)', z: 3 },
  { size: 32, x: 'calc(50% + 40px)', y: 'calc(50% + 36px)', z: 3 },
  { size: 32, x: 'calc(50% - 104px)', y: 'calc(50% - 36px)', z: 1 },
  { size: 32, x: 'calc(50% + 104px)', y: 'calc(50% - 36px)', z: 1 },
  { size: 32, x: 'calc(50% - 104px)', y: 'calc(50% + 36px)', z: 1 },
  { size: 32, x: 'calc(50% + 104px)', y: 'calc(50% + 36px)', z: 1 },
];

const PLACEHOLDER_COLORS = [
  'var(--color-background-brand-subtle)',
  'var(--color-background-success-subtle)',
  'var(--color-background-warning-subtle)',
  'var(--color-background-danger-subtle)',
  'var(--color-background-brand-subtlest)',
  'var(--color-background-success-subtlest)',
  'var(--color-background-warning-subtlest)',
  'var(--color-background-danger-subtlest)',
  'var(--color-background-brand-subtle)',
  'var(--color-background-neutral-subtle)',
  'var(--color-background-success-subtle)',
  'var(--color-background-warning-subtle)',
  'var(--color-background-brand-subtlest)',
];

@Component({
  selector: 'cs-feature-spotlight-card',
  imports: [Avatar],
  templateUrl: './feature-spotlight-card.html',
  styleUrl: './feature-spotlight-card.css',
})
export class FeatureSpotlightCard {
  @Input() avatars: string[] = [];

  protected readonly positions = AVATAR_POSITIONS;

  protected sizeName(size: 32 | 40): 'sm' | 'md' {
    return size === 40 ? 'md' : 'sm';
  }
  protected placeholderColor(index: number): string {
    return PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  }
}
