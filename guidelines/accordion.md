# Accordion

Secciones colapsables para contenido secundario que no tiene que estar visible todo el
tiempo. No lo uses para esconder algo que el usuario necesita para decidir.

- **Import:** `import { Accordion, AccordionItem } from 'comsatel-ds';`
- **Selectores:** `<cs-accordion>`, `<cs-accordion-item>`
- **Clase raíz emitida:** `.cs-accordion-item`

```html
<cs-accordion type="single" [defaultExpandedIds]="['general']">
  <cs-accordion-item id="general">
    <span header>Configuración general</span>
    <p>Contenido de la sección.</p>
  </cs-accordion-item>
  <cs-accordion-item id="alerts">
    <span header>Alertas</span>
    <p>Contenido de la sección.</p>
  </cs-accordion-item>
</cs-accordion>
```

## Props de `Accordion`

<!-- props:start Accordion -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/accordion/accordion.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | `'single' \| 'multiple'` | `'single'` | Una sección abierta a la vez, o varias. |
| `defaultExpandedIds` | `string[]` | `[]` | Secciones abiertas al inicio (no controlado). |
| `expandedIds` | `string[] \| undefined` | `undefined` | Secciones abiertas (modo controlado). |
| `expandedIdsChange` | `EventEmitter<string[]>` | n/a | Emite la lista de abiertas al cambiar. |
<!-- props:end -->

## Props de `AccordionItem`

<!-- props:start AccordionItem -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/accordion/accordion-item.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string` | requerido | Identifica la sección dentro del grupo. |
| `disabled` | `boolean` | `false` | La sección no se puede abrir ni cerrar. |
| `toggled` | `EventEmitter<void>` | n/a | Emite al alternar la sección. |
| `headerKeydown` | `EventEmitter<KeyboardEvent>` | n/a | Reenvía el teclado del encabezado al grupo. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- El encabezado es un `<button>` con `aria-expanded` y `aria-controls` apuntando al
  panel; el panel es `role="region"` con `aria-labelledby` apuntando al encabezado.
- **Flechas arriba/abajo** mueven el foco entre encabezados, **Home** va al primero y
  **End** al último. Los ítems deshabilitados se saltan.
- El panel cerrado queda `aria-hidden`, así que su contenido no se lee ni recibe foco.
- Enter y Espacio abren o cierran, por ser un `<button>` nativo.

<!-- a11y:start Accordion -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/accordion/accordion.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-accordion`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Teclas que maneja el código | `ArrowDown`, `ArrowUp`, `Home`, `End` |
<!-- a11y:end -->

<!-- a11y:start AccordionItem -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/accordion/accordion-item.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-accordion-item`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `region` |
| Atributos ARIA | `aria-hidden="true"`, `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-hidden` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-icon` |
| Contenido oculto | Aplica `inert` mientras está oculto: sale del orden de foco y del árbol accesible |
| prefers-reduced-motion | Lo respeta |
<!-- a11y:end -->

## Trampas

- Para una lista de unidades de flota no armes la composición a mano con `cs-badge` y
  `cs-icon` dentro de los ítems: usa `cs-fleet-unit-list`, que ya la resuelve.
- **`id` es requerido y tiene que ser único dentro del acordeón**: es la clave con la
  que el grupo maneja el estado. Dos ítems con el mismo `id` se abren y cierran juntos.
- Controlado (`expandedIds`) y no controlado (`defaultExpandedIds`) son modos
  excluyentes: si pasas `expandedIds` y no escuchas `expandedIdsChange`, no se abre
  nada.
- En `type="single"`, abrir una sección cierra la otra: no intentes forzar dos abiertas
  pasando dos ids, usa `type="multiple"`.
