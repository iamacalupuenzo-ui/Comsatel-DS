import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { componentTypography, textStyle } from '../tokens/typography';

export type BadgeVariant =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral-solid'
  | 'brand-solid'
  | 'success-solid'
  | 'warning-solid'
  | 'danger-solid'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'cs-badge',
  imports: [NgStyle],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  @Input() variant: BadgeVariant = 'neutral';
  @Input() size: BadgeSize = 'md';
  @Input() pill = false;

  get classes(): string {
    return `cs-badge cs-badge--${this.variant} cs-badge--${this.size}`;
  }

  get style(): Record<string, string> {
    const radius = this.pill ? 'var(--radius-full)' : this.size === 'lg' ? 'var(--radius-sm)' : 'var(--radius-xs)';
    return { ...textStyle(componentTypography.badge[this.size], 'accent'), borderRadius: radius };
  }
}
