import { Component } from '@angular/core';

interface ShadowStep {
  token: string;
  label: string;
  css: string;
  level: number;
  use: string;
}

interface ElevationSurface {
  id: string;
  label: string;
  token: string;
  shadow: string;
  bg: string;
  zindex: string;
  desc: string;
}

interface ZIndexLevel {
  name: string;
  value: string;
  token: string;
  use: string;
}

const SHADOWS: ShadowStep[] = [
  {
    token: '--shadow-xs',
    label: 'XSmall',
    css: '0 1px 2px 0 rgba(28,28,28,0.05)',
    level: 1,
    use: 'Elevación sutil para campos, casillas y botones pequeños en reposo. Casi imperceptible: apenas distingue del fondo de página.',
  },
  {
    token: '--shadow-sm',
    label: 'Small',
    css: '0 1px 3px 0 rgba(28,28,28,0.08), 0 1px 2px -1px rgba(28,28,28,0.06)',
    level: 2,
    use: 'Tarjetas y elementos de lista que necesitan separarse del fondo. La sombra más usada del sistema.',
  },
  {
    token: '--shadow-md',
    label: 'Medium',
    css: '0 2px 4px 0 rgba(28,28,28,0.05), 0 4px 6px 0 rgba(28,28,28,0.08)',
    level: 3,
    use: 'Menús desplegables, selectores de fecha, popovers pequeños. Profundidad suficiente sin sentirse pesada.',
  },
  {
    token: '--shadow-lg',
    label: 'Large',
    css: '0 4px 6px -2px rgba(28,28,28,0.05), 0 12px 16px -4px rgba(28,28,28,0.10)',
    level: 4,
    use: 'Paneles laterales, barras fijas, menús grandes. Comunica una capa persistente anclada al layout.',
  },
  {
    token: '--shadow-xl',
    label: 'XLarge',
    css: '0 8px 8px -4px rgba(28,28,28,0.04), 0 20px 24px -4px rgba(28,28,28,0.12)',
    level: 5,
    use: 'Ventanas modales, diálogos, paneles deslizantes. La sombra más pesada: reservada para la superficie más alta.',
  },
];

const ELEVATIONS: ElevationSurface[] = [
  {
    id: 'sunken',
    label: 'Hundida',
    token: '--elevation-surface-sunken',
    shadow: 'none',
    bg: 'var(--elevation-surface-sunken)',
    zindex: '0',
    desc: 'Superficies hundidas: bloques de código, campos deshabilitados, pozos internos. Sin sombra; un fondo más oscuro transmite profundidad bajo la página.',
  },
  {
    id: 'default',
    label: 'Predeterminada',
    token: '--elevation-surface-default',
    shadow: 'none',
    bg: 'var(--elevation-surface-default)',
    zindex: '0',
    desc: 'La superficie base de la página. Tarjetas y contenedores en reposo. Sin sombra; al ras del resto de la página.',
  },
  {
    id: 'raised',
    label: 'Elevada',
    token: '--elevation-surface-raised',
    shadow: 'var(--shadow-sm)',
    bg: 'var(--elevation-surface-raised)',
    zindex: '1',
    desc: 'Elementos que flotan sobre la página mientras siguen anclados a ella: tarjetas interactivas, filas de lista al pasar el cursor. Usa shadow-sm.',
  },
  {
    id: 'overlay',
    label: 'Superpuesta',
    token: '--elevation-surface-overlay',
    shadow: 'var(--shadow-xl)',
    bg: 'var(--elevation-surface-overlay)',
    zindex: '300',
    desc: 'Superficies que flotan sobre todo el contenido: modales, paneles, diálogos. Usa shadow-xl. Siempre acompañada de un fondo de bloqueo.',
  },
];

const Z_INDEX_LEVELS: ZIndexLevel[] = [
  { name: 'Base', value: '0', token: '--elevation-z-index-base', use: 'Todos los elementos en flujo normal. No requiere override.' },
  { name: 'Elevada', value: '1', token: '--elevation-z-index-raised', use: 'Tarjetas y filas de lista elevadas al pasar el cursor o enfocar.' },
  { name: 'Desplegable', value: '100', token: '--elevation-z-index-dropdown', use: 'Menús, autocompletados, opciones de select, selectores de fecha.' },
  { name: 'Fija', value: '200', token: '--elevation-z-index-sticky', use: 'Encabezados fijos, barras de acción flotantes, barras de herramientas ancladas.' },
  { name: 'Modal', value: '300', token: '--elevation-z-index-modal', use: 'Ventanas modales y paneles laterales, por encima de los elementos fijos.' },
  { name: 'Fondo', value: '400', token: '--elevation-z-index-overlay', use: 'Fondo de bloqueo (scrim) que se renderiza debajo de las ventanas modales.' },
  { name: 'Notificación', value: '500', token: '--elevation-z-index-toast', use: 'Notificaciones toast: siempre visibles por encima de las ventanas modales.' },
  { name: 'Ayuda contextual', value: '600', token: '--elevation-z-index-tooltip', use: 'Ayudas contextuales (tooltips): la capa interactiva más alta.' },
];

const DO_ITEMS = [
  'Ajusta el nivel de sombra a la elevación real: una tarjeta en reposo usa shadow-sm, no shadow-xl.',
  'Usa los tokens de superficie de elevación para que el color de fondo y la sombra siempre estén sincronizados.',
  'Usa los tokens de z-index; nunca escribas z-index: 999 ni valores arbitrarios.',
  'Combina un fondo de bloqueo con shadow-xl en las ventanas modales para que la relación de superposición sea clara.',
];

const DONT_ITEMS = [
  'Evita saltar niveles de sombra: pasar de shadow-xs a shadow-xl confunde la jerarquía.',
  'Evita aplicar sombras a superficies hundidas o en flujo normal; usa el color de fondo para transmitir profundidad ahí.',
  'Evita usar la sombra como decoración de texto o íconos; pertenece solo a superficies de contenedor.',
  'Evita escribir valores de box-shadow directos en línea; referencia siempre un token para que los temas puedan sobrescribirlo.',
];

@Component({
  selector: 'app-effects-page',
  templateUrl: './effects-page.html',
  styleUrl: './effects-page.css',
})
export class EffectsPage {
  protected readonly shadows = SHADOWS;
  protected readonly elevations = ELEVATIONS;
  protected readonly zIndexLevels = Z_INDEX_LEVELS;
  protected readonly doItems = DO_ITEMS;
  protected readonly dontItems = DONT_ITEMS;
}

