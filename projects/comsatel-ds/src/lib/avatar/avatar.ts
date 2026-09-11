import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { componentTypography, textStyle } from '../tokens/typography';
import { Icon } from '../icons/icon';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'offline' | 'online' | 'busy' | 'company';

const AVATAR_SIZE: Record<AvatarSize, string> = {
  xs: 'var(--layout-size-sm)',
  sm: 'var(--layout-size-base)',
  md: 'var(--layout-size-md)',
  lg: 'var(--layout-size-lg)',
  xl: 'var(--layout-size-xl)',
};
const INDICATOR_PX: Record<AvatarSize, number> = { xs: 6, sm: 8, md: 10, lg: 12, xl: 14 };
// El indicador company usa borde fino: el ícono ocupa exactamente el área
// interior y evita que el SVG se recorte dentro de un punto de estado pequeño.
const COMPANY_ICON_PX: Record<AvatarSize, number> = { xs: 4, sm: 6, md: 8, lg: 10, xl: 12 };
const ICON_PX: Record<AvatarSize, number> = { xs: 12, sm: 16, md: 20, lg: 24, xl: 28 };
const STATUS_LABEL: Record<AvatarStatus, string> = {
  online: 'En línea',
  offline: 'Desconectado',
  busy: 'Ocupado',
  company: 'Cuenta de compañía',
};

@Component({
  selector: 'cs-avatar',
  imports: [NgStyle, Icon],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() size: AvatarSize = 'md';
  @Input() status?: AvatarStatus;
  @Input() src?: string;
  @Input() alt = '';
  @Input() initials?: string;
  @Input() companyIconSrc?: string;
  // Opcional — solo lo usa una constelación decorativa de avatares sin foto
  // real (FeatureSpotlightCard) que necesita variar el color de fondo del
  // placeholder por posición. El resto de usos de Avatar no lo setea y
  // sigue con el brand-subtle de siempre.
  @Input() placeholderBg = 'var(--color-background-brand-subtle)';
  // Opcional — el placeholder real del sistema (silueta + color) asume que
  // el círculo representa a UNA persona identificable sin foto todavía.
  // La constelación decorativa de Card (FeatureSpotlightCard) y el stack
  // de avatares de CardBanner usan el mismo círculo de color SIN silueta
  // cuando no hay foto real — así lo dibuja el sistema real (círculos de
  // color planos, ver card.tsx), y meterle el ícono de Avatar ahí agrega
  // un elemento que ese diseño no tiene. Default `true` para no cambiar
  // ningún otro uso existente de Avatar.
  @Input() showPlaceholderIcon = true;

  get sizeValue(): string {
    return AVATAR_SIZE[this.size];
  }
  get indicatorPx(): number {
    return INDICATOR_PX[this.size];
  }
  get iconPx(): number {
    return ICON_PX[this.size];
  }
  get companyIconPx(): number {
    return COMPANY_ICON_PX[this.size];
  }
  get indicatorBorder(): string {
    return this.status === 'company' || this.size === 'xs' || this.size === 'sm'
      ? 'var(--layout-border-thin)'
      : 'var(--layout-border-thick)';
  }
  get statusLabel(): string {
    return this.status ? STATUS_LABEL[this.status] : '';
  }
  get isImage(): boolean {
    return !!this.src;
  }
  get isText(): boolean {
    return !this.src && !!this.initials;
  }
  get isPlaceholder(): boolean {
    return !this.src && !this.initials;
  }
  get hasStatus(): boolean {
    return !!this.status;
  }
  /**
   * La foto nativa ya usa `alt`. Para iniciales y placeholder, el círculo
   * necesita el mismo nombre accesible cuando se proporciona `alt`.
   */
  get accessibleAvatarLabel(): string {
    return this.alt || (this.isText ? this.initials ?? '' : '');
  }
  get textStyle(): Record<string, string> {
    const name = componentTypography.avatar[this.size];
    return textStyle(name, 'accent');
  }
}
