¿Cómo despejas el lienzo y retomas la misma búsqueda después?

## En 30 segundos

Conserva el encabezado y el DOM del cuerpo; contraer no limpia la consulta.
Collapse full ocupa una región acotada y conserva el scroll interno.
Escape cierra primero el menú; el siguiente contrae y devuelve foco al chevron.

## Composición y responsabilidad

La demo `/animations/motion#collapsible-panel` combina `Input`, `Collapse`,
`FleetUnitList`, `Popover`, `Checkbox`, `Button` e `Icon` desde la API pública.
Storybook incluye **Patrones/Panel plegable**. El ejemplo de catálogo vive en
`src/app/pages/motion-demo/collapsible-panel-example.*`; no es otro componente
publicado ni contiene servicios del producto.

El encabezado reúne campo persistente, contador de filtros, limpiar y chevron.
El chevron nativo del patrón aporta aria-expanded/controls y Enter/Espacio:
Button todavía no expone estas dos entradas para un disclosure. No imites
controles de selección con divs. El cuerpo es una región con nombre; Collapse
agrega inert y aria-hidden al cerrarla.

| Acción | Cambia | Conserva |
| --- | --- | --- |
| Contraer | Visibilidad y foco al chevron | Consulta, filtro, selección, fijados, scroll |
| Limpiar | Solo consulta; foco al campo | Abierto/cerrado y filtro |
| Escribir o Enter | Consulta y apertura | Filtro y estados de unidades |
| Tab al campo | Foco | Abierto/cerrado |
| Escape con menú | Cierra Popover y enfoca filtro | Panel abierto |
| Escape sin menú | Contrae panel | Contexto de lectura |

## Altura y eventos

Define una altura disponible en el padre; usa grid con columna `minmax(0,1fr)`
y fila de cuerpo `minmax(0,1fr)`. El anfitrión de Collapse full no lleva padding:
lo recibe un hijo. Nunca desmontes el cuerpo con @if para contraer. Guarda
scrollTop antes de mover foco y restáuralo con afterNextRender al abrir.

El área de layout deja pasar punteros; solo encabezado y cuerpo visible los
reciben. El botón del lienzo demuestra que cerrar libera el área inferior.
El Popover se controla por signal y se cierra también al usar el chevron.
La composición deja el primer Escape al menú; evita dos cierres con la misma
pulsación y no instala listeners globales duplicados.

Tokens usados: fondos secondary-subtlest/subtle y sus estados, texto/ícono/borde
secondary-default, border-focused, layout-border-thin/thick, layout-size-md/lg,
layout-padding/gap, radius-sm/md/lg/full, motion-duration-medium y
motion-easing-default, tipografía content-note. No agrega tokens. Movimiento
reducido elimina interpolación y rotación animada.

## Qué sigue en el producto

Consulta remota, permisos, carga/error y sincronización con el mapa siguen a
cargo del consumidor. La demo usa datos ficticios; no certifica la migración de
FleetOperations. El patrón toma el contrato de encabezado/teclado como referencia
de [Panel oficial](https://primeng.dev/panel), sin instalar ni copiar PrimeNG.

**Comprobación:** ¿por qué limpiar y contraer no deben compartir el mismo botón?
