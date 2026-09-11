# Pagination

Recorre páginas de un conjunto de resultados. El componente no sabe nada de los datos:
recibe la página actual y el total, y avisa cuándo el usuario pide otra.

- **Import:** `import { Pagination } from 'comsatel-ds';`
- **Selector:** `<cs-pagination>`
- **Clase raíz emitida:** `.cs-pagination`

```html
<cs-pagination
  [page]="page"
  [totalPages]="totalPages"
  (pageChange)="loadPage($event)"
></cs-pagination>
```

## Props

<!-- props:start Pagination -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/pagination/pagination.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `totalPages` | `number` | requerido | Cantidad total de páginas. |
| `page` | `number` | requerido | Página actual, base 1. |
| `variant` | `'numbered' \| 'simple'` | `'numbered'` | Números con elipsis, o solo anterior/siguiente. |
| `previousLabel` | `string` | `'Anterior'` | Texto del control anterior. |
| `nextLabel` | `string` | `'Siguiente'` | Texto del control siguiente. |
| `firstLabel` | `string` | `'Primera página'` | Nombre accesible del salto al inicio. |
| `lastLabel` | `string` | `'Última página'` | Nombre accesible del salto al final. |
| `navLabel` | `string` | `'Paginación'` | Nombre accesible de la navegación completa. |
| `pageChange` | `EventEmitter<number>` | n/a | Emite la página pedida. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- Los controles son `<button>` nativos: foco, Enter y Espacio los da el navegador.
- La página actual se marca con `aria-current`, que es lo que anuncia "estás acá".
- Hay una región `role="status"` con `aria-live="polite"` que anuncia el cambio de
  página: el usuario de lector de pantalla se entera sin tener que buscarlo.
- Las elipsis son decorativas y están marcadas `aria-hidden`.
- `navLabel` nombra la navegación completa: si hay dos paginaciones en la misma
  pantalla (arriba y abajo de una tabla), dales nombres distintos.

<!-- a11y:start Pagination -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/pagination/pagination.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-pagination`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `nav`, `button` |
| Roles | `status` |
| Atributos ARIA | `aria-hidden="true"`, `aria-live="polite"`, `aria-label`, `aria-current` |
| Compone | `cs-icon` |
| Directivas | `csPressScale` |
<!-- a11y:end -->

## Trampas

- **`page` es base 1**, no base 0: pasar `0` es un valor inválido.
- Es controlado: `pageChange` solo avisa. Si no reasignas `page`, la paginación se
  queda quieta.
- `totalPages` es cantidad de páginas, no cantidad de registros: el cálculo
  (`Math.ceil(total / pageSize)`) es responsabilidad de quien lo usa.
- Con `totalPages` igual a 1 no hay nada que recorrer: conviene no renderizar el
  componente en ese caso.
