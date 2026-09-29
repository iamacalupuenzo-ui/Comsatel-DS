# Textarea

Campo de texto de **varias líneas** para descripciones, observaciones y comentarios.

- **Import:** `import { Textarea } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { Textarea } from '@iamacalupuenzo-ui/comsatel-ds/textarea';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selector:** `<cs-textarea>`

```html
<cs-textarea
  label="Descripción de la observación"
  placeholder="Describe la observación"
  [maxLength]="500"
  [value]="descripcion"
  (valueChange)="descripcion = $event"
></cs-textarea>
```

## Cuándo usarlo

| Decisión | Usa | Motivo |
| :-- | :-- | :-- |
| Texto libre que puede ocupar más de una línea | `Textarea` | Observaciones, motivos de anulación, comentarios, datos operativos. |
| Un dato corto (nombre, código, correo) | `Input` | Una sola línea. |
| Límite de caracteres | `[maxLength]` | Muestra «n/máximo» y lo anuncia a lectores de pantalla. |

## Estados

| Estado | Props | Cuándo |
| :-- | :-- | :-- |
| Vacío | `value=""` | El placeholder dice qué escribir. |
| Con texto | `value="…"` | El alto crece si el usuario lo estira (`resize="vertical"`). |
| Con contador | `[maxLength]="500"` | El contador cambia a tono de aviso al llegar al 90 %. |
| Error | `[invalid]="true"` y `errorMessage` | El texto falta o no es válido. |
| Requerido | `[required]="true"` | El asterisco aparece junto al label. |
| Solo lectura | `[readonly]="true"` | El texto se lee y se copia, pero no se edita. |
| Deshabilitado | `[disabled]="true"` | El campo no está disponible. |

## Props

<!-- props:start Textarea -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/textarea/src/textarea.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id del campo; se genera si no se indica. |
| `label` | `string` | `''` | Label visible encima del campo. |
| `aria-label` | `string` | `''` | Nombre accesible cuando no hay label visible. |
| `placeholder` | `string` | `''` | Texto de ayuda dentro del campo vacío. |
| `value` | `string` | `''` | Texto controlado. |
| `rows` | `number` | `3` | Alto inicial en líneas. |
| `maxLength` | `number \| undefined` | `undefined` | Máximo de caracteres; muestra el contador. |
| `required` | `boolean` | `false` | Asterisco en el label y aria-required. |
| `invalid` | `boolean` | `false` | Borde y anillo de error. |
| `errorMessage` | `string` | `''` | Mensaje de error visible, enlazado con aria-errormessage. |
| `helperText` | `string` | `''` | Texto de ayuda debajo del campo. |
| `readonly` | `boolean` | `false` | Se lee y se copia, pero no se edita. |
| `disabled` | `boolean` | `false` | Deshabilita el campo. |
| `resize` | `'vertical' \| 'none'` | `'vertical'` | vertical permite estirar el alto; none lo fija. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el texto en cada cambio. |
<!-- props:end -->

## Accesibilidad

<!-- a11y:start Textarea -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/textarea/src/textarea.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-textarea`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `textarea` |
| Atributos ARIA | `aria-hidden="true"`, `aria-live="polite"`, `aria-label`, `aria-required`, `aria-invalid`, `aria-errormessage`, `aria-describedby` |
<!-- a11y:end -->
