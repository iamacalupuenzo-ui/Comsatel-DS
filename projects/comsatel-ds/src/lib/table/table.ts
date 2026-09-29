import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Button } from '../button/button';
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
 * y no pierde su posición de scroll. Reordenar y mostrar/ocultar columnas
 * son responsabilidad de quien consume Table (un panel de columnas
 * compuesto aparte, ver table-page.ts) — los headers de la tabla en sí no
 * llevan ningún control de columnas, solo el botón de orden cuando aplica.
 */
@Component({
  selector: 'cs-table',
  imports: [Button, Icon, Skeleton, NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements AfterViewInit, OnChanges, OnDestroy {
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
  /** Mensaje de error de la carga. Si tiene texto y no hay una carga en curso,
   * la tabla reemplaza las filas por el estado de error. */
  @Input() error = '';
  /** Segunda línea del estado de error: qué puede hacer la persona. */
  @Input() errorDescription = 'Verifica tu conexión e inténtalo nuevamente.';
  /** Si el consumidor lo escucha, el estado de error muestra «Reintentar». */
  @Output() readonly retry = new EventEmitter<void>();

  /** Hay contenido oculto a la izquierda de la columna fija. */
  protected readonly overflowEnd = signal(false);
  @ViewChild('wrap', { static: true }) private wrapRef!: ElementRef<HTMLElement>;
  private resizeObserver?: ResizeObserver;
  /** Desplazamiento a la derecha de cada columna fija, en px, medido del DOM. */
  protected readonly stickyRight = signal<Record<number, number>>({});
  private readonly updateOverflow = (): void => {
    const wrap = this.wrapRef?.nativeElement;
    if (!wrap) return;
    this.overflowEnd.set(wrap.scrollWidth - wrap.clientWidth - wrap.scrollLeft > 1);
    this.measureSticky(wrap);
  };

  /** Índice de la primera columna del grupo fijo del final; -1 si no hay. Solo
   * cuentan las columnas `sticky: 'end'` contiguas al final de la tabla. */
  protected get stickyEdge(): number {
    let i = this.columns.length - 1;
    while (i >= 0 && this.columns[i]?.sticky === 'end') i--;
    return i + 1 < this.columns.length ? i + 1 : -1;
  }

  protected isStickyEnd(index: number): boolean {
    const edge = this.stickyEdge;
    return edge >= 0 && index >= edge;
  }

  protected stickyRightOf(index: number): number | null {
    return this.isStickyEnd(index) ? this.stickyRight()[index] ?? 0 : null;
  }

  private measureSticky(wrap: HTMLElement): void {
    const edge = this.stickyEdge;
    if (edge < 0) return;
    const headers = wrap.querySelectorAll<HTMLTableCellElement>('thead th');
    const next: Record<number, number> = {};
    let acc = 0;
    for (let i = this.columns.length - 1; i >= edge; i--) {
      next[i] = acc;
      acc += headers[i]?.getBoundingClientRect().width ?? 0;
    }
    const current = this.stickyRight();
    const changed = Object.keys(next).length !== Object.keys(current).length
      || Object.entries(next).some(([k, v]) => Math.abs((current[+k] ?? -1) - v) > 0.5);
    if (changed) this.stickyRight.set(next);
  }

  ngOnChanges(): void {
    if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(this.updateOverflow);
  }

  ngAfterViewInit(): void {
    const wrap = this.wrapRef.nativeElement;
    wrap.addEventListener('scroll', this.updateOverflow, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.updateOverflow);
      this.resizeObserver.observe(wrap);
      const table = wrap.querySelector('table');
      if (table) this.resizeObserver.observe(table);
    }
    requestAnimationFrame(this.updateOverflow);
  }

  ngOnDestroy(): void {
    this.wrapRef.nativeElement.removeEventListener('scroll', this.updateOverflow);
    this.resizeObserver?.disconnect();
  }

  protected get showError(): boolean {
    return !!this.error && !this.isLoading;
  }
  protected get canRetry(): boolean {
    return this.retry.observed;
  }

  protected get showSkeleton(): boolean {
    return this.isLoading && this.rows.length === 0;
  }
  protected get showRefetching(): boolean {
    return this.isLoading && this.rows.length > 0;
  }
  protected get isEmpty(): boolean {
    return !this.isLoading && !this.error && this.rows.length === 0;
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
