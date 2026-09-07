import { Component, Input } from '@angular/core';
import { AvatarGroup, type AvatarGroupItem } from '../avatar/avatar-group';

export type CardBannerVariant = 'neutral' | 'brand' | 'destructive' | 'warning' | 'success';

interface BannerTokens {
  bg: string;
  border: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

const BANNER_TOKENS: Record<CardBannerVariant, BannerTokens> = {
  neutral: {
    bg: 'var(--color-background-neutral-subtlest)',
    border: 'var(--color-border-neutral-default)',
    badgeBg: 'var(--color-background-neutral-subtle)',
    badgeBorder: 'var(--color-border-neutral-default)',
    badgeText: 'var(--color-text-base-subtle)',
  },
  brand: {
    bg: 'var(--color-background-brand-subtlest)',
    border: 'var(--color-border-brand-default)',
    badgeBg: 'var(--color-background-brand-subtlest)',
    badgeBorder: 'var(--color-border-brand-default)',
    badgeText: 'var(--color-text-brand-default)',
  },
  destructive: {
    bg: 'var(--color-background-danger-subtlest)',
    border: 'var(--color-border-danger-default)',
    badgeBg: 'var(--color-background-danger-subtlest)',
    badgeBorder: 'var(--color-border-danger-default)',
    badgeText: 'var(--color-text-danger-default)',
  },
  warning: {
    bg: 'var(--color-background-warning-subtlest)',
    border: 'var(--color-border-warning-default)',
    badgeBg: 'var(--color-background-warning-subtlest)',
    badgeBorder: 'var(--color-border-warning-default)',
    badgeText: 'var(--color-text-warning-default)',
  },
  success: {
    bg: 'var(--color-background-success-subtlest)',
    border: 'var(--color-border-success-default)',
    badgeBg: 'var(--color-background-success-subtlest)',
    badgeBorder: 'var(--color-border-success-default)',
    badgeText: 'var(--color-text-success-default)',
  },
};

// Puerto 1:1 de CardBanner (card.tsx) — tarjeta con franja superior
// (avatares apilados + badge) y título/descripción debajo. Reutiliza
// <cs-avatar-group size="xs"> real para los avatares en vez de redibujar
// círculos superpuestos a mano (React sí los redibujaba localmente,
// incluido el fallback de 3 círculos de color cuando no hay avatares).
@Component({
  selector: 'cs-card-banner',
  imports: [AvatarGroup],
  templateUrl: './card-banner.html',
  styleUrl: './card-banner.css',
})
export class CardBanner {
  @Input() variant: CardBannerVariant = 'neutral';
  @Input() title = 'Title';
  @Input() description = 'Description here';
  @Input() avatars: AvatarGroupItem[] = [];
  @Input() badgeLabel = 'Label';
  @Input() showAvatar = true;
  @Input() showBadge = true;

  get tok(): BannerTokens {
    return BANNER_TOKENS[this.variant];
  }
}
