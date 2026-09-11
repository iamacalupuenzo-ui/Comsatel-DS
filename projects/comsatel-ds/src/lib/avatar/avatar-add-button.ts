import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';

export type AvatarAddButtonSize = 'xs' | 'sm' | 'md';

const AVATAR_SIZE: Record<AvatarAddButtonSize, string> = {
  xs: 'var(--layout-size-sm)',
  sm: 'var(--layout-size-base)',
  md: 'var(--layout-size-md)',
};
const ICON_PX: Record<AvatarAddButtonSize, number> = { xs: 16, sm: 16, md: 20 };

@Component({
  selector: 'cs-avatar-add-button',
  imports: [Icon],
  templateUrl: './avatar-add-button.html',
  styleUrl: './avatar-add-button.css',
})
export class AvatarAddButton {
  @Input() size: AvatarAddButtonSize = 'sm';
  @Input() disabled = false;
  @Input('aria-label') ariaLabel = 'Agregar usuario';
  // Solo para la página de documentación: fuerza visualmente el estado
  // hover/focus sin necesidad de un puntero real, para mostrar los cuatro
  // estados uno al lado del otro (mismo recurso que React resuelve con un
  // className/style de override puntual en su demo).
  @Input() forceHover = false;
  @Input() forceFocus = false;
  @Output() addClick = new EventEmitter<void>();

  get sizeValue(): string {
    return AVATAR_SIZE[this.size];
  }
  get iconPx(): number {
    return ICON_PX[this.size];
  }
}
