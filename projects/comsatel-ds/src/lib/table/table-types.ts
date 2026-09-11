import type { TemplateRef } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

export interface TableColumn {
  key: string;
  label: string;
  isSortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

/** Celda con contenido propio (ej. un `cs-badge` de estado, no texto) — el
 * consumidor define UN template compartido por columna
 * (`<ng-template #statusCell let-status>...</ng-template>`, leído vía
 * `@ViewChild`) y pasa `{ template, context: { $implicit: valorDeEstaFila } }`
 * por cada fila, igual que `[ngTemplateOutletContext]`. Mismo caso real
 * que motivó esto en React: la columna de estado usa un Badge, no texto. */
export interface TableTemplateCell {
  template: TemplateRef<unknown>;
  context?: unknown;
}

export type TableCellValue = string | TableTemplateCell;

export interface TableRow {
  key: string;
  cells: TableCellValue[];
}
