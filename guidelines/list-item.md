# List item

Fila accionable para abrir un recurso o ejecutar una acción contextual. No es
un control de selección de formulario ni el organismo de telemetría
`FleetUnitList`.

- **Import:** `import { ListItem } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { ListItem } from '@iamacalupuenzo-ui/comsatel-ds/list-item';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selector:** `<cs-list-item>`
- **Clase raíz emitida:** `.cs-list-item`. Se documenta para diagnóstico, no para
  que el consumidor copie o sobrescriba estilos internos.

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
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/list-item/src/list-item.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

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
- Usa `selectable` cuando el consumidor administra una selección persistente;
  enlaza `selected` con `selectedChange`. Si una fila recibe `selected=true`,
  también anuncia ese estado con `aria-pressed` aunque se omita `selectable`.
  Para opciones de formulario
  usa `Select`, que implementa el patrón `listbox`.
- Proyecta un `Tag` con el atributo `cs-list-item-trailing` para un estado;
  este conserva texto e ícono, así el color no es la única señal. No proyectes
  botones, enlaces ni otros controles interactivos dentro de la fila.
- `disabled` es nativo: la fila no recibe foco ni emite `activate`.
- `leadingIcon` y `trailingIcon` son opcionales; quitarlos no reserva columnas
  vacías. Si se proporciona `aria-label`, la descripción sigue vinculada con
  `aria-describedby`.

<!-- a11y:start ListItem -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/list-item/src/list-item.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-list-item`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-describedby`, `aria-pressed` |
| Compone | `cs-icon` |
<!-- a11y:end -->

## Uso correcto

- Muestra una entidad por fila y deja el detalle completo para su vista o
  panel específico.
- En una colección semántica, coloca cada `cs-list-item` dentro de un `<li>`;
  el componente aporta el botón de la fila, no el contenedor de lista.
- Usa un solo estado corto y metadatos comparables entre filas.
- No lo uses como sustituto de Select, Table o FleetUnitList.
