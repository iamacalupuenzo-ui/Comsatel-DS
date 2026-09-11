# Patrón: formulario de configuración

**Cuándo usarlo.** Una pantalla donde el usuario cambia varios valores y los confirma
todos juntos: alertas de un vehículo, datos de una geocerca, preferencias de la cuenta.
Si cada cambio se aplica al instante, no es este patrón: son `cs-toggle` sueltos.

## Esqueleto

```html
<form class="settings" (submit)="$event.preventDefault()">
  <h1>Alertas del vehículo</h1>

  @if (saveError) {
    <div role="alert">
      <cs-banner variant="danger" title="No se pudo guardar" [dismissible]="true" (dismiss)="saveError = false">
        Revisa la conexión e inténtalo de nuevo. Tus cambios siguen en el formulario.
      </cs-banner>
    </div>
  }

  <label for="alert-email">Correo para alertas</label>
  <cs-input
    id="alert-email"
    type="email"
    autocomplete="email"
    [required]="true"
    [invalid]="emailInvalid"
    aria-errormessage="alert-email-error"
    [value]="email"
    (valueChange)="email = $event"
  ></cs-input>
  @if (emailInvalid) {
    <p id="alert-email-error">Ingresa un correo válido, por ejemplo nombre@empresa.com.</p>
  }

  <cs-radio-group
    label="Frecuencia de reporte"
    [required]="true"
    [value]="frequency"
    (valueChange)="frequency = $event"
  >
    <cs-radio value="realtime" label="Tiempo real"></cs-radio>
    <cs-radio value="5min" label="Cada 5 minutos"></cs-radio>
  </cs-radio-group>

  <cs-checkbox
    label="Avisar exceso de velocidad"
    description="Se envía cuando el vehículo supera el límite de la vía."
    [checked]="speeding"
    (checkedChange)="speeding = $event"
  ></cs-checkbox>

  <cs-datetime-picker
    [value]="startsAt"
    (valueChange)="startsAt = $event"
    [datePickerProps]="{ label: 'Activar desde' }"
    [timePickerProps]="{ label: 'Hora' }"
  ></cs-datetime-picker>

  <div class="settings__actions">
    <cs-button variant="default" (click)="cancel()">Cancelar</cs-button>
    <cs-button
      variant="primary"
      [loading]="saving"
      [aria-label]="saving ? 'Guardando cambios' : ''"
      (click)="save()"
    >Guardar cambios</cs-button>
  </div>
</form>
```

El orden es fijo: título, error general si lo hay, campos en el orden en que se piensan,
y las acciones al final, con la primaria a la derecha.

## Estados

**Carga inicial.** Mientras llegan los valores guardados, dibuja un `cs-skeleton` por
campo con su alto real. No muestres el formulario vacío: el usuario podría guardar
valores en blanco encima de los reales.

**Validación.** Valida al salir del campo y al guardar, no en cada tecla. Un campo con
error lleva `[invalid]="true"` y `aria-errormessage` apuntando al texto del error, que
dice cómo corregirlo, no solo que está mal.

**Guardando.** El botón primario pasa a `[loading]="true"`. El resto del formulario sigue
visible y legible: no lo cubras con una capa.

**Éxito.** Confirma con un `cs-toast variant="success"` montado por el servicio de la
aplicación. No redirijas sin avisar.

**Error al guardar.** Un `cs-banner variant="danger"` arriba del formulario, envuelto en
`role="alert"`, y **los valores del usuario se conservan**. Nunca limpies el formulario
después de un error.

**Solo lectura.** Si el usuario no tiene permiso para editar, muestra los valores con
`[readonly]="true"` y explica por qué en un `cs-banner variant="neutral"`, en vez de
esconder la pantalla.

## Trampas

- **`cs-button` siempre es `type="button"`**: el formulario no se envía con el botón ni
  con Enter. El guardado va en `(click)` del botón primario.
- Checkbox o Toggle: si el cambio se aplica al guardar, es `cs-checkbox`. `cs-toggle` es
  para efectos inmediatos y no pertenece a este patrón.
- Un selector de un valor es `cs-input-dropdown`, nunca `cs-dropdown` (que es un menú de
  acciones) ni un `<select>` nativo.
- Todos los campos son controlados: sin reasignar el valor en su evento de cambio, el
  campo vuelve atrás.
- Las fechas viajan como texto ISO `YYYY-MM-DD`, no como objetos `Date`.
- `loading` cambia el nombre accesible del botón a "Cargando" si no pasas `aria-label`:
  pásale uno que diga qué está pasando.

## Accesibilidad (a11y) y teclado

- Cada campo tiene nombre accesible visible: `<label for>`, `label` del componente o
  `aria-labelledby`. Un `placeholder` no es un nombre.
- Al guardar con errores, mueve el foco al primer campo inválido y deja que su mensaje se
  lea con él.
- El error general dentro de `role="alert"` se anuncia apenas aparece, sin mover el foco.
- El recorrido con Tab sigue el orden visual y termina en las acciones.
