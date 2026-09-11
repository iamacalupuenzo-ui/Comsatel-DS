# AppLayout y Header

El armazón de una aplicación: barra superior, navegación lateral colapsable, área de
contenido y panel opcional.

- **Import:** `import { AppLayout, Header } from 'comsatel-ds';`
- **Selectores:** `<cs-app-layout>`, `<cs-header>`
- **Clases raíz emitidas:** `.cs-app-layout`, `.cs-header`

```html
<cs-app-layout [hasPanel]="false">
  <cs-header topnav brand="Comsatel" [user]="currentUser" [notificationCount]="3"></cs-header>
  <cs-menu sidenav [groups]="navGroups" [activeHref]="url"></cs-menu>
  <router-outlet></router-outlet>
</cs-app-layout>
```

Slots de proyección: `[topnav]` para la barra superior, `[sidenav]` para la navegación
lateral, `[panel]` para la columna derecha opcional, y el contenido sin atributo para el
área principal.

## Props de `AppLayout`

<!-- props:start AppLayout -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/app-layout/app-layout.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `hasPanel` | `boolean` | `false` | Reserva la columna de panel lateral derecho. |
| `showCollapseButton` | `boolean` | `true` | Muestra el control que colapsa la navegación. |
<!-- props:end -->

## Props de `Header`

<!-- props:start Header -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/header/header.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `brand` | `string` | `'Comsatel DS'` | Nombre de la marca en la barra. |
| `user` | `HeaderUser` | `{ name: 'Usuario', role: 'Cuenta', initials: 'US' }` | `{ name, role, initials, avatarSrc? }`. |
| `notificationCount` | `number` | `0` | Contador del ícono de notificaciones. |
| `notificationsClick` | `EventEmitter<void>` | n/a | Clic en notificaciones. |
| `settingsClick` | `EventEmitter<void>` | n/a | Clic en configuración. |
| `logoutClick` | `EventEmitter<void>` | n/a | Clic en cerrar sesión. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- La navegación lateral es `role="navigation"` con `aria-label="Navegación principal"`.
- El botón que colapsa la barra lateral lleva `aria-expanded` y `aria-controls`
  apuntando al id del sidenav, así que su estado se anuncia.
- `Header` compone `Avatar` y `Popover` reales para el menú de usuario: la semántica y
  el foco los aporta cada componente.
- El layout no incluye un enlace "saltar al contenido". Si la aplicación lo necesita
  (y en una pantalla con navegación larga conviene), hay que agregarlo en la página.

<!-- a11y:start AppLayout -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/app-layout/app-layout.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-app-layout`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `navigation` |
| Atributos ARIA | `aria-label="Navegación principal"`, `aria-controls="cs-app-layout-sidenav"`, `aria-label`, `aria-expanded` |
| Compone | `cs-icon` |
| Directivas | `csPressScale` |
<!-- a11y:end -->

<!-- a11y:start Header -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/header/header.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-header`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `menu`, `separator`, `menuitem` |
| Atributos ARIA | `aria-label="Notificaciones"`, `aria-hidden="true"`, `aria-haspopup="menu"`, `aria-controls="header-account-menu"`, `aria-label`, `aria-expanded` |
| Compone | `cs-icon`, `cs-avatar`, `cs-popover` |
<!-- a11y:end -->

## Trampas

- **Es un layout, no un router.** No decide qué se renderiza: el contenido va
  proyectado en sus slots.
- `Header` trae valores por defecto de marcador (`'Comsatel DS'`, `'Usuario'`): pasa
  siempre los datos reales, o la aplicación publica el placeholder.
- `notificationCount` en `0` no oculta el ícono por sí solo: decide tú si el badge se
  muestra.
- `hasPanel` solo reserva el espacio de la columna; llenarla es responsabilidad de
  quien lo usa.
