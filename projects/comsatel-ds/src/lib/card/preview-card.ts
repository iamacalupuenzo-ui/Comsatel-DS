import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '../icons/icon';

// Puerto 1:1 de PreviewCard — bloque de vista previa (imagen o placeholder
// "Preview") con una franja inferior de nombre + botón de opciones.
@Component({
  selector: 'cs-preview-card',
  imports: [Button, Icon],
  templateUrl: './preview-card.html',
  styleUrl: './preview-card.css',
})
export class PreviewCard {
  @Input() name = 'Project name';
  @Input() showLogo = false;
  @Input() showImage = false;
  @Output() options = new EventEmitter<void>();
}
