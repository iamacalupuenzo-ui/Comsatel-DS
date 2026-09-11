# Cards: ActionCard, CardBanner, FeatureSpotlightCard, SpotlightCard y PreviewCard

Cinco componentes distintos, cada uno con su propósito. No hay una "Card" genérica con
slots libres: se elige la que corresponde al contenido.

- **Import:** `import { ActionCard, CardBanner, FeatureSpotlightCard, SpotlightCard, PreviewCard } from 'comsatel-ds';`
- **Selectores:** `<cs-action-card>`, `<cs-card-banner>`, `<cs-feature-spotlight-card>`, `<cs-spotlight-card>`, `<cs-preview-card>`
- **Clases raíz emitidas:** `.cs-action-card`, `.cs-card-banner`, `.cs-feature-spotlight-card`, `.cs-spotlight-card`, `.cs-preview-card`

## Cuál usar

| Componente | Para qué |
| :-- | :-- |
| `ActionCard` | Una opción con título, descripción y un control: botón, toggle o etiqueta de estado. |
| `CardBanner` | Aviso destacado dentro de una pantalla, con avatares y badge. |
| `FeatureSpotlightCard` | Pieza promocional con constelación decorativa de avatares. |
| `SpotlightCard` | Compone `FeatureSpotlightCard` con título y descripción listos. |
| `PreviewCard` | Vista previa de un proyecto: nombre, logo, imagen y menú de opciones. |

## Props de `ActionCard`

<!-- props:start ActionCard -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/card/action-card.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | `'Title'` | Título de la tarjeta. |
| `description` | `string` | `'Description'` | Texto de apoyo. |
| `showLogo` | `boolean` | `false` | Muestra el espacio de logo. |
| `showToggle` | `boolean` | `false` | Muestra un `Toggle` real como control. |
| `toggleChecked` | `boolean` | `false` | Estado del toggle. |
| `showButton` | `boolean` | `true` | Muestra el botón de acción. |
| `buttonLabel` | `string` | `'Action'` | Texto del botón. |
| `showLabel` | `boolean` | `false` | Muestra una etiqueta de estado en vez del control. |
| `label` | `string` | `'Coming soon'` | Texto de esa etiqueta. |
| `buttonClick` | `EventEmitter<void>` | n/a | Emite al hacer clic en el botón. |
| `toggleCheckedChange` | `EventEmitter<boolean>` | n/a | Emite el nuevo estado del toggle. |
<!-- props:end -->

## Props de `CardBanner`

<!-- props:start CardBanner -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/card/card-banner.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `variant` | `'neutral' \| 'brand' \| 'destructive' \| 'warning' \| 'success'` | `'neutral'` | Tono de la tarjeta. |
| `title` | `string` | `'Title'` | Título. |
| `description` | `string` | `'Description here'` | Texto de apoyo. |
| `avatars` | `AvatarGroupItem[]` | `[]` | Stack de avatares. |
| `badgeLabel` | `string` | `'Label'` | Texto del badge. |
| `showAvatar` | `boolean` | `true` | Muestra el stack. |
| `showBadge` | `boolean` | `true` | Muestra el badge. |
<!-- props:end -->

## Props de `FeatureSpotlightCard`

<!-- props:start FeatureSpotlightCard -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/card/feature-spotlight-card.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `avatars` | `string[]` | `[]` | URLs de las fotos de la constelación decorativa. |
<!-- props:end -->

## Props de `SpotlightCard`

<!-- props:start SpotlightCard -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/card/spotlight-card.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | `'Invite your team'` | Título. El default en inglés es un marcador: pasa el texto real. |
| `description` | `string` | `'Share updates and sync design changes'` | Texto de apoyo. El default en inglés es un marcador. |
| `avatars` | `string[]` | `[]` | URLs de las fotos que se reenvían a `FeatureSpotlightCard`. |
<!-- props:end -->

## Props de `PreviewCard`

<!-- props:start PreviewCard -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/card/preview-card.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `name` | `string` | `'Project name'` | Nombre del proyecto. El default es un marcador. |
| `showLogo` | `boolean` | `false` | Muestra el slot `[logo]`. |
| `showImage` | `boolean` | `false` | Muestra el slot `[image]`. |
| `options` | `EventEmitter<void>` | n/a | Emite al hacer clic en el botón "Más opciones". |
<!-- props:end -->

## Accesibilidad (a11y)

- Los controles internos (botón, toggle, menú de opciones) son componentes reales del
  sistema, con su propia semántica y foco: no son divs con `(click)`.
- Los valores por defecto de las props están en inglés (`'Title'`, `'Action'`,
  `'Coming soon'`) porque son marcadores de posición de la documentación. **En producto
  siempre se pasan textos reales en español**: dejar el default publica texto en inglés.
- Los avatares decorativos de `FeatureSpotlightCard` y `SpotlightCard` son ilustración,
  no información: no aportan nombre accesible y no deben ser la única señal de nada.
- `PreviewCard` proyecta logo e imagen por slots (`[logo]`, `[image]`), porque Angular
  no tiene equivalente a pasar un nodo como prop.

<!-- a11y:start ActionCard -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/card/action-card.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-action-card`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-label` |
| Compone | `cs-toggle`, `cs-button` |
<!-- a11y:end -->

<!-- a11y:start CardBanner -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/card/card-banner.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-card-banner`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Compone | `cs-avatar-group` |
<!-- a11y:end -->

<!-- a11y:start FeatureSpotlightCard -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/card/feature-spotlight-card.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-feature-spotlight-card`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Compone | `cs-avatar` |
<!-- a11y:end -->

<!-- a11y:start SpotlightCard -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/card/spotlight-card.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-spotlight-card`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Compone | `cs-feature-spotlight-card` |
<!-- a11y:end -->

<!-- a11y:start PreviewCard -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/card/preview-card.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-preview-card`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-label="Más opciones"` |
| Compone | `cs-button`, `cs-icon` |
<!-- a11y:end -->

## Trampas

- `ActionCard` es controlado en su toggle: sin escuchar `toggleCheckedChange` y
  reasignar `toggleChecked`, el interruptor vuelve atrás.
- `showToggle`, `showButton` y `showLabel` no son excluyentes por contrato: mostrar
  varios a la vez produce una tarjeta con controles compitiendo. Elige uno.
- La constelación de avatares de `FeatureSpotlightCard` usa coordenadas propias de esa
  composición, no tokens de layout: no la reutilices como grilla genérica.
