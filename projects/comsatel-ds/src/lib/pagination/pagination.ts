import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';
import { PressScale } from '../directives/press-scale.directive';

export type PaginationVariant = 'numbered' | 'simple';
export type PageToken = number | 'ellipsis-start' | 'ellipsis-end';

// Siempre muestra la primera y última página, más page-1/page/page+1 —
// cualquier hueco mayor a 1 entre esos números se colapsa en una elipsis.
// Con esto una posición cercana a un extremo trunca solo del otro lado
// ("1 2 3 4 5 … 10"), y una posición central trunca los dos lados
// ("1 … 4 5 6 7 … 10").
export function buildPageTokens(totalPages: number, page: number): PageToken[] {
  if (totalPages <= 1) return [1];
  const shown = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const nums = [...shown].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);

  const tokens: PageToken[] = [];
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const prev = nums[i - 1];
    if (prev !== undefined && n - prev > 1) {
      tokens.push(prev === 1 ? 'ellipsis-start' : 'ellipsis-end');
    }
    tokens.push(n);
  }
  return tokens;
}

/**
 * "numbered" (por defecto): salta a cualquier página, para cuando se
 * conoce el total real — una tabla paginada en el backend con un count.
 * "simple": solo anterior/siguiente, sin números — para paginación por
 * cursor (el backend no siempre sabe cuántas páginas hay después) o
 * cuando saltar a una página arbitraria no tiene sentido (un feed).
 * Completamente controlado: `page` es dueño del padre, este componente
 * nunca muta su propio número de página.
 */
@Component({
  selector: 'cs-pagination',
  imports: [Icon, PressScale],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input({ required: true }) totalPages!: number;
  @Input({ required: true }) page!: number;
  @Output() readonly pageChange = new EventEmitter<number>();

  @Input() variant: PaginationVariant = 'numbered';
  @Input() previousLabel = 'Anterior';
  @Input() nextLabel = 'Siguiente';
  @Input() firstLabel = 'Primera página';
  @Input() lastLabel = 'Última página';
  @Input() navLabel = 'Paginación';

  protected get tokens(): PageToken[] {
    return buildPageTokens(this.totalPages, this.page);
  }

  // El salto directo a primera/última solo suma valor cuando de verdad hay
  // muchas páginas de por medio — con pocas ya son visibles en la fila de
  // números, agregarlo ahí sería un botón redundante al lado de otro que
  // hace lo mismo.
  protected get showBoundaryJump(): boolean {
    return this.totalPages > 6;
  }

  protected pageOfLabel(): string {
    return `Página ${this.page} de ${this.totalPages}`;
  }

  protected goTo(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.pageChange.emit(page);
  }
}
