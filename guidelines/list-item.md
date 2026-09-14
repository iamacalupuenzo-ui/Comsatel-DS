# List item

Fila accionable para abrir un recurso o ejecutar una acción contextual. No es
un control de selección de formulario ni el organismo de telemetría
`FleetUnitList`.

- **Import:** `import { ListItem } from 'comsatel-ds';`
- **Selector:** `<cs-list-item>`

```html
<cs-list-item
  leadingIcon="file-text"
  label="Reporte de mantenimiento"
  description="Actualizado hoy"
  (activate)="openUnit()"
>
  <cs-tag cs-list-item-trailing severity="success" icon="circle-check" value="Listo" />
</cs-list-item>
```

## Props

<!-- props:start ListItem -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/list-item/list-item.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `label` | `string` | requerido | Nombre principal del recurso. |
| `description` | `string` | `''` | Contexto breve debajo del nombre. |
| `leadingIcon` | `IconName \| null` | `null` | Ícono de identidad del registro curado. |
| `trailingIcon` | `IconName \| null` | `'chevron-right'` | Ícono decorativo al final de la fila. |
| `selected` | `boolean` | `false` | Estado visual controlado por quien compone la lista. |
| `selectable` | `boolean` | `false` | Habilita `aria-pressed` para anunciar `selected`. |
| `disabled` | `boolean` | `false` | Deshabilita el botón nativo. |
| `aria-label` | `string` | `''` | Nombre accesible alternativo. |
| `activate` | `EventEmitter<void>` | n/a | Emite al activar la fila. |
| `selectedChange` | `EventEmitter<boolean>` | n/a | Emite el siguiente estado de una fila seleccionable. |
<!-- props:end -->

## Accesibilidad

- La superficie es un `<button>` nativo: Tab, Enter y Espacio funcionan sin
  handlers adicionales.
- Solo usa `selectable` si el consumidor administra una selección persistente;
  en ese caso enlaza `selected` con `selectedChange`, y `aria-pressed` anuncia
  el estado. Para opciones de formulario
  usa `Select`, que implementa el patrón `listbox`.
- Proyecta un `Tag` con el atributo `cs-list-item-trailing` para un estado;
  este conserva texto e ícono, así el color no es la única señal.
- `disabled` es nativo: la fila no recibe foco ni emite `activate`.

<!-- a11y:start ListItem -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/list-item/list-item.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-list-item`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-pressed` |
| Compone | `cs-icon` |
<!-- a11y:end -->

## Uso correcto

- Muestra una entidad por fila y deja el detalle completo para su vista o
  panel específico.
- Usa un solo estado corto y metadatos comparables entre filas.
- No lo uses como sustituto de Select, Table o FleetUnitList.
