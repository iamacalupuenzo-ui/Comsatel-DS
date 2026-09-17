import type { StyleName } from '../tokens/typography';

export type InputFieldSize = 'sm' | 'md' | 'lg';

/**
 * Tipografía pública para etiquetas de campos de formulario.
 *
 * La etiqueta es metadato del campo, no su valor: por eso `sm` y `md`
 * conservan la densidad de `content/note`, mientras que `lg` gana
 * legibilidad con `content/caption`. `xs` queda disponible para los
 * controles que lo soportan (Select e InputDropdown).
 */
export const fieldLabelTypography: Record<'xs' | InputFieldSize, StyleName> = {
  xs: 'label/small',
  sm: 'content/note',
  md: 'content/note',
  lg: 'content/caption',
};

// Puerto 1:1 de la escala de tamaño de input.tsx (React): sm=28px/12px,
// md=32px/13px (por defecto), lg=40px/16px. Compartida entre cs-input y
// cs-input-group-input para que ambos midan exactamente igual.
export interface InputSizeTokens {
  height: number;
  paddingInline: number;
  fontSize: string;
  lineHeight: string;
}

// C1: 10px y 14px no tienen un paso equivalente en la escala de
// --layout-padding. Se conservan como excepciones explícitas porque definen
// la geometría horizontal de los controles sm/md y lg respectivamente.
export const INPUT_FIELD_TOKENS: Record<InputFieldSize, InputSizeTokens> = {
  sm: { height: 28, paddingInline: 10, fontSize: 'var(--font-size-content-note)', lineHeight: 'var(--font-line-height-content-note)' },
  md: { height: 32, paddingInline: 10, fontSize: 'var(--font-size-content-ui)', lineHeight: 'var(--font-line-height-content-ui)' },
  lg: { height: 40, paddingInline: 14, fontSize: 'var(--font-size-content-body)', lineHeight: 'var(--font-line-height-content-body)' },
};
