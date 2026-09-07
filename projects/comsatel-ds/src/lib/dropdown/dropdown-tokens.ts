import type { DropdownItemVariant, DropdownSize } from './dropdown-types';

// Puerto 1:1 de ITEM_TOKENS en dropdown.tsx.
//   xs → 24px / 11px · sm → 28px / 13px · md → 32px / 13px · lg → 40px / 14px
// secondaryFontSize/lineHeight son un paso más chico que el texto principal
// del ítem — para el badge y el atajo de teclado, que son metadata
// secundaria y no deben competir en tamaño con el label.
export interface ItemTokens {
  height: number;
  paddingInline: number;
  fontSize: string;
  lineHeight: string;
  secondaryFontSize: string;
  secondaryLineHeight: string;
  iconSize: number;
}

export const ITEM_TOKENS: Record<DropdownSize, ItemTokens> = {
  xs: {
    height: 24,
    paddingInline: 6,
    fontSize: 'var(--font-size-label-small)',
    lineHeight: 'var(--font-line-height-label-small)',
    secondaryFontSize: 'var(--font-size-label-micro)',
    secondaryLineHeight: 'var(--font-line-height-label-micro)',
    iconSize: 12,
  },
  sm: {
    height: 28,
    paddingInline: 8,
    fontSize: 'var(--font-size-content-note)',
    lineHeight: 'var(--font-line-height-content-note)',
    secondaryFontSize: 'var(--font-size-label-small)',
    secondaryLineHeight: 'var(--font-line-height-label-small)',
    iconSize: 14,
  },
  md: {
    height: 32,
    paddingInline: 8,
    fontSize: 'var(--font-size-content-ui)',
    lineHeight: 'var(--font-line-height-content-ui)',
    secondaryFontSize: 'var(--font-size-content-note)',
    secondaryLineHeight: 'var(--font-line-height-content-note)',
    iconSize: 16,
  },
  lg: {
    height: 40,
    paddingInline: 12,
    fontSize: 'var(--font-size-content-caption)',
    lineHeight: 'var(--font-line-height-content-caption)',
    secondaryFontSize: 'var(--font-size-content-ui)',
    secondaryLineHeight: 'var(--font-line-height-content-ui)',
    iconSize: 18,
  },
};

export interface InputTokens {
  height: number;
  paddingX: number;
  fontSize: string;
  lineHeight: string;
}

export const INPUT_TOKENS: Record<DropdownSize, InputTokens> = {
  xs: { height: 24, paddingX: 8, fontSize: 'var(--font-size-label-small)', lineHeight: 'var(--font-line-height-label-small)' },
  sm: { height: 28, paddingX: 10, fontSize: 'var(--font-size-content-note)', lineHeight: 'var(--font-line-height-content-note)' },
  md: { height: 32, paddingX: 10, fontSize: 'var(--font-size-content-ui)', lineHeight: 'var(--font-line-height-content-ui)' },
  lg: { height: 40, paddingX: 14, fontSize: 'var(--font-size-content-caption)', lineHeight: 'var(--font-line-height-content-caption)' },
};

export function hoverBgFor(variant: DropdownItemVariant | undefined): string {
  if (variant === 'destructive') return 'var(--color-background-danger-subtlest-hover)';
  if (variant === 'success') return 'var(--color-background-success-subtlest-hover)';
  return 'var(--color-background-neutral-subtlest-hover)';
}
