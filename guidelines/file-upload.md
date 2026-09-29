# FileDropzone y FileItem

Carga de **archivos**: una zona para arrastrar o elegir archivos (`FileDropzone`) y la fila de
cada archivo adjunto (`FileItem`).

- **Import:** `import { FileDropzone, FileItem, fileIconFor, formatFileSize } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selectores:** `<cs-file-dropzone>`, `<cs-file-item>`

```html
<cs-file-dropzone
  accept=".xlsx,.xls,.csv"
  hint="Formatos admitidos: XLSX, XLS o CSV. Tamaño máximo: 10 MB."
  [errorMessage]="uploadError"
  (filesSelected)="validate($event)"
></cs-file-dropzone>

<ul class="evidence">
  <li><cs-file-item fileName="foto-unidad.jpg" [fileSize]="850000" removeLabel="Quitar foto-unidad.jpg" (remove)="removeEvidence()"></cs-file-item></li>
</ul>
```

## Quién valida

`FileDropzone` solo recoge los archivos: la pantalla decide qué acepta y qué mensaje mostrar,
porque conoce las reglas (formato, tamaño, contenido). `accept` filtra el selector del sistema,
pero no impide soltar otro tipo de archivo, así que la validación siempre va en la pantalla. El
error se muestra con `errorMessage` y se anuncia con `role="alert"`.

## Cuándo usarlo

| Caso | Usa | Motivo |
| :-- | :-- | :-- |
| Carga de un archivo principal (carga masiva) | `FileDropzone` | Área grande para arrastrar, con formatos a la vista. |
| Adjuntos opcionales (evidencias) | Botón «Adjuntar» y `FileItem` por archivo | No ocupa espacio cuando no hay adjuntos. |
| Archivo ya adjunto | `FileItem` con `removeLabel` | Muestra nombre, tamaño y cómo quitarlo. |

## Props de `FileDropzone`

<!-- props:start FileDropzone -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/file-upload/file-upload.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | `'Arrastra el archivo aquí'` | Texto principal de la zona. |
| `hint` | `string` | `''` | Formatos y tamaño admitidos, en una línea. |
| `accept` | `string` | `''` | Filtra el selector del sistema; no reemplaza la validación. |
| `multiple` | `boolean` | `false` | Permite elegir o soltar varios archivos. |
| `buttonLabel` | `string` | `'Seleccionar archivo'` | Texto del botón que abre el selector. |
| `icon` | `IconName` | `'file-text'` | Ícono de la zona. |
| `disabled` | `boolean` | `false` | Desactiva la zona y el botón. |
| `errorMessage` | `string` | `''` | Error de la última carga; lo decide la pantalla. |
| `filesSelected` | `EventEmitter<File[]>` | n/a | Archivos elegidos o soltados. |
<!-- props:end -->

## Props de `FileItem`

<!-- props:start FileItem -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/file-upload/file-upload.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `fileName` | `string` | requerido | Nombre del archivo. |
| `fileSize` | `number \| null` | `null` | Tamaño en bytes; null para no mostrarlo. |
| `href` | `string` | `''` | URL del archivo; el nombre lo abre en una pestaña nueva. |
| `icon` | `IconName \| undefined` | `undefined` | Ícono propio; sin valor, se elige según la extensión. |
| `removeLabel` | `string` | `''` | Nombre accesible del botón de quitar; vacío para no mostrarlo. |
| `remove` | `EventEmitter<void>` | n/a | Clic en quitar. |
<!-- props:end -->

## Accesibilidad

- Arrastrar es un atajo: el botón «Seleccionar archivo» hace lo mismo con teclado.
- El input nativo queda oculto y fuera del orden de tabulación; el botón lo abre.
- En `FileItem`, el enlace dice que abre una pestaña nueva y el botón de quitar se nombra con `removeLabel`.

<!-- a11y:start FileDropzone -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/file-upload/file-upload.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-file-dropzone`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `input[type="file"]` |
| Roles | `alert` |
| Atributos ARIA | `aria-hidden="true"` |
| Compone | `cs-icon`, `cs-button` |
<!-- a11y:end -->

<!-- a11y:start FileItem -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/file-upload/file-upload.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-file-item`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `a[href]`, `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label` |
| Compone | `cs-icon` |
<!-- a11y:end -->
