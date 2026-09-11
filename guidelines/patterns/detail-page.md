# Patrón: página de detalle

**Cuándo usarlo.** El usuario ya eligió un registro (un vehículo, un conductor, una
geocerca) y necesita verlo completo y operar sobre él. Si todavía está buscando cuál,
el patrón es la [página de listado](list-page.md).

## Esqueleto

```html
<section class="page">
  <header class="page__header">
    <h1>ABC-123, Volvo FH</h1>
    <cs-badge variant="success">En ruta</cs-badge>
    <cs-dropdown label="Acciones" [groups]="actionGroups" (select)="onAction($event)"></cs-dropdown>
  </header>

  <cs-tabs [value]="tab" (valueChange)="tab = $event">
    <cs-tab value="summary" label="Resumen">
      <dl class="summary">
        <dt>Conductor</dt>
        <dd>Juan Pérez</dd>
        <dt>Último reporte</dt>
        <dd>Hace 2 minutos</dd>
      </dl>
    </cs-tab>

    <cs-tab value="trips" label="Recorridos">
      <cs-table
        caption="Recorridos de la última semana"
        [columns]="tripColumns"
        [rows]="trips"
        [isLoading]="loadingTrips"
      ></cs-table>
    </cs-tab>

    <cs-tab value="alerts" label="Alertas">
      <cs-accordion type="multiple">
        <cs-accordion-item id="speed">
          <span header>Exceso de velocidad</span>
          <p>Tres eventos esta semana, el último en la Panamericana Sur.</p>
        </cs-accordion-item>
      </cs-accordion>
    </cs-tab>
  </cs-tabs>

  <cs-modal
    [isOpen]="confirmDeactivate"
    title="Dar de baja ABC-123"
    appearance="danger"
    [closeOnOverlayClick]="false"
    [primaryAction]="{ label: 'Dar de baja' }"
    [secondaryAction]="{ label: 'Cancelar' }"
    (primaryActionClick)="deactivate()"
    (secondaryActionClick)="confirmDeactivate = false"
    (closed)="confirmDeactivate = false"
  >
    El vehículo deja de reportar posición y sale de los informes. Puedes reactivarlo después.
  </cs-modal>
</section>
```

El encabezado dice qué es (lo que el usuario reconoce, como la placa), en qué estado
está y qué puede hacer. Las secciones van en pestañas solo si son vistas alternativas del
mismo registro.

## Estados

**Carga.** Dibuja `cs-skeleton` en el título y en el contenido de la pestaña activa. Las
pestañas ya pueden mostrarse: su lista no depende de los datos.

**Registro no encontrado.** Si el registro no existe o se dio de baja, muestra en la
misma página qué pasó y un enlace a la lista. No redirijas en silencio: el usuario llegó
con un enlace y merece saber por qué no está.

**Error parcial.** Si falla solo una pestaña (por ejemplo los recorridos), el error va
dentro de esa pestaña con un `cs-banner variant="danger"` y un botón para reintentar. El
resto del detalle sigue usable.

**Sin señal.** Un vehículo que no reporta hace rato no está "en ruta": el badge pasa a
`variant="neutral"` con el texto "Sin señal" y la hora del último reporte al lado.

**Acción sin permiso.** Los ítems de `cs-dropdown` que el usuario no puede ejecutar van
con `disabled: true`, no desaparecen: así sabe que la acción existe.

**Después de dar de baja.** Confirma con un `cs-toast`, vuelve a la lista y anuncia el
resultado. El registro ya no existe, así que el foco no puede volver al botón que abrió
el modal.

## Trampas

- **Toda acción destructiva pasa por `cs-modal appearance="danger"`** con
  `[closeOnOverlayClick]="false"`. Nunca se ejecuta directo desde el dropdown.
- `cs-dropdown` emite el ítem completo en `(select)`: dale a cada ítem un `value` y decide
  por `value`, no por el texto visible.
- Las pestañas no cambian la URL. Si una pestaña tiene que poder compartirse por enlace,
  sincroniza `value` con un query param tú mismo.
- Todas las pestañas se renderizan aunque estén ocultas. Envuelve en `@if` el contenido
  costoso (mapas, tablas grandes) para que se cree solo al abrir la pestaña.
- El estado de un registro es `cs-badge`. `cs-tag` es para clasificar, no para decir en
  qué estado está algo.

## Accesibilidad (a11y) y teclado

- El `<h1>` nombra el registro; el badge de estado dice su estado en texto, no solo en
  color.
- Las pestañas se recorren con flechas, Home y End, y el panel activo es enfocable: ver
  [Tabs](../tabs.md).
- `cs-modal` atrapa el foco, cierra con Escape y devuelve el foco al abrir y cerrar. En
  una baja confirmada el disparador desaparece: mueve tú el foco al título de la página
  a la que vuelves.
- El botón del dropdown de acciones tiene texto visible ("Acciones"); si pasa a ser solo
  ícono, necesita `ariaLabel`.
