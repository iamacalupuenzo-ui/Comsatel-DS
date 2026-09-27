¿Qué evidencia permite cerrar cada parche compartido del lote P1?

## En 30 segundos

Cada cierre exige referencia funcional, DOM e interacción en navegador.
Las capacidades nuevas conservan valores predeterminados y API histórica.
Los hashes y el alcance se registran en el inventario al terminar cada unidad.

## Select

El historial de FleetOperations documenta CSS para esconder limpieza y evitar
desborde; `src/styles.css:292` y `:300` confirman el override del producto.
Referencia: [Select oficial](https://primeng.dev/select), selección única/múltiple,
chips, limpieza optativa, disabled/invalid y relación combobox/listbox.

| Capacidad | Contrato DS | Evidencia |
| --- | --- | --- |
| Simple/múltiple | Valor controlado; reelegir simple no vacía | Test público y navegador |
| Limpiar/quitar | showClear=true; disabled/readonly bloquean cambios | Test y teclado en chip |
| Texto largo | Elipsis, ancho acotado, nombre completo | 320/390 y escritorio |
| Menú/teclado | Flechas, Inicio/Fin, Enter, Escape, Tab; foco al cerrar | DOM y recorrido real |
| Estados | Secundario, foco, seleccionado, error descrito | Ambos temas y capturas |

Filtro remoto, virtualización, formularios Angular y carga asíncrona no se
añaden a este selector de datos recibidos; se registran como alcance pendiente
en Autocomplete/Combobox. No se instala PrimeNG.

Ruta `/components/select#select-bounded`; capturas revisadas en
`tmp/qa/select-p1-{light,dark,mobile}.png`. La espera de layout responsive se
hace antes de medir: el drawer del catálogo anima su ancho al cambiar viewport.
La prueba de quitar chip por Enter confirma que no abre el combobox padre.
C1–C3/C13: tokens/pares tipográficos y métricas históricas; C4: signals y foco
tras render; C5–C11: composición Badge/Popover, nombres, relaciones y retorno;
C12: superficie secundaria, selección, placeholder legible y error bolder.

**Comprobación:** ¿qué debe ocurrir al pulsar Enter sobre “Quitar operación”?
