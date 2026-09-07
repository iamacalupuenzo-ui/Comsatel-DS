import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';
import type { DropdownItem, DropdownSelectionMode, DropdownSize } from './dropdown-types';
import { ITEM_TOKENS, hoverBgFor } from './dropdown-tokens';

// Puerto 1:1 de MenuItem en dropdown.tsx. El glyph de checkbox/radio calca
// exactamente el cuadrado/anillo real de Checkbox/Radio (mismas clases CSS
// cs-checkbox__box y cs-dropdown-item__radio-ring) para que ambos queden
// atados al mismo código, igual que en React.
@Component({
  selector: 'cs-dropdown-item',
  imports: [Icon],
  templateUrl: './dropdown-item.html',
  styleUrl: './dropdown-item.css',
})
export class DropdownItemComponent {
  @Input({ required: true }) item!: DropdownItem;
  @Input() size: DropdownSize = 'sm';
  @Input() selectionMode: DropdownSelectionMode = 'none';
  @Output() itemSelect = new EventEmitter<DropdownItem>();

  get tok() {
    return ITEM_TOKENS[this.size];
  }

  get role(): string {
    return this.selectionMode === 'checkbox' ? 'menuitemcheckbox' : this.selectionMode === 'radio' ? 'menuitemradio' : 'menuitem';
  }

  get hoverBg(): string {
    return hoverBgFor(this.item.variant);
  }

  get textColor(): string {
    if (this.item.variant === 'destructive') return 'var(--color-text-danger-bolder)';
    if (this.item.variant === 'success') return 'var(--color-text-success-bolder)';
    if (this.item.disabled) return 'var(--color-text-disabled)';
    return 'var(--color-text-base-default)';
  }

  get badgeBg(): string {
    return this.item.variant === 'destructive' ? 'var(--color-background-danger-subtlest)' : 'var(--color-background-brand-subtlest)';
  }
  get badgeBorder(): string {
    return this.item.variant === 'destructive' ? 'var(--color-border-danger-subtle)' : 'var(--color-border-brand-subtle)';
  }
  get badgeColor(): string {
    return this.item.variant === 'destructive' ? 'var(--color-text-danger-bolder)' : 'var(--color-text-brand-bolder)';
  }

  get glyphSize(): number {
    return this.tok.iconSize - 2;
  }
  get checkIconSize(): number {
    return this.tok.iconSize - 6;
  }
  get radioDotSize(): number {
    let d = Math.round(this.glyphSize * 0.5);
    if ((this.glyphSize - d) % 2 !== 0) d += 1;
    return d;
  }

  onClick(): void {
    if (!this.item.disabled) this.itemSelect.emit(this.item);
  }
}
