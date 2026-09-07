import { Component } from '@angular/core';

interface TokenRow {
  name: string;
  cssVar: string;
  token: string;
  description: string;
}
interface EmphasisGroup {
  name: string;
  default: Omit<TokenRow, 'name'>;
  hover: Omit<TokenRow, 'name'>;
  pressed: Omit<TokenRow, 'name'>;
}
interface BgFamily {
  label: string;
  emphasis: EmphasisGroup[];
}
interface Group {
  label: string;
  id: string;
  description: string;
  tokens: Omit<TokenRow, 'name'>[];
}

@Component({
  selector: 'app-color-semantic-page',
  templateUrl: './color-semantic-page.html',
  styleUrl: './color-semantic-page.css',
})
export class ColorSemanticPage {
  protected readonly bgBase: Omit<TokenRow, 'name'>[] = [
    { cssVar: '--color-background-base', token: 'color/background/base', description: 'Fondo raíz de la página' },
    { cssVar: '--color-background-selected', token: 'color/background/selected', description: 'Relleno de ítem activo o seleccionado' },
    { cssVar: '--color-background-disabled', token: 'color/background/disabled', description: 'Fondo de control deshabilitado' },
    { cssVar: '--color-background-skeleton-base', token: 'color/background/skeleton/base', description: 'Fondo del skeleton de carga' },
    { cssVar: '--color-background-skeleton-shimmer', token: 'color/background/skeleton/shimmer', description: 'Capa animada del skeleton de carga' },
    { cssVar: '--color-background-blanket-default', token: 'color/background/blanket/default', description: 'Overlay de modal o drawer' },
    { cssVar: '--color-background-blanket-danger', token: 'color/background/blanket/danger', description: 'Overlay de confirmación destructiva' },
  ];

  protected readonly bgFamilies: BgFamily[] = [
    {
      label: 'Neutral',
      emphasis: [
        { name: 'Subtlest', default: { cssVar: '--color-background-neutral-subtlest', token: 'color/background/neutral/subtlest', description: 'Relleno neutral más tenue, filas cebra' }, hover: { cssVar: '--color-background-neutral-subtlest-hover', token: 'color/background/neutral/subtlest:hover', description: 'Hover sobre neutral subtlest' }, pressed: { cssVar: '--color-background-neutral-subtlest-pressed', token: 'color/background/neutral/subtlest:pressed', description: 'Pressed sobre neutral subtlest' } },
        { name: 'Subtle', default: { cssVar: '--color-background-neutral-subtle', token: 'color/background/neutral/subtle', description: 'Contenedores sutiles y superficies secundarias' }, hover: { cssVar: '--color-background-neutral-subtle-hover', token: 'color/background/neutral/subtle:hover', description: 'Hover sobre neutral subtle' }, pressed: { cssVar: '--color-background-neutral-subtle-pressed', token: 'color/background/neutral/subtle:pressed', description: 'Pressed sobre neutral subtle' } },
        { name: 'Default', default: { cssVar: '--color-background-neutral-default', token: 'color/background/neutral/default', description: 'Fondo neutral por defecto' }, hover: { cssVar: '--color-background-neutral-default-hover', token: 'color/background/neutral/default:hover', description: 'Hover sobre neutral default' }, pressed: { cssVar: '--color-background-neutral-default-pressed', token: 'color/background/neutral/default:pressed', description: 'Pressed sobre neutral default' } },
        { name: 'Bolder', default: { cssVar: '--color-background-neutral-bolder', token: 'color/background/neutral/bolder', description: 'Neutral más intenso, divisores' }, hover: { cssVar: '--color-background-neutral-bolder-hover', token: 'color/background/neutral/bolder:hover', description: 'Hover sobre neutral bolder' }, pressed: { cssVar: '--color-background-neutral-bolder-pressed', token: 'color/background/neutral/bolder:pressed', description: 'Pressed sobre neutral bolder' } },
        { name: 'Boldest', default: { cssVar: '--color-background-neutral-boldest', token: 'color/background/neutral/boldest', description: 'Relleno neutral más intenso' }, hover: { cssVar: '--color-background-neutral-boldest-hover', token: 'color/background/neutral/boldest:hover', description: 'Hover sobre neutral boldest' }, pressed: { cssVar: '--color-background-neutral-boldest-pressed', token: 'color/background/neutral/boldest:pressed', description: 'Pressed sobre neutral boldest' } },
      ],
    },
    {
      label: 'Brand',
      emphasis: [
        { name: 'Subtlest', default: { cssVar: '--color-background-brand-subtlest', token: 'color/background/brand/subtlest', description: 'Superficie con tinte de marca, ítems seleccionados' }, hover: { cssVar: '--color-background-brand-subtlest-hover', token: 'color/background/brand/subtlest:hover', description: 'Hover sobre brand subtlest' }, pressed: { cssVar: '--color-background-brand-subtlest-pressed', token: 'color/background/brand/subtlest:pressed', description: 'Pressed sobre brand subtlest' } },
        { name: 'Default', default: { cssVar: '--color-background-brand-default', token: 'color/background/brand/default', description: 'Fondo de acción primaria, botones y CTAs' }, hover: { cssVar: '--color-background-brand-default-hover', token: 'color/background/brand/default:hover', description: 'Hover sobre brand default' }, pressed: { cssVar: '--color-background-brand-default-pressed', token: 'color/background/brand/default:pressed', description: 'Pressed sobre brand default' } },
        { name: 'Bolder', default: { cssVar: '--color-background-brand-bolder', token: 'color/background/brand/bolder', description: 'Relleno de marca de énfasis alto' }, hover: { cssVar: '--color-background-brand-bolder-hover', token: 'color/background/brand/bolder:hover', description: 'Hover sobre brand bolder' }, pressed: { cssVar: '--color-background-brand-bolder-pressed', token: 'color/background/brand/bolder:pressed', description: 'Pressed sobre brand bolder' } },
      ],
    },
  ];

