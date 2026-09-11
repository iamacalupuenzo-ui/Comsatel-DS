import type { IconName } from '../icons/icon-registry';

export interface MenuItemData {
  label: string;
  href: string;
  icon?: IconName;
  /** Contador corto (ej. "3"), se muestra como badge circular. */
  badge?: string;
  /** Atajo de teclado, ej. ['D'] o ['Ctrl', 'E']. Solo se muestra en modo
   * expandido y en el tooltip del modo rail — el atajo en sí lo dispara
   * quien consume Menu, no Menu mismo. */
  shortcut?: string[];
  disabled?: boolean;
  children?: Omit<MenuItemData, 'children'>[];
}

export interface MenuGroupData {
  header?: string;
  items: MenuItemData[];
}

export type MenuMode = 'expanded' | 'rail';
