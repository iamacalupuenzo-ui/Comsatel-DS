import { Component, EventEmitter, Input, Output } from '@angular/core';

export type AvatarAddButtonSize = 'xs' | 'sm' | 'md';

const AVATAR_PX: Record<AvatarAddButtonSize, number> = { xs: 24, sm: 32, md: 40 };
const ICON_PX: Record<AvatarAddButtonSize, number> = { xs: 16, sm: 16, md: 20 };

@Component({
  selector: 'cs-avatar-add-button',
  templateUrl: './avatar-add-button.html',
  styleUrl: './avatar-add-button.css',
})
export class AvatarAddButton {
  @Input() size: AvatarAddButtonSize = 'sm';
  @Input() disabled = false;
  // Solo para la página de documentación: fuerza visualmente el estado
  // hover/focus sin necesidad de un puntero real, para mostrar los cuatro
  // estados uno al lado del otro (mismo recurso que React resuelve con un
  // className/style de override puntual en su demo).
  @Input() forceHover = false;
  @Input() forceFocus = false;
  @Output() addClick = new EventEmitter<void>();

  get px(): number {
    return AVATAR_PX[this.size];
  }
  get iconPx(): number {
    return ICON_PX[this.size];
  }
}
