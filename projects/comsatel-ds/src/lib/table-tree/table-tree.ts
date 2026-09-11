import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Icon } from '../icons/icon';
import { Skeleton } from '../skeleton/skeleton';
import type { TableCellValue, TableTemplateCell } from '../table/table-types';
import type { TableTreeColumn, TableTreeItem } from './table-tree-types';

const INDENT_PX = 20;

/**
 * Filas recursivas vía un único `<ng-template>` que se referencia a sí
 * mismo con `*ngTemplateOutlet` — cada nivel de profundidad es la misma
 * plantilla con `depth + 1`, sin un sub-componente por fila (que además
 * rompería la estructura real de `<tbody>`/`<tr>` al meter un elemento
 * custom entre medio). Igual que Table: completamente controlado en
 * `expandedIds`, nunca decide por su cuenta qué está abierto.
 */
@Component({
  selector: 'cs-table-tree',
  imports: [Icon, Skeleton, NgTemplateOutlet],
  templateUrl: './table-tree.html',
  styleUrl: './table-tree.css',
})
export class TableTree implements OnChanges {
  @Input({ required: true }) columns: TableTreeColumn[] = [];
  @Input({ required: true }) items: TableTreeItem[] = [];
  @Input() caption?: string;
  @Input() isLoading = false;
  @Input() defaultExpandedIds: string[] = [];
  @Input() expandedIds?: string[];
  @Output() readonly expandedIdsChange = new EventEmitter<string[]>();

  private internalExpanded: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultExpandedIds'] && this.expandedIds === undefined) {
      this.internalExpanded = this.defaultExpandedIds;
    }
  }

  protected get expanded(): string[] {
    return this.expandedIds ?? this.internalExpanded;
  }

  protected get showSkeleton(): boolean {
    return this.isLoading && this.items.length === 0;
  }
  protected get isEmpty(): boolean {
    return !this.isLoading && this.items.length === 0;
  }
  protected get bodyOpacity(): string {
    return this.isLoading && this.items.length > 0 ? 'var(--opacity-loading)' : '1';
  }

  protected isExpandable(item: TableTreeItem): boolean {
    return !!item.hasChildren || (item.children?.length ?? 0) > 0;
  }
  protected isExpanded(id: string): boolean {
    return this.expanded.includes(id);
  }

  protected toggle(id: string): void {
    const next = this.expanded.includes(id) ? this.expanded.filter((x) => x !== id) : [...this.expanded, id];
    if (this.expandedIds === undefined) this.internalExpanded = next;
    this.expandedIdsChange.emit(next);
  }

  protected indentFor(depth: number): number {
    return 24 + depth * INDENT_PX;
  }

  protected isTemplateCell(cell: TableCellValue): cell is TableTemplateCell {
    return typeof cell === 'object' && cell !== null && 'template' in cell;
  }
}
