import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { INPUT_TOKENS } from '../dropdown/dropdown-tokens';
import type { DropdownSize } from '../dropdown/dropdown-types';
import { Icon } from '../icons/icon';
import { Popover } from '../popover/popover';

let nextColumnManagerId = 0;

export interface ColumnManagerItem {
  key: string;
  label: string;
  visible: boolean;
}

/**
 * Control de configuración para una colección de columnas. Comparte la
 * geometría de un selector de formulario, pero su semántica es un botón que
 * abre un panel de administración: visibilidad y orden son tareas distintas
 * de una selección de valor.
 */
@Component({
  selector: 'cs-column-manager',
  imports: [Icon, Popover],
  templateUrl: './column-manager.html',
  styleUrl: './column-manager.css',
})
export class ColumnManager {
  @Input() label = 'Columnas';
  @Input('aria-label') ariaLabel = 'Administrar columnas';
  @Input() columns: readonly ColumnManagerItem[] = [];
  @Input() size: DropdownSize = 'md';
  @Input() disabled = false;
  @Input() minVisible = 1;
  @Output() readonly visibilityChange = new EventEmitter<string[]>();
  @Output() readonly orderChange = new EventEmitter<string[]>();
  @ViewChild('trigger', { read: ElementRef }) private triggerRef?: ElementRef<HTMLElement>;

  protected readonly open = signal(false);
  protected readonly focused = signal(false);
  protected readonly dragKey = signal<string | null>(null);
  protected readonly dropTargetKey = signal<string | null>(null);
  private readonly instanceId = `cs-column-manager-${nextColumnManagerId += 1}`;

  protected get tok() {
    return INPUT_TOKENS[this.size];
  }
  protected get labelId(): string {
    return `${this.instanceId}-label`;
  }
  protected get visibleCount(): number {
    return this.columns.filter((column) => column.visible).length;
  }
  protected get triggerText(): string {
    return `${this.visibleCount} de ${this.columns.length} visibles`;
  }
  protected get borderColor(): string {
    if (this.disabled) return 'var(--color-border-neutral-subtle)';
    if (this.focused() || this.open()) return 'var(--color-border-brand-default)';
    return 'var(--color-border-neutral-default)';
  }
  protected get extraShadow(): string {
    return !this.disabled && (this.focused() || this.open())
      ? '0 0 0 var(--layout-border-thick) var(--color-border-brand-subtle)'
      : 'none';
  }
  protected get triggerElement(): ElementRef<HTMLElement> | null {
    return this.triggerRef ?? null;
  }

  protected toggle(): void {
    if (this.disabled) return;
    this.open.update((value) => !value);
    this.focused.set(true);
  }
  protected onFocus(): void {
    this.focused.set(true);
  }
  protected onBlur(): void {
    if (!this.open()) this.focused.set(false);
  }
  protected onPopoverClosed(): void {
    this.open.set(false);
    this.focused.set(false);
  }
  protected isVisibilityLocked(column: ColumnManagerItem): boolean {
    return column.visible && this.visibleCount <= this.minVisible;
  }
  protected toggleVisibility(column: ColumnManagerItem): void {
    if (this.isVisibilityLocked(column)) return;
    const visible = this.columns
      .filter((item) => item.key !== column.key ? item.visible : !item.visible)
      .map((item) => item.key);
    this.visibilityChange.emit(visible);
  }
  protected onDragStart(key: string, event: DragEvent): void {
    this.dragKey.set(key);
    event.dataTransfer?.setData('text/plain', key);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }
  protected onDragOver(key: string, event: DragEvent): void {
    if (!this.dragKey()) return;
    event.preventDefault();
    this.dropTargetKey.set(key);
  }
  protected onDragLeave(key: string): void {
    if (this.dropTargetKey() === key) this.dropTargetKey.set(null);
  }
  protected onDrop(key: string, event: DragEvent): void {
    event.preventDefault();
    const sourceKey = this.dragKey();
    this.dragKey.set(null);
    this.dropTargetKey.set(null);
    if (!sourceKey || sourceKey === key) return;
    const order = this.columns.map((column) => column.key);
    const sourceIndex = order.indexOf(sourceKey);
    const targetIndex = order.indexOf(key);
    if (sourceIndex === -1 || targetIndex === -1) return;
    const next = [...order];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    this.orderChange.emit(next);
  }
  protected onDragEnd(): void {
    this.dragKey.set(null);
    this.dropTargetKey.set(null);
  }
}
