# MapPanel, MapSearch y MapNotification

Paneles que **flotan sobre el mapa**: el buscador de unidades a la izquierda y las
notificaciones a la derecha. Los tres comparten la misma superficie: abierta muestra su
contenido con scroll propio; contraída queda como una píldora de 48 px con el encabezado.

- **Import:** `import { MapPanel, MapSearch, MapNotification } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selectores:** `<cs-map-panel>`, `<cs-map-search>`, `<cs-map-notification>`
- **Clases raíz emitidas:** `.cs-map-panel`, `.cs-map-search`, `.cs-map-notification`

```html
<cs-map-panel
  label="Notificaciones de unidades"
  title="Notificaciones"
  icon="bell"
  listLabel="Lista de notificaciones"
  [badge]="pending()"
  [badgeDescription]="pending() + ' notificaciones pendientes'"
  [(open)]="open"
>
  @for (entry of entries(); track entry.id) {
    <cs-map-notification
      [eventLabel]="entry.eventLabel"
      [unitName]="entry.unitName"
      [unitCode]="entry.unitCode"
      [time]="entry.time"
      [now]="now()"
      (selected)="centerUnit(entry)"
      (dismissed)="dismiss(entry.id)"
    ></cs-map-notification>
  }
</cs-map-panel>
```

## Cuándo usar cada uno

| Necesidad | Componente | Motivo |
| :-- | :-- | :-- |
| Buscar y filtrar unidades | `cs-map-search` | El encabezado es el campo; contraído se sigue escribiendo. |
| Avisos de unidades | `cs-map-panel` + `cs-map-notification` | Contador visible también contraído. |
| Otro contenido flotante (leyenda, capas) | `cs-map-panel` | Misma superficie, mismo teclado. |

Para un panel lateral que tapa la pantalla (detalle, formulario) usa `SideDrawer`, no este panel.

## Posición y alto

La pantalla ubica el host con `position: absolute` y `top`/`bottom` (16 px del borde del mapa
en el producto). El panel crece con su contenido **hasta** ese alto; si el contenido es corto,
el panel también. En el celular, la pantalla coordina que haya **un solo panel abierto**: al
abrir uno contrae el otro con `[open]`.

## Partes que se proyectan

- `[csMapPanelHeader]`: reemplaza título e ícono (lo usa `cs-map-search` para el campo).
- `[csMapPanelActions]`: botones del encabezado antes del chevrón.
- `[csMapPanelToolbar]`: barra fija arriba del scroll. En `cs-map-search`, `[csMapSearchFilters]`.
- `[csMapPanelFooter]`: pie fijo de 40 px, como «Limpiar notificaciones».
- El resto va al área con scroll. Con `listLabel`, esa área toma `role="list"` y cada hijo
  lleva `role="listitem"` (`cs-map-notification` ya lo trae).

## Tiempo de los avisos

`cs-map-notification` muestra «Ahora», «Hace 8 min», «Hace 3 h» y, desde las 24 horas, la
fecha y hora del sistema (`formatRelativeTime`). La pantalla pasa `[now]` y lo refresca cada
30 segundos; sin eso, el tiempo no avanza solo.

## Props

<!-- props:start MapPanel -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/map-panel/map-panel.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `label` | `string` | requerido | Nombre accesible del panel. |
| `title` | `string` | `''` | Título visible del encabezado; vacío si se usa `[csMapPanelHeader]`. |
| `icon` | `IconName \| undefined` | `undefined` | Ícono antes del título. |
| `badge` | `number \| null` | `null` | Contador rojo; 0 o null lo ocultan, desde 100 muestra «99+». |
| `badgeDescription` | `string` | `''` | Lectura del contador para lectores de pantalla. |
| `listLabel` | `string` | `''` | Si el contenido es una lista, su nombre: el área con scroll toma `role="list"`. |
| `expandLabel` | `string` | `''` | Etiqueta del chevrón contraído; por defecto «Expandir» más el título. |
| `collapseLabel` | `string` | `''` | Etiqueta del chevrón abierto; por defecto «Contraer» más el título. |
| `open` | `boolean` | `true` | Abierto o contraído; admite `[()]`. |
| `openChange` | `ModelSignal<boolean>` | n/a | El panel se abrió o se contrajo. |
<!-- props:end -->

<!-- props:start MapSearch -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/map-panel/map-search.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `label` | `string` | `'Buscar y filtrar unidades'` | Nombre accesible del panel. |
| `inputLabel` | `string` | `'Buscar por nombre o código de unidad'` | Nombre accesible del campo. |
| `placeholder` | `string` | `'Buscar unidades…'` | Texto guía del campo. |
| `listLabel` | `string` | `'Unidades encontradas'` | Nombre accesible de la lista de resultados. |
| `clearLabel` | `string` | `'Limpiar búsqueda'` | Nombre de la X que limpia el texto. |
| `expandLabel` | `string` | `'Expandir buscador de unidades'` | Etiqueta del chevrón contraído. |
| `collapseLabel` | `string` | `'Contraer buscador de unidades'` | Etiqueta del chevrón abierto. |
| `filterCount` | `number` | `0` | Filtros aplicados; 0 oculta el contador. |
| `filterDescription` | `string` | `''` | Lectura del contador: «2 filtros activos: Con señal; MAF». |
| `query` | `string` | `''` | Texto buscado; admite `[()]`. |
| `open` | `boolean` | `true` | Abierto o contraído; admite `[()]`. |
| `queryChange` | `ModelSignal<string>` | n/a | La persona escribió o limpió el campo. |
| `openChange` | `ModelSignal<boolean>` | n/a | El panel se abrió o se contrajo. |
| `searched` | `OutputEmitterRef<string>` | n/a | Enter en el campo, con el texto buscado. |
<!-- props:end -->

<!-- props:start MapNotification -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/map-panel/map-notification.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `eventLabel` | `string` | requerido | Qué pasó: «Retomó movimiento». |
| `unitName` | `string` | requerido | Nombre de la unidad. |
| `unitCode` | `string` | `''` | Placa o código, después del nombre. |
| `time` | `DateInput` | requerido | Cuándo ocurrió el último aviso del grupo. |
| `now` | `DateInput` | `Date.now()` | Referencia del tiempo relativo; la pantalla la refresca cada 30 s. |
| `count` | `number` | `1` | Avisos agrupados; desde 2 muestra «N avisos». |
| `unread` | `boolean` | `false` | Aún no visto: muestra la marca «Nueva». |
| `icon` | `IconName` | `'bell-ring'` | Ícono del aviso. |
| `newLabel` | `string` | `'Nueva'` | Texto de la marca de no visto. |
| `selectLabel` | `string` | `''` | Nombre del clic principal; por defecto «Centrar en mapa: evento, unidad». |
| `dismissLabel` | `string` | `''` | Nombre de la X; por defecto «Descartar notificación de unidad». |
| `selected` | `OutputEmitterRef<void>` | n/a | Clic en la tarjeta: centrar la unidad. |
| `dismissed` | `OutputEmitterRef<void>` | n/a | Clic en la X: descartar el aviso. |
<!-- props:end -->

## Accesibilidad

- El panel es una `section` con nombre (`label`). El chevrón lleva `aria-expanded` y
  `aria-controls`, y sus etiquetas dicen qué hace: «Contraer notificaciones».
- Contraído, el cuerpo queda `inert` y `aria-hidden`: el teclado no entra a contenido
  invisible. Si el foco estaba adentro al contraer, vuelve al chevrón.
- Escape contrae el panel y deja el foco en el chevrón. Si un selector o menú de adentro está
  abierto, ese Escape solo lo cierra a él: cada Escape cierra una capa.
- El contador se lee con `badgeDescription` y se asocia al chevrón con `aria-describedby`.
- Los avisos nuevos se anuncian desde la pantalla con una región `aria-live="polite"` fuera
  del panel, para que se escuchen aunque esté contraído.

<!-- a11y:start MapPanel -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/map-panel/map-panel.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-map-panel`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `[attr.role] (dinámico)` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-expanded`, `aria-controls`, `aria-describedby`, `aria-hidden` |
| Teclas que maneja el código | `Escape` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-icon` |
| Contenido oculto | Aplica `inert` mientras está oculto: sale del orden de foco y del árbol accesible |
<!-- a11y:end -->

<!-- a11y:start MapSearch -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/map-panel/map-search.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-map-search`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-describedby` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-map-panel`, `cs-icon`, `cs-input-group-input` |
<!-- a11y:end -->

<!-- a11y:start MapNotification -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/map-panel/map-notification.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-map-notification`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `listitem` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label` |
| Compone | `cs-icon` |
<!-- a11y:end -->
