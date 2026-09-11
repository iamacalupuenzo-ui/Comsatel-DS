import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppLayout, AppLayoutState, Icon, PressScale, type IconName } from 'comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

interface DemoNavItem {
  title: string;
  icon: IconName;
  active?: boolean;
}

const DEMO_NAV: DemoNavItem[] = [
  { title: 'Resumen', icon: 'layout-grid', active: true },
  { title: 'Vehículos', icon: 'app-window' },
  { title: 'Alertas', icon: 'bell-ring' },
  { title: 'Reportes', icon: 'table-2' },
  { title: 'Configuración', icon: 'toggle-left' },
];

const USAGE_SNIPPET = `<cs-app-layout [hasPanel]="true">
  <header topnav>
    <a class="brand" routerLink="/">Mi producto</a>
  </header>

  <nav sidenav>
    <!-- tu propio componente de navegación, adaptado a los datos
         del producto — inyecta AppLayoutState si necesita saber
         el modo actual (expandido/rail) para decidir qué mostrar -->
  </nav>

  <router-outlet></router-outlet>

  <aside panel>
    <!-- contenido contextual opcional -->
  </aside>
</cs-app-layout>`;

@Component({
  selector: 'app-app-layout-page',
  imports: [AppLayout, Icon, PressScale, CodeBlock, RouterLink],
  templateUrl: './app-layout-page.html',
  styleUrl: './app-layout-page.css',
})
export class AppLayoutPage {
  protected readonly demoNav = DEMO_NAV;
  protected readonly usageSnippet = USAGE_SNIPPET;
  // Mismo servicio que inyectaría el propio nav de un producto real — acá
  // se usa para decidir si el demo muestra el label junto al ícono, la
  // pieza que AppLayout NO puede resolver solo (ver nota en la página).
  protected readonly layoutState = inject(AppLayoutState);
}
