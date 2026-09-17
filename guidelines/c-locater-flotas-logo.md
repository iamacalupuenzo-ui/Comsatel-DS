# C-Flotas Logo

Usa el wordmark oficial C-Flotas by Comsatel para identificar el producto.
El isotipo CF se reserva para railes o espacios compactos donde el nombre del
producto ya es evidente. No añadas, sustituyas, recolorees ni apliques sombra
a ninguno de los dos recursos.

- **Selector canónico:** `cs-c-flotas-logo`.
- **Compatibilidad:** `cs-c-locater-flotas-logo` y la clase TypeScript
  `CLocaterFlotasLogo` siguen disponibles para consumidores anteriores, pero
  los usos nuevos deben adoptar el nombre C-Flotas.

<!-- props:start CFlotasLogo -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/brand/c-locater-flotas-logo.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `variant` | `'wordmark' \| 'isotype' \| 'full' \| 'icon'` | `'wordmark'` | Selecciona el wordmark o el isotipo CF. `full` e `icon` son alias de compatibilidad. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Define una altura basada en la escala de layout del sistema. |
| `fit` | `'content' \| 'container'` | `'content'` | Con `container` el wordmark usa el ancho disponible sin perder la proporción. |
| `alt` | `string` | `'C-Flotas by Comsatel'` | Proporciona el nombre alternativo del logo cuando identifica el producto. |
| `decorative` | `boolean` | `false` | Oculta la imagen al lector de pantalla si un nombre idéntico ya es visible. |
<!-- props:end -->

<!-- a11y:start CFlotasLogo -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/brand/c-locater-flotas-logo.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-c-flotas-logo, cs-c-locater-flotas-logo`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-hidden` |
<!-- a11y:end -->
