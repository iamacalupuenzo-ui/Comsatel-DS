# MapTabs

Pestañas de las **vistas abiertas sobre el mapa**: la del mapa fija al inicio y después los
grupos de seguimiento, las bitácoras y los recuperos. Se cierran con la X y los grupos se
renombran como una hoja de cálculo (doble clic, F2 o el lápiz de la pestaña activa).

- **Import:** `import { MapTabs, type MapTab, type MapTabRename } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-map-tabs>`
- **Clases raíz emitidas:** `.cs-map-tabs`

```html
@if (tabs().length > 1) {
  <cs-map-tabs [tabs]="tabs()" [(active)]="activeTab" (closeRequest)="requestClose($event)" (renamed)="rename($event)"></cs-map-tabs>
}
```

## Cuándo usarlo

| Necesidad | Componente | Motivo |
| :-- | :-- | :-- |
| Vistas que la persona abre y cierra sobre el mapa | `cs-map-tabs` | Cerrables, renombrables, con contador. |
| Secciones fijas de una página | `Tab` | No se cierran ni se renombran. |

Con una sola pestaña (solo el mapa) la barra no aporta: la pantalla no la muestra, como un
navegador con una sola pestaña.

## Es controlada

`tabs` y `active` vienen de la pantalla. La X emite `closeRequest` y la pestaña **no
desaparece sola**: la pantalla la quita, o primero pide confirmar cuando se pierde algo (un
grupo de seguimiento pierde su lista de unidades; una bitácora se cierra directo). Al cerrar
la activa, lo esperado es activar la de la izquierda.

`renamed` trae el nombre nuevo sin espacios sobrantes y cortado a `maxNameLength`; vacío
significa volver al nombre por defecto («Seguimiento N»), que decide la pantalla.

## Enlace con la vista

La vista que muestra la pestaña activa la dibuja la pantalla. Para que un lector de pantalla
sepa qué controla cada pestaña, dale a ese contenedor `role="tabpanel"`, un id que pasas en
`panelId` y `aria-labelledby` con `mapTabId(tab.id)`:

```html
<div role="tabpanel" id="vista-activa" [attr.aria-labelledby]="labelledBy()"><!-- mapa, bitácora… --></div>
```

## Props

<!-- props:start MapTabs -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/map-tabs/map-tabs.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `tabs` | `MapTab[]` | requerido | Pestañas: id, label, icon, count, closable, renamable y description. |
| `label` | `string` | `'Vistas abiertas del mapa'` | Nombre accesible del grupo de pestañas. |
| `maxNameLength` | `number` | `30` | Largo máximo de un nombre propio. |
| `renameInputLabel` | `string` | `'Nombre de la pestaña'` | Nombre accesible del campo al renombrar. |
| `active` | `string` | `''` | Id de la pestaña activa; admite `[()]`. |
| `activeChange` | `ModelSignal<string>` | n/a | La persona cambió de pestaña. |
| `closeRequest` | `OutputEmitterRef<string>` | n/a | Id de la pestaña a cerrar; la pantalla la quita o pide confirmar. |
| `renamed` | `OutputEmitterRef<MapTabRename>` | n/a | Id y nombre nuevo; vacío vuelve al nombre por defecto. |
<!-- props:end -->

## Accesibilidad

- Patrón de pestañas de ARIA: `role="tablist"` con nombre, `role="tab"` y `aria-selected`.
  Solo la activa está en el orden de tabulación; las flechas, Inicio y Fin mueven el foco y
  activan.
- Cada pestaña se lee con `description` cuando el texto visible no basta («Bitácora de
  ABC-123»), su contador y, si se puede, «F2 o doble clic para renombrar».
- La X y el lápiz tienen nombre propio y ocupan todo el alto de la pestaña (≥ 24 × 24 px).
- Al renombrar, Enter confirma y devuelve el foco a la pestaña; Escape cancela.

<!-- a11y:start MapTabs -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/map-tabs/map-tabs.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-map-tabs`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `input[type="text"]`, `button` |
| Roles | `tablist`, `presentation`, `tab` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-controls`, `aria-selected` |
| Teclas que maneja el código | `ArrowLeft`, `ArrowRight`, `Home`, `End`, `Enter`, `Escape`, `f2` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-icon` |
<!-- a11y:end -->
