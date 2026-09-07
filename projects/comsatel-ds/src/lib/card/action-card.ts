import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
import { Toggle } from '../toggle/toggle';

// Puerto 1:1 de ActionCard (card.tsx) — fila de acción con logo opcional,
// título/descripción, y un control de la derecha (toggle real, botón, o
// etiqueta de texto). El toggle usa <cs-toggle size="md"> real en vez de
// redibujar un track/thumb aparte, aunque React sí lo hacía a mano ahí.
@Component({
  selector: 'cs-action-card',
  imports: [Button, Toggle],
  templateUrl: './action-card.html',
  styleUrl: './action-card.css',
})
export class ActionCard {
  @Input() title = 'Title';
  @Input() description = 'Description';
  @Input() showLogo = false;
  @Input() showToggle = false;
  @Input() toggleChecked = false;
  @Input() showButton = true;
  @Input() buttonLabel = 'Action';
  @Input() showLabel = false;
  @Input() label = 'Coming soon';
}
