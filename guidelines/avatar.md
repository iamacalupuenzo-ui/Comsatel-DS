# Avatar, AvatarLabel, AvatarGroup y AvatarAddButton

Representación visual de una persona o empresa. `Avatar` es la pieza base;
`AvatarLabel` le agrega nombre y subtítulo; `AvatarGroup` apila varios con un contador;
`AvatarAddButton` es el control para sumar a alguien.

- **Import:** `import { Avatar, AvatarLabel, AvatarGroup, AvatarAddButton } from 'comsatel-ds';`
- **Selectores:** `<cs-avatar>`, `<cs-avatar-label>`, `<cs-avatar-group>`, `<cs-avatar-add-button>`
- **Clases raíz emitidas:** `.cs-avatar`, `.cs-avatar-label`, `.cs-avatar-group`, `.cs-avatar-add`

```html
<cs-avatar src="/avatars/avatar-1.jpg" alt="Juan Pérez" size="md" status="online"></cs-avatar>
<cs-avatar initials="JP" size="sm"></cs-avatar>
```

## Props de `Avatar`

<!-- props:start Avatar -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/avatar/avatar.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Diámetro del avatar. |
| `status` | `'offline' \| 'online' \| 'busy' \| 'company' \| undefined` | `undefined` | Indicador de estado. |
| `src` | `string \| undefined` | `undefined` | URL de la foto. |
| `alt` | `string` | `''` | Texto alternativo de la foto. |
| `initials` | `string \| undefined` | `undefined` | Iniciales cuando no hay foto. |
| `companyIconSrc` | `string \| undefined` | `undefined` | Ícono para el estado `company`. |
| `placeholderBg` | `string` | `'var(--color-background-brand-subtle)'` | Fondo del placeholder sin foto ni iniciales. |
| `showPlaceholderIcon` | `boolean` | `true` | Dibuja la silueta dentro del placeholder. |
<!-- props:end -->

## Props de `AvatarGroup`

<!-- props:start AvatarGroup -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/avatar/avatar-group.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'xs' \| 'sm' \| 'md'` | `'sm'` | Tamaño de cada avatar del stack. |
| `avatars` | `AvatarGroupItem[]` | `[]` | `{ src?, initials?, alt?, placeholderBg? }`. |
| `maxVisible` | `number` | `3` | Cuántos se muestran antes del contador. |
| `showAddButton` | `boolean` | `true` | Muestra el botón de agregar al final. |
| `showPlaceholderIcon` | `boolean` | `true` | Se reenvía a cada avatar interno. |
| `add` | `EventEmitter<void>` | n/a | Emite al hacer clic en agregar. |
<!-- props:end -->

## Props de `AvatarLabel`

<!-- props:start AvatarLabel -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/avatar/avatar-label.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'xs' \| 'sm' \| 'md'` | `'sm'` | Diámetro del avatar. |
| `src` | `string \| undefined` | `undefined` | URL de la foto. |
| `alt` | `string` | `''` | Texto alternativo de la foto. |
| `initials` | `string \| undefined` | `undefined` | Iniciales cuando no hay foto. |
| `status` | `'offline' \| 'online' \| 'busy' \| 'company' \| undefined` | `undefined` | Indicador de estado. |
| `name` | `string` | `'Name'` | Nombre de la persona. El default `'Name'` es un marcador: pasa siempre el real. |
| `subtitle` | `string \| undefined` | `undefined` | Segunda línea: rol, cargo o dato de apoyo. |
<!-- props:end -->

## Props de `AvatarAddButton`

<!-- props:start AvatarAddButton -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/avatar/avatar-add-button.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'xs' \| 'sm' \| 'md'` | `'sm'` | Tamaño del botón, en la misma escala que `AvatarGroup`. |
| `disabled` | `boolean` | `false` | Deshabilita el botón. |
| `aria-label` | `string` | `'Agregar usuario'` | Nombre accesible del botón. |
| `forceHover` | `boolean` | `false` | Solo para documentación: fija el estado hover para mostrarlo junto a los demás. |
| `forceFocus` | `boolean` | `false` | Solo para documentación: fija el estado de foco visible. |
| `addClick` | `EventEmitter<void>` | n/a | Emite al hacer clic en agregar. |
<!-- props:end -->

## Accesibilidad (a11y)

- Con foto, el nombre accesible sale de `alt`: **pasa siempre el nombre de la persona**,
  no "avatar" ni "foto de perfil".
- Un avatar puramente decorativo (una constelación de relleno, un stack ilustrativo) va
  con `alt=""` para que el lector de pantalla lo ignore.
- El indicador de `status` es visual: si el estado importa, tiene que estar también en
  texto en algún lugar cercano. El color solo no comunica.
- `AvatarAddButton` es un `<button>` real y ya trae nombre accesible por defecto.

<!-- a11y:start Avatar -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/avatar/avatar.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-avatar`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `[attr.role] (dinámico)` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label` |
| Compone | `cs-icon` |
<!-- a11y:end -->

<!-- a11y:start AvatarLabel -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/avatar/avatar-label.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-avatar-label`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Compone | `cs-avatar` |
<!-- a11y:end -->

<!-- a11y:start AvatarGroup -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/avatar/avatar-group.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-avatar-group`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Compone | `cs-avatar`, `cs-avatar-add-button` |
<!-- a11y:end -->

<!-- a11y:start AvatarAddButton -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/avatar/avatar-add-button.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-avatar-add-button`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-label` |
| Compone | `cs-icon` |
<!-- a11y:end -->

## Trampas

- **`AvatarGroup` no fabrica placeholders solo.** Si no le pasas ítems, no renderiza
  nada (a diferencia del sistema React de referencia, que dibujaba tres círculos). Para
  un stack de relleno hay que pasar objetos vacíos explícitos.
- `showPlaceholderIcon: false` existe porque la constelación decorativa de las cards
  usa círculos de color **planos**, sin silueta: reusar el placeholder por defecto ahí
  agrega un ícono que el diseño real no tiene.
- El contador que aparece al pasar `maxVisible` cuenta los restantes, no el total.
