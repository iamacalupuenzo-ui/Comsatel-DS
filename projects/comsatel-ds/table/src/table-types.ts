import type { TemplateRef } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

export interface TableColumn {
  key: string;
  label: string;
  isSortable?: boolean;
  /** Ancho fijo. Si se omite, la columna absorbe el espacio restante. */
  width?: string;
  /** Límite inferior para contenido que no debe comprimirse. */
  minWidth?: string;
  /** Límite superior para columnas de contenido variable. */
  maxWidth?: string;
  /** Recorta el contenido visualmente sin alterar el valor disponible al consumidor. */
  truncate?: boolean;
  align?: 'left' | 'center' | 'right';
  /** Fija la columna al borde derecho mientras la tabla se desplaza en
   * horizontal. Pueden fijarse varias, siempre que sean las últimas y
   * contiguas (por ejemplo «Actualizado» y «Acciones»): cada una se corre lo
   * que miden las fijas que tiene a su derecha. Las celdas fijas son opacas y
   * solo la primera del grupo muestra la sombra mientras queda contenido
   * oculto a su izquierda. */
  sticky?: 'end';
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
