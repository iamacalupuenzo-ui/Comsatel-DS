import type { IconName } from '../icons/icon-registry';

export type DropdownSize = 'xs' | 'sm' | 'md' | 'lg';
export type DropdownSelectionMode = 'none' | 'checkbox' | 'radio';
export type DropdownItemVariant = 'default' | 'destructive' | 'success';
export type DropdownTrigger = 'button' | 'icon';
export type DropdownPosition = 'left' | 'right';

export interface DropdownItem {
  label: string;
  value?: string;
  // React acepta un ReactNode arbitrario acá; en Angular se simplifica a un
  // nombre del registro curado de íconos (mismo criterio que el resto de la
  // librería: cs-icon es el único punto de entrada para íconos internos).
  icon?: IconName;
  shortcut?: string;
  badge?: string;
  variant?: DropdownItemVariant;
  disabled?: boolean;
  dividerAfter?: boolean;
  /** Solo relevante cuando el grupo tiene selectionMode "checkbox" o "radio"
   * — el estado lo controla quien usa Dropdown, igual que Toggle/Checkbox:
   * componente controlado, sin estado interno propio de selección. */
  selected?: boolean;
}

export interface DropdownGroup {
  header?: string;
  /** "none" (default): ítem de acción, el menú se cierra al hacer clic.
   * "checkbox": selección múltiple, el menú permanece abierto.
   * "radio": selección única dentro del grupo, también permanece abierto. */
  selectionMode?: DropdownSelectionMode;
  items: DropdownItem[];
}

export interface InputDropdownOption {
  /** Texto completo que se muestra y anuncia dentro del listbox. */
  label: string;
  /** Texto compacto del trigger para selectores embebidos. */
  triggerLabel?: string;
  value: string;
  /** Bandera decorativa; la etiqueta textual conserva el nombre del país. */
  countryFlag?: CountryFlagCode;
  /** Prefijo decorativo, por ejemplo el símbolo de una moneda. */
  leadingText?: string;
  disabled?: boolean;
}

export type CountryFlagCode = 'br' | 'de' | 'es' | 'fr' | 'gb' | 'it' | 'jp';
