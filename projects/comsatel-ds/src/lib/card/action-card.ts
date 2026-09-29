import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { Button } from '@iamacalupuenzo-ui/comsatel-ds/button';
import { Toggle } from '../toggle/toggle';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';

// Puerto 1:1 de ActionCard (card.tsx) — fila de acción con logo opcional,
// título/descripción, y un control de la derecha (toggle real, botón, o
// etiqueta de texto). El toggle usa <cs-toggle size="md"> real en vez de
// redibujar un track/thumb aparte, aunque React sí lo hacía a mano ahí.
@Component({
  selector: 'cs-action-card',
  imports: [Button, Toggle, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  /** @deprecated Desde 0.3.5: la superficie crema se descartó y se eliminará en 0.4.0. No la uses. */
  readonly surface = input<'default' | 'secondary'>('default');
  readonly selectable = input(false);
  readonly selected = input(false);
  readonly disabled = input(false);
  readonly selectedChange = output<boolean>();
  @Output() readonly buttonClick = new EventEmitter<void>();
  @Output() readonly toggleCheckedChange = new EventEmitter<boolean>();
}
