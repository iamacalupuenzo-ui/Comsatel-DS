# FormField

Envoltorio de un **campo de formulario**: label, el control proyectado, texto de ayuda y mensaje de error,
con ids predecibles para enlazarlos. Evita repetir el mismo marcado en cada pantalla.

- **Import:** `import { FormField } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-form-field>`

```html
<cs-form-field for="unit-code" label="Código de unidad" [required]="true" [errorMessage]="error">
  <cs-input id="unit-code" [invalid]="!!error" aria-errormessage="unit-code-error"></cs-input>
</cs-form-field>
```

## Cuándo usarlo

| Decisión | Usa | Motivo |
| :-- | :-- | :-- |
| Control sin label propio (Input, InputGroup) | `FormField` | Da label, ayuda y error con el mismo estilo en todo el producto. |
| Control que ya trae `label` (Select, Autocomplete, Textarea, pickers) | El `label` del control | No dupliques el título. |

## Tamaño del label

`size` debe coincidir con el `fieldSize` del control. El label sigue la escala de campos
(`fieldLabelTypography`), la misma de Input dropdown, Select, Autocomplete y los pickers:
12 px en `sm` y `md`, 14 px en `lg`, siempre en peso `accent`. Así el label queda por
debajo del valor escrito y se distingue por el peso.

```html
<cs-form-field for="email" label="Correo corporativo" size="lg">
  <cs-input id="email" fieldSize="lg"></cs-input>
</cs-form-field>
```

## Enlace de ids

`for` es el id del control. FormField genera `{for}-label`, `{for}-help` y `{for}-error`; el control debe usar
`aria-describedby="{for}-help"` o `aria-errormessage="{for}-error"` según corresponda.

## Props

<!-- props:start FormField -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/form-field/form-field.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `for` | `string` | `''` | Id del control proyectado; genera {for}-label, {for}-help y {for}-error. |
| `label` | `string` | `''` | Label visible encima del campo. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Mismo tamaño que el control; define la tipografía del label. |
| `required` | `boolean` | `false` | Asterisco en el label y aria-required. |
| `helperText` | `string` | `''` | Texto de ayuda debajo del campo. |
| `errorMessage` | `string` | `''` | Mensaje de error visible, enlazado con aria-errormessage. |
<!-- props:end -->

## Accesibilidad

<!-- a11y:start FormField -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/form-field/form-field.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-form-field`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label` |
| Atributos ARIA | `aria-hidden="true"` |
| Compone | `cs-icon` |
<!-- a11y:end -->
