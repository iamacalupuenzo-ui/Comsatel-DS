import { Component, HostBinding, Input } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'subtle'
  | 'link'
  | 'destructive'
  | 'success'
  | 'warning';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'cs-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'sm';
  @Input() loading = false;
  @Input() selected = false;
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input('aria-label') ariaLabel = '';

  @HostBinding('class.cs-button-host--full') get isFullHost(): boolean {
    return this.fullWidth;
  }

  get classes(): string {
    const parts = [
      'cs-button',
      `cs-button--${this.variant}`,
      `cs-button--${this.size}`,
    ];
    if (this.selected) parts.push('cs-button--selected');
    if (this.fullWidth) parts.push('cs-button--full');
    return parts.join(' ');
  }
}