  protected readonly groups: Group[] = [
    {
      label: 'Text', id: 'text', description: 'Controla el color de todo el contenido tipográfico.',
      tokens: [
        { cssVar: '--color-text-base-subtlest', token: 'color/text/base/subtlest', description: 'Metadatos de menor prioridad' },
        { cssVar: '--color-text-base-subtle', token: 'color/text/base/subtle', description: 'Contenido secundario: captions, labels' },
        { cssVar: '--color-text-base-default', token: 'color/text/base/default', description: 'Cuerpo de texto estándar' },
        { cssVar: '--color-text-base-bolder', token: 'color/text/base/bolder', description: 'Contenido enfatizado: subtítulos' },
        { cssVar: '--color-text-base-boldest', token: 'color/text/base/boldest', description: 'Máximo contraste: títulos de página' },
        { cssVar: '--color-text-inverse', token: 'color/text/inverse', description: 'Texto sobre fondos oscuros o de marca' },
        { cssVar: '--color-text-brand-default', token: 'color/text/brand/default', description: 'Labels y links con color de marca' },
        { cssVar: '--color-text-danger-default', token: 'color/text/danger/default', description: 'Texto de mensaje de error' },
        { cssVar: '--color-text-warning-default', token: 'color/text/warning/default', description: 'Texto de mensaje de advertencia' },
        { cssVar: '--color-text-success-default', token: 'color/text/success/default', description: 'Texto de confirmación positiva' },
        { cssVar: '--color-text-link-default', token: 'color/text/link/default', description: 'Estado default de hipervínculos' },
      ],
    },
    {
      label: 'Border', id: 'border', description: 'Bordes de campos de formulario, cards, separadores y anillos de foco.',
      tokens: [
        { cssVar: '--color-border-default', token: 'color/border/default', description: 'Borde estándar para inputs y cards' },
        { cssVar: '--color-border-divider', token: 'color/border/divider', description: 'Separadores de sección' },
        { cssVar: '--color-border-neutral-subtle', token: 'color/border/neutral/subtle', description: 'Borde de contenedor sutil' },
        { cssVar: '--color-border-neutral-default', token: 'color/border/neutral/default', description: 'Bordes de inputs y cards' },
        { cssVar: '--color-border-brand-default', token: 'color/border/brand/default', description: 'Bordes de componentes con color de marca' },
        { cssVar: '--color-border-selected', token: 'color/border/selected', description: 'Indicador de opción seleccionada' },
        { cssVar: '--color-border-focused', token: 'color/border/focused', description: 'Anillo de foco por teclado' },
        { cssVar: '--color-border-danger-default', token: 'color/border/danger/default', description: 'Borde de error de validación' },
      ],
    },
    {
      label: 'Icon', id: 'icon', description: 'Color de relleno o trazo para íconos e ilustraciones SVG.',
      tokens: [
        { cssVar: '--color-icon-neutral-subtle', token: 'color/icon/neutral/subtle', description: 'Ícono secundario o decorativo' },
        { cssVar: '--color-icon-neutral-default', token: 'color/icon/neutral/default', description: 'Ícono estándar' },
        { cssVar: '--color-icon-brand-default', token: 'color/icon/brand/default', description: 'Ícono con color de marca' },
        { cssVar: '--color-icon-selected', token: 'color/icon/selected', description: 'Ícono de navegación activo o toggle encendido' },
        { cssVar: '--color-icon-disabled', token: 'color/icon/disabled', description: 'Ícono no interactivo' },
        { cssVar: '--color-icon-inverse', token: 'color/icon/inverse', description: 'Ícono sobre relleno oscuro o de marca' },
      ],
    },
  ];
}
