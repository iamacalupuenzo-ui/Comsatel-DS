# Patrones de página

Los componentes dicen qué existe; los patrones dicen qué construir. Antes de armar una
pantalla, busca aquí la tarea: cada patrón trae el esqueleto con componentes reales, los
estados que hay que cubrir y las trampas que ya se encontraron.

| Tarea | Patrón | Componentes principales |
| :-- | :-- | :-- |
| Encontrar un registro entre muchos (vehículos, conductores, alertas) | [Página de listado](list-page.md) | `cs-app-layout`, `cs-input-group`, `cs-input-dropdown`, `cs-table`, `cs-pagination` |
| Ver y operar sobre un registro concreto | [Página de detalle](detail-page.md) | `cs-badge`, `cs-dropdown`, `cs-tabs`, `cs-table`, `cs-modal` |
| Cambiar la configuración y guardarla | [Formulario de configuración](settings-form.md) | `cs-input`, `cs-radio-group`, `cs-checkbox`, `cs-datetime-picker`, `cs-button`, `cs-banner` |
| Mostrar que no hay datos, que falló la carga o que falta permiso | [Estados vacíos y de error](empty-states.md) | `cs-skeleton`, `cs-banner`, `cs-button` |
| Revisar de un vistazo el estado de varias unidades y abrir una | [FleetUnitList](../fleet-unit-list.md) dentro de un panel o de la página de listado | `cs-fleet-unit-list` |

Si la tarea no está en esta tabla, no inventes un patrón nuevo en silencio: combina los
existentes y, si no alcanzan, pregunta.

## Reglas comunes a toda página

- La página vive dentro de `cs-app-layout`, con `cs-header` en `[topnav]` y `cs-menu` en
  `[sidenav]`. No se arma otro shell.
- Un solo `<h1>` por página, con el nombre de lo que el usuario está viendo.
- Un solo `cs-button variant="primary"` por pantalla.
- La carga se dibuja con `cs-skeleton` (o con `isLoading` del componente que lo tenga),
  nunca con un spinner.
- Los textos visibles van en español y los datos de ejemplo de una demo quedan como
  datos de ejemplo.

## Accesibilidad (a11y)

- Los landmarks los da el layout: `nav` para la navegación principal y `main` para el
  contenido. No los dupliques dentro de la página.
- El orden de lectura sigue el orden visual: título y acción principal, filtros,
  contenido, paginación.
- Después de una acción que cambia lo que se ve (filtrar, guardar, borrar), anuncia el
  resultado en una región `aria-live` o con `cs-toast`, y deja el foco en un lugar
  predecible.
