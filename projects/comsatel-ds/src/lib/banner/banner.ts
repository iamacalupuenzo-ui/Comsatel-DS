import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';

export type BannerVariant = 'brand' | 'neutral' | 'danger' | 'success' | 'warning';

const VARIANT_ICON: Record<BannerVariant, IconName> = {
  brand: 'sparkles',
  neutral: 'info',
  danger: 'alert-triangle',
  success: 'circle-check',
  warning: 'alert-triangle',
};

export interface BannerAction {
  label: string;
}

@Component({
  selector: 'cs-banner',
  imports: [Icon],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  @Input() variant: BannerVariant = 'brand';
  @Input() title?: string;
  @Input() icon = true;
  @Input() action?: BannerAction;
  @Input() dismissible = false;
  @Output() actionClick = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  get iconName(): IconName {
    return VARIANT_ICON[this.variant];
  }

  get classes(): string {
    return `cs-banner cs-banner--${this.variant}`;
  }
}
