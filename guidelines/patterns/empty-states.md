# Patrón: estados vacíos, de carga y de error

**Cuándo usarlo.** Cada vez que una zona de la pantalla espera datos. Todo lugar que
carga tiene al menos cuatro estados: cargando, con datos, vacío y con error. Una pantalla
que solo diseñó "con datos" deja al agente adivinando los otros tres.

## Esqueleto

```html
<section class="panel" [attr.aria-busy]="loading">
  <h2>Alertas de hoy</h2>

  @if (loading) {
    <cs-skeleton variant="text" width="40%"></cs-skeleton>
    <cs-skeleton variant="rectangle" [height]="160"></cs-skeleton>
  } @else if (loadError) {
    <div role="alert">
      <cs-banner
        variant="danger"
        title="No pudimos cargar las alertas"
        [action]="{ label: 'Reintentar' }"
        (actionClick)="reload()"
      >
        Revisa la conexión. Los filtros que elegiste se mantienen.
      </cs-banner>
    </div>
  } @else if (alerts.length === 0) {
    <div class="empty">
      <h3>Todavía no hay alertas</h3>
      <p>Aparecen cuando un vehículo sale de una geocerca o supera el límite de velocidad.</p>
      <cs-button variant="primary" (click)="createRule()">Crear regla de alerta</cs-button>
    </div>
  } @else {
    <cs-table caption="Alertas de hoy" [columns]="columns" [rows]="alerts"></cs-table>
  }
</section>
```

El orden de las ramas importa: primero carga, después error, después vacío. Un error
evaluado después del vacío se muestra como "no hay alertas".

## Estados

**Cargando.** Siempre `cs-skeleton` con la forma de lo que va a llegar. Si el componente
tiene su propio estado de carga (`cs-table` y `cs-table-tree` con `isLoading`), usa ese.
Nunca un spinner ni un texto "Cargando...".

**Vacío inicial (nunca hubo datos).** Explica qué va a aparecer ahí y cómo empezar, con
la acción que lo resuelve. Un vacío sin acción es un callejón sin salida.

**Sin resultados (hay datos, pero el filtro no encuentra nada).** Di qué filtro deja la
lista vacía y ofrece limpiarlo. No es el mismo mensaje que el vacío inicial.

**Error de carga.** `cs-banner variant="danger"` con una acción para reintentar, dentro de
`role="alert"`. Conserva lo que el usuario eligió (filtros, búsqueda, página). Un error de
carga es persistente: no va en un `cs-toast`, que desaparece solo.

**Sin señal del dispositivo.** No es un error del sistema: el sistema responde, pero el
vehículo no reporta. Muestra la última posición conocida con su hora y un
`cs-badge variant="neutral"` con el texto "Sin señal". Mezclarlo con un error de carga
manda al usuario a reintentar algo que no se arregla reintentando.

**Sin permiso.** Un `cs-banner variant="neutral"` que dice qué no puede ver y a quién
pedírselo. No redirijas.

## Trampas

- **Nunca muestres el mensaje de vacío cuando la carga falló.** Es el error más común: la
  lista queda vacía porque la petición falló, y la pantalla dice "no hay datos".
- `cs-skeleton` es `aria-hidden`: por sí solo no anuncia que algo carga. El contenedor
  lleva `aria-busy` mientras dura.
- Una ilustración de estado vacío sin texto no comunica nada a un lector de pantalla ni
  a un agente: el mensaje va en texto.
- `cs-banner` no se oculta al descartarlo: `(dismiss)` solo avisa.

## Accesibilidad (a11y)

- `aria-busy="true"` en el contenedor mientras carga, y se quita al terminar.
- El error va dentro de `role="alert"` para que se anuncie apenas aparece, sin mover el
  foco.
- El estado vacío tiene un encabezado real (`<h2>` o `<h3>` según la jerarquía), no solo
  texto en negrita.
- Después de reintentar, el foco se queda donde estaba: no lo mandes al inicio de la
  página.
