import { Component } from '@angular/core';
import { CodeBlock } from '../../shared/docs/code-block';

interface LayoutArea {
  name: string;
  token: string;
  desc: string;
}

interface SidenavMode {
  name: string;
  width: string;
  desc: string;
}

interface Breakpoint {
  token: string;
  value: string;
  sidenav: string;
}

const AREAS: LayoutArea[] = [
  {
    name: 'Top nav',
    token: '--layout-topnav-height: 56px',
    desc: 'Barra fija en todo el ancho. Contiene el logo del producto, el botón para abrir el side nav en pantallas chicas, y acciones globales. Siempre visible, nunca se va con el scroll.',
  },
  {
    name: 'Side nav',
    token: '--layout-sidenav-width-expanded: 240px / --layout-sidenav-width-collapsed: 64px',
    desc: 'Navegación principal, debajo del top nav a la izquierda. Tres modos según el tamaño de pantalla y la elección del usuario — ver abajo. Nunca contiene contenido de página.',
  },
  {
    name: 'Main',
    token: 'flex: 1',
    desc: 'La página en sí: encabezado y contenido. Ocupa todo el ancho que sobra después del side nav y el panel. Nunca tiene un ancho fijo — es el área que absorbe el espacio restante.',
  },
  {
    name: 'Panel',
    token: '--layout-panel-width: 192px',
    desc: 'Columna contextual opcional a la derecha de main (en este sitio se usa para la tabla de contenidos). Se oculta por debajo del breakpoint xl — nunca debe ser la única forma de llegar a contenido importante.',
  },
];

const MODES: SidenavMode[] = [
  {
    name: 'Expandido',
    width: '240px',
    desc: 'Labels completos, agrupados por sección. Por defecto en desktop (≥1024px). El usuario puede colapsarlo a rail desde el botón al pie del side nav.',
  },
  {
    name: 'Rail',
    width: '64px',
    desc: 'Solo íconos. Por defecto en tablet (768–1023px). Pasar el mouse o enfocar un ícono abre un flyout con su label, o sus enlaces hijos si tiene.',
  },
  {
    name: 'Drawer',
    width: '240px (overlay)',
    desc: 'Completamente oculto por defecto por debajo de 768px — a ese tamaño no hay side nav permanente. Un botón de menú en el top nav lo abre como overlay con backdrop; se cierra con clic afuera, Escape, o al elegir un enlace.',
  },
];

const BREAKPOINTS: Breakpoint[] = [
  { token: '--breakpoint-sm', value: '640px', sidenav: 'Drawer (oculto)' },
  { token: '--breakpoint-md', value: '768px', sidenav: 'Rail' },
  { token: '--breakpoint-lg', value: '1024px', sidenav: 'Expandido' },
  { token: '--breakpoint-xl', value: '1280px', sidenav: 'Expandido + panel visible' },
  { token: '--breakpoint-2xl', value: '1536px', sidenav: 'Expandido + panel visible' },
];

const USAGE_SNIPPET = `<header class="topnav">...</header>

<aside class="sidebar" [attr.data-sidenav-mode]="mode">...</aside>

<main class="content">
  <router-outlet></router-outlet>
</main>

<app-table-of-contents></app-table-of-contents>`;

@Component({
  selector: 'app-layout-page',
  imports: [CodeBlock],
  templateUrl: './layout-page.html',
  styleUrl: './layout-page.css',
})
export class LayoutPage {
  protected readonly areas = AREAS;
  protected readonly modes = MODES;
  protected readonly breakpoints = BREAKPOINTS;
  protected readonly usageSnippet = USAGE_SNIPPET;
}
