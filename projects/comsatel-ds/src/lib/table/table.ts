import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Icon } from '../icons/icon';
import { Skeleton } from '../skeleton/skeleton';
import type { SortOrder, TableCellValue, TableColumn, TableRow, TableTemplateCell } from './table-types';

/**
 * Completamente controlado: `sortKey`/`sortOrder` los posee el padre, este
 * componente solo emite `(sort)` al hacer clic en un header ordenable —
 * nunca ordena los `rows` por su cuenta. Dos casos de carga distintos, no
 * uno: sin datos todavía (`isLoading` + 0 filas) dibuja el skeleton de la
 * forma esperada (usa `cs-skeleton`, ver ese componente); con datos ya
 * visibles (`isLoading` + N filas, un refetch) mantiene las filas reales
 * atenuadas + spinner — la persona sigue viendo qué está por actualizarse
 * y no pierde su posición de scroll.
 */
@Component({
  selector: 'cs-table',
  imports: [Icon, Skeleton, NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input({ required: true }) rows: TableRow[] = [];
  @Input() caption?: string;
  @Input() isLoading = false;
  @Input() sortKey?: string;
  @Input() sortOrder?: SortOrder;
  @Output() readonly sort = new EventEmitter<string>();
  @Input() highlightedRowKey?: string;
  @Input() skeletonRowCount = 5;
  /** Ancho mínimo opcional. Si el espacio disponible es menor, el wrapper
   * conserva la semántica de tabla y habilita desplazamiento horizontal. */
  @Input() minWidth?: string;

  protected get showSkeleton(): boolean {
    return this.isLoading && this.rows.length === 0;
  }
  protected get showRefetching(): boolean {
    return this.isLoading && this.rows.length > 0;
  }
  protected get isEmpty(): boolean {
    return !this.isLoading && this.rows.length === 0;
  }
  protected get skeletonRowIndices(): number[] {
    return Array.from({ length: this.skeletonRowCount }, (_, i) => i);
  }

  protected isTemplateCell(cell: TableCellValue): cell is TableTemplateCell {
    return typeof cell === 'object' && cell !== null && 'template' in cell;
  }

  protected onHeaderClick(col: TableColumn): void {
    if (this.isSortable(col)) this.sort.emit(col.key);
  }

  protected ariaSortFor(col: TableColumn): 'ascending' | 'descending' | 'none' | null {
    if (!this.isSortable(col)) return null;
    if (this.sortKey === col.key) return this.sortOrder === 'desc' ? 'descending' : 'ascending';
    return 'none';
  }

  /** Una columna solo es interactiva cuando el consumidor definió qué hacer
   * con el evento. Así la apariencia de ordenamiento nunca promete una
   * acción que la tabla no puede completar por sí sola. */
  protected isSortable(col: TableColumn): boolean {
    return !!col.isSortable && this.sort.observed;
  }

  protected sortLabelFor(col: TableColumn): string {
    if (this.sortKey !== col.key) return `Ordenar por ${col.label}, ascendente`;
    return this.sortOrder === 'desc'
      ? `${col.label}, orden descendente actual. Activar para ordenar ascendente`
      : `${col.label}, orden ascendente actual. Activar para ordenar descendente`;
  }
}
