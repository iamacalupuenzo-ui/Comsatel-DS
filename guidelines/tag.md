# Tag

Etiqueta de clasificación con valor propio: categoría, severidad, filtro aplicado.
A diferencia de `Badge`, recibe el texto por prop y acepta un ícono del sistema.

- **Import:** `import { Tag } from 'comsatel-ds';`
- **Selector:** `<cs-tag>`
- **Clase raíz emitida:** `.cs-tag`

```html
<cs-tag value="En tránsito" severity="info" icon="truck"></cs-tag>
```

## Props

<!-- props:start Tag -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/tag/tag.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `value` | `string` | requerido | Texto de la etiqueta. No usa contenido proyectado. |
| `severity` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warn' \| 'danger' \| 'contrast'` | `'primary'` | Color y significado. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Altura, padding y tipografía. |
| `rounded` | `boolean` | `false` | Radio completamente redondeado. |
| `icon` | `IconName \| null` | `null` | Ícono leading, del registro del sistema. |
| `aria-label` | `string \| null` | `null` | Nombre accesible si `value` no alcanza por sí solo. |
| `aria-live` | `'off' \| 'polite' \| 'assertive' \| null` | `null` | Anuncia el cambio de `value` a lectores de pantalla. |
<!-- props:end -->

## Accesibilidad (a11y)

- No es interactivo: no tiene rol, no recibe foco y no responde a teclado. Un tag que
  se puede quitar necesita un `Button` propio al lado, no un click sobre el tag.
- `value` es el nombre accesible por defecto. Si el texto es una abreviatura ("GPS
  OK"), pasa `aria-label` con la forma larga.
- `aria-live="polite"` es la forma correcta de anunciar un tag cuyo `value` cambia en
  vivo (estado de un vehículo, por ejemplo). Sin esa prop el cambio es silencioso.
- El ícono es decorativo: no agrega nombre accesible. Nunca dejes un tag cuyo
  significado dependa solo del ícono.

<!-- a11y:start Tag -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/tag/tag.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-tag`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-label`, `aria-live` |
| Compone | `cs-badge`, `cs-icon` |
<!-- a11y:end -->

## Trampas

- `value` es **requerido** y el contenido proyectado se ignora: `<cs-tag>Texto</cs-tag>`
  no renderiza nada. Va siempre como prop.
- `icon` solo acepta nombres del registro del sistema (`IconName`). Un nombre que no
  esté registrado no lanza error: renderiza vacío.
- La escala de `severity` no es la misma que la de `Badge` (`info`/`warn`/`contrast`
  existen acá, no allá). No las mezcles asumiendo paridad.
