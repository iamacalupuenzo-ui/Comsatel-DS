import type { TableCellValue } from '../table/table-types';

export interface TableTreeColumn {
  key: string;
  label: string;
  width?: string;
}

export interface TableTreeItem {
  id: string;
  cells: TableCellValue[];
  /** `undefined` = todavía no se cargaron (carga perezosa: al expandir por
   * primera vez se dibuja una fila skeleton hasta que el consumidor
   * resuelve los hijos reales). `[]` = se cargaron y no tiene ninguno. */
  children?: TableTreeItem[];
  /** Fuerza que el ítem se muestre expandible aunque `children` todavía
   * sea `undefined` (carga perezosa) — sin esto, un nodo sin hijos
   * cargados no mostraría el chevron hasta tenerlos. */
  hasChildren?: boolean;
  /** Cuántas filas skeleton dibujar mientras `children` es `undefined` —
   * mismo criterio que `skeletonRowCount` en `Table`. Por defecto 1 si no
   * se declara: si se sabe de antemano cuántos hijos va a resolver la
   * carga (ej. el total ya vino en la respuesta paginada del padre), este
   * valor evita que aparezca una sola fila cuando en realidad van a
   * aparecer varias — el salto de "1 fila" a "N filas reales" se siente
   * como un layout shift más grande del necesario. */
  skeletonRowCount?: number;
}
