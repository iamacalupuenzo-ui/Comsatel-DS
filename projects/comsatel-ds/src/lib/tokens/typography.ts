// Puerto directo de typography.mjs (sistema de diseño React) a TypeScript.
// Misma fuente de datos que ya generó typography-tokens.css — esto expone la
// ESTRUCTURA (nombres de estilos, pesos, primitivos) para que los componentes
// Angular puedan iterar sobre ella (selects, catálogos), igual que React usa
// textStyles/weights/textStyle() para su Playground y sus tablas de tokens.

export const primitiveFonts = {
  family: { primary: '"Manrope", sans-serif', secondary: '"Public Sans", sans-serif' },
  weight: { 100: '100', 200: '200', 300: '300', 400: '400', 500: '500', 600: '600', 700: '700', 800: '800', 900: '900' },
  size: Object.fromEntries(
    Object.entries({ '2xs': 10, micro: 11, xs: 12, ui: 13, sm: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 28, '4xl': 32, '5xl': 36, '6xl': 40, '7xl': 48, '8xl': 56, '9xl': 64 }).map(
      ([k, v]) => [k, `${v / 16}rem`],
    ),
  ) as Record<string, string>,
  letterSpacing: { xs: '-0.02em', sm: '-0.01em', md: '0em', lg: '0.01em', xl: '0.02em' },
};

export const weights = { regular: '400', accent: '500', emphasis: '600', bold: '700' } as const;
export type WeightName = keyof typeof weights;

export const textStyles = {
  'heading/display': { primitive: '7xl', ratio: 1.25, weight: 'bold' },
  'heading/large': { primitive: '5xl', ratio: 44 / 36, weight: 'emphasis' },
  'heading/medium': { primitive: '3xl', ratio: 36 / 28, weight: 'emphasis' },
  'heading/small': { primitive: '2xl', ratio: 32 / 24, weight: 'emphasis' },
  'content/feature': { primitive: 'xl', ratio: 1.5, weight: 'regular' },
  'content/highlight': { primitive: 'lg', ratio: 1.5, weight: 'regular' },
  'content/body': { primitive: 'md', ratio: 1.5, weight: 'regular' },
  'content/caption': { primitive: 'sm', ratio: 1.5, weight: 'regular' },
  'content/ui': { primitive: 'ui', ratio: 1.5, weight: 'regular' },
  'content/note': { primitive: 'xs', ratio: 1.5, weight: 'regular' },
  'label/small': { primitive: 'micro', ratio: 16 / 11, weight: 'accent' },
  'label/micro': { primitive: '2xs', ratio: 1.4, weight: 'accent' },
} as const satisfies Record<string, { primitive: string; ratio: number; weight: WeightName }>;

export type StyleName = keyof typeof textStyles;

export function textStyle(name: StyleName, weight: WeightName = textStyles[name].weight) {
  const group = name.startsWith('heading/') ? 'heading' : 'content';
  const key = name.replace('/', '-');
  return {
    fontFamily: `var(--font-family-${group})`,
    fontSize: `var(--font-size-${key})`,
    lineHeight: `var(--font-line-height-${key})`,
    fontWeight: `var(--font-weight-${weight})`,
    letterSpacing: `var(--font-letter-spacing-${group})`,
  };
}

export const componentTypography = {
  button: { xs: 'content/note', sm: 'content/ui', md: 'content/caption', lg: 'content/body' },
  badge: { sm: 'label/micro', md: 'label/small', lg: 'content/note' },
  avatar: { xs: 'label/micro', sm: 'content/note', md: 'content/caption', lg: 'content/highlight', xl: 'content/feature' },
  banner: { title: 'content/caption', body: 'content/caption', action: 'content/caption' },
  tooltip: 'label/small',
  calendar: { header: 'content/note', weekday: 'label/small', day: 'content/note' },
} as const;
