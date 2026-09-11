import { Component, Input, inject } from '@angular/core';
import { Icon } from '../icons/icon';
import { PressScale } from '../directives/press-scale.directive';
import { AppLayoutState } from './app-layout-state';

/**
 * Shell de página reusable para productos construidos sobre el sistema:
 * mismas 4 áreas y los mismos modos responsivos que ya definió
 * foundations/layout (Expandido/Rail — Drawer mobile queda fuera a
 * propósito, ver app-layout-state.ts). No conoce datos de navegación ni
 * íconos de ningún producto — el contenido de cada área se proyecta desde
 * afuera vía [topnav]/[sidenav]/[panel] (main es el `<ng-content>` por
 * defecto). El motor de comportamiento (breakpoints, colapsar/expandir,
 * persistencia) vive en `AppLayoutState`, inyectable por cualquier
 * componente de la app (ver comentario en app-layout-state.ts sobre por
 * qué es `providedIn: 'root'` y no un provider del propio componente).
 */
@Component({
  selector: 'cs-app-layout',
  imports: [Icon, PressScale],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
  host: {
    '[attr.data-mode]': 'state.mode()',
    '[attr.data-has-panel]': 'hasPanel',
  },
})
export class AppLayout {
  /** Si el consumidor proyecta contenido en [panel], reserva su espacio a
   * partir de --breakpoint-xl. Sin esto, un [panel] vacío no debe dejar un
   * hueco reservado en el área main. */
  @Input() hasPanel = false;

  /** Oculta el botón de colapsar/expandir al pie del side nav, para un
   * producto que prefiera controlar el modo desde su propia UI (inyectando
   * AppLayoutState directo) en vez de usar el botón por defecto. */
  @Input() showCollapseButton = true;

  protected readonly state = inject(AppLayoutState);
}
