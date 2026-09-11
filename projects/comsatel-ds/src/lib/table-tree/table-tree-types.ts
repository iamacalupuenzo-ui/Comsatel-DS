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
}
