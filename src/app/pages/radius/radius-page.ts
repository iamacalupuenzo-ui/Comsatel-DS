import { AfterViewInit, Component, signal } from '@angular/core';

interface RadiusToken {
  token: string;
  label: string;
  use: string;
}

interface UsageCard {
  id: string;
  heading: string;
  token: string;
  desc: string;
  items: { label: string; bg: string; color: string; border: string }[];
}

const TOKENS: RadiusToken[] = [
  { token: '--radius-none', label: 'None', use: 'Divisores, imágenes sin margen y celdas al ras de su contenedor.' },
  { token: '--radius-xs', label: 'XSmall', use: 'Etiquetas en línea, fragmentos de código e indicadores de estado.' },
  { token: '--radius-sm', label: 'Small', use: 'Botones, campos, etiquetas y casillas. Referencia para controles interactivos.' },
  { token: '--radius-md', label: 'Medium', use: 'Menús desplegables, ayudas contextuales y paneles flotantes pequeños.' },
  { token: '--radius-lg', label: 'Large', use: 'Tarjetas, paneles y avisos dentro del contenido.' },
  { token: '--radius-xl', label: 'XLarge', use: 'Ventanas modales, diálogos y paneles laterales.' },
  { token: '--radius-2xl', label: '2XLarge', use: 'Tarjetas destacadas y contenedores de imágenes grandes.' },
  { token: '--radius-full', label: 'Full', use: 'Avatares, etiquetas con extremos redondeados e interruptores.' },
];

const USAGE_CARDS: UsageCard[] = [
  {
    id: 'badge-chip',
    heading: 'Extrapequeño — Etiquetas',
    token: '--radius-xs',
    desc: 'El radio XS mantiene compactos los elementos en línea. Úsalo como referencia para etiquetas de estado, versiones y tokens de código.',
    items: [
      { label: 'v2.4.1', bg: 'var(--color-background-brand-subtlest)', color: 'var(--color-text-brand-default)', border: 'var(--color-border-brand-subtle)' },
      { label: 'Estable', bg: 'var(--color-background-success-subtlest)', color: 'var(--color-text-success-default)', border: 'var(--color-border-success-subtle)' },
      { label: 'Beta', bg: 'var(--color-background-warning-subtlest)', color: 'var(--color-text-warning-default)', border: 'var(--color-border-warning-subtle)' },
      { label: 'Peligro', bg: 'var(--color-background-danger-subtlest)', color: 'var(--color-text-danger-default)', border: 'var(--color-border-danger-subtle)' },
    ],
  },
  {
    id: 'controls',
    heading: 'Pequeño — Controles',
    token: '--radius-sm',
    desc: 'El radio SM es una referencia para botones, campos, selectores y casillas. Respeta siempre el token definido por cada componente.',
    items: [
      { label: 'Botón principal', bg: 'var(--color-background-brand-default)', color: 'var(--color-text-inverse)', border: 'transparent' },
      { label: 'Botón predeterminado', bg: 'transparent', color: 'var(--color-text-base-default)', border: 'var(--color-border-neutral-default)' },
      { label: 'Acción destructiva', bg: 'var(--color-background-danger-default)', color: 'var(--color-text-inverse)', border: 'transparent' },
    ],
  },
  {
    id: 'cards',
    heading: 'Grande — Tarjetas y superficies',
    token: '--radius-lg',
    desc: 'El radio LG es una referencia para tarjetas, paneles y avisos. Mantiene una forma consistente entre superficies relacionadas.',
    items: [
      { label: 'Tarjeta de contenido', bg: 'var(--elevation-surface-default)', color: 'var(--color-text-base-bolder)', border: 'var(--color-border-neutral-subtle)' },
      { label: 'Aviso neutro', bg: 'var(--color-background-neutral-subtlest)', color: 'var(--color-text-base-default)', border: 'var(--color-border-neutral-default)' },
      { label: 'Superficie de marca', bg: 'var(--color-background-brand-subtlest)', color: 'var(--color-text-brand-default)', border: 'var(--color-border-brand-subtle)' },
    ],
  },
  {
    id: 'modals',
    heading: 'Extragrande — Ventanas y diálogos',
    token: '--radius-xl',
    desc: 'El radio XL puede aplicarse a ventanas, diálogos y paneles laterales. Define las esquinas; la elevación depende de otros tokens.',
    items: [
      { label: 'Ventana modal', bg: 'var(--elevation-surface-raised)', color: 'var(--color-text-base-bolder)', border: 'var(--color-border-neutral-subtle)' },
      { label: 'Diálogo de alerta', bg: 'var(--color-background-danger-subtlest)', color: 'var(--color-text-danger-default)', border: 'var(--color-border-danger-subtle)' },
    ],
  },
];

const DO_ITEMS = [
  'Usa el token que corresponda al rol del componente: sm para controles, lg para tarjetas, xl para ventanas modales.',
  'Aplica --radius-full solo a elementos pensados para ser circulares o con extremos redondeados.',
  'Mantén las cuatro esquinas iguales, salvo que la composición requiera asimetría.',
  'Usa tokens también en componentes de uso puntual.',
];

const DONT_ITEMS = [
  'Evita valores arbitrarios, como border-radius: 5px o 7px. Selecciona siempre un token de la escala.',
  'Evita mezclar radios en un mismo componente sin una razón de composición.',
  'Reserva el radio completo para círculos y formas con extremos redondeados; en contenedores rectangulares distorsiona la forma.',
  'Evita radios muy pronunciados (2xl) en tablas densas o barras de herramientas.',
];

@Component({
  selector: 'app-radius-page',
  templateUrl: './radius-page.html',
  styleUrl: './radius-page.css',
})
export class RadiusPage implements AfterViewInit {
  protected readonly tokens = TOKENS;
  protected readonly firstRow = TOKENS.slice(0, 4);
  protected readonly secondRow = TOKENS.slice(4);
  protected readonly usageCards = USAGE_CARDS;
  protected readonly doItems = DO_ITEMS;
  protected readonly dontItems = DONT_ITEMS;

  protected readonly resolvedValues = signal<Record<string, string>>({});

  ngAfterViewInit(): void {
    const css = getComputedStyle(document.documentElement);
    const all: Record<string, string> = {};
    for (const { token } of TOKENS) {
      all[token] = css.getPropertyValue(token).trim();
    }
    this.resolvedValues.set(all);
  }

  protected resolvedValueFor(token: string): string {
    return this.resolvedValues()[token] ?? '';
  }
}
