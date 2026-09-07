import { Component } from '@angular/core';

const CODE = `// Angular
<div style="padding: var(--layout-padding-xl); gap: var(--layout-gap-md);"></div>`;

const RULES: [string, string][] = [
  ['Empieza con 8px', 'MD es el ritmo base. Usa 4px y 6px en relaciones densas; aumenta en incrementos para secciones y superficies.'],
  ['Separa los roles', 'No uses margin para imitar padding de un contenedor. Usa padding para márgenes internos y gap para relaciones entre elementos hermanos.'],
  ['Usa alias en componentes', 'Los componentes deben consumir variables CSS como var(--layout-gap-md), nunca un valor en píxeles copiado.'],
  ['Mantén separados los objetivos táctiles', 'Usa tokens de tamaño para dimensiones predecibles de controles. Los tokens de espaciado definen el interior y el espacio alrededor del contenido.'],
];

@Component({
  selector: 'app-spacing-page',
  templateUrl: './spacing-page.html',
  styleUrl: './spacing-page.css',
})
export class SpacingPage {
  protected readonly rules = RULES;
  protected readonly code = CODE;
}
