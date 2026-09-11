# Menu

Navegación lateral de la aplicación: grupos de ítems con ícono, badge, atajo y
subniveles. Tiene dos modos, expandido (labels completos) y rail (solo íconos, con
flyout al pasar el mouse).

- **Import:** `import { Menu } from 'comsatel-ds';`
- **Selector:** `<cs-menu>`
- **Clase raíz emitida:** `.cs-menu`

```html
<cs-menu [groups]="navGroups" mode="expanded" [activeHref]="currentUrl"></cs-menu>
```

## Props

<!-- props:start Menu -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/menu/menu.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `groups` | `MenuGroupData[]` | requerido | Grupos de ítems. |
| `mode` | `'expanded' \| 'rail'` | `'expanded'` | Labels completos, o solo íconos con flyout. |
| `activeHref` | `string \| undefined` | `undefined` | Ruta activa, para resaltar el ítem. |
| `navigate` | `EventEmitter<void>` | n/a | Emite al hacer clic en un ítem navegable. |
<!-- props:end -->

`MenuGroupData` es `{ header?, items }`. `MenuItemData` es
`{ label, href, icon?, badge?, shortcut?, disabled?, children? }`.

```ts
const navGroups: MenuGroupData[] = [
  { items: [
    { label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard', shortcut: ['D'] },
    { label: 'En vivo', href: '/live', icon: 'activity', badge: '3' },
    { label: 'Flota', href: '/fleet', icon: 'truck', children: [
      { label: 'Vehículos', href: '/fleet/vehicles' },
    ]},
  ]},
  { header: 'Gestión', items: [
    { label: 'Alertas', href: '/alerts', icon: 'bell' },
  ]},
];
```

## Accesibilidad (a11y) y teclado

- El contenedor es un `<nav>` y los ítems navegables son `<a routerLink>` reales: Tab
  los recorre en orden y Enter navega. Los grupos con hijos son `<button>` con
  `aria-expanded`.
- En modo rail, cada botón toma su nombre accesible de `aria-label` (el label del
  ítem), porque el texto no está visible. Los que abren un flyout de hijos indican con
  `aria-expanded` si el flyout está abierto.
- **No hay navegación por flechas.** El recorrido es el orden natural de tabulación, no
  el patrón de menú de la APG con roving tabindex. Es una limitación conocida y
  deliberada del sistema, no un descuido: si tu pantalla necesita ese patrón, hay que
  pedirlo como trabajo explícito.
- El flyout del modo rail aparece con mouse y con foco (`focusin`), así que un usuario
  de teclado también lo ve.

<!-- a11y:start Menu -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/menu/menu.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-menu`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `nav`, `ul`, `button`, `a[routerLink]` |
| Atributos ARIA | `aria-label`, `aria-expanded` |
| Compone | `cs-icon`, `cs-popover` |
| Directivas | `csPressScale`, `csCollapse` |
<!-- a11y:end -->

## Trampas

- `href` se usa con `routerLink`: son rutas de la aplicación, no URLs externas.
- El atajo (`shortcut`) **solo se muestra**; dispararlo es responsabilidad de quien usa
  el componente. Menu no registra listeners de teclado globales.
- `icon` sale del registro curado del sistema. Un nombre no registrado no lanza error:
  renderiza vacío.
- Los `children` no aceptan un tercer nivel: la estructura es de dos niveles.
