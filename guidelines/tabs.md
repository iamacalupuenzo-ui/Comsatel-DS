# Tabs

Vistas alternativas del mismo contexto: el usuario cambia de panel sin cambiar de
página. Si cada opción lleva a un lugar distinto de la aplicación, eso es navegación
(`Menu`), no tabs.

- **Import:** `import { Tabs, Tab } from 'comsatel-ds';`
- **Selectores:** `<cs-tabs>`, `<cs-tab>`
- **Clases raíz emitidas:** `.cs-tabs`, `.cs-tab-panel`

```html
<cs-tabs variant="line" [value]="tab" (valueChange)="tab = $event">
  <cs-tab value="live" label="En vivo">
    <p>Contenido del panel en vivo.</p>
  </cs-tab>
  <cs-tab value="history" label="Histórico">
    <p>Contenido del panel histórico.</p>
  </cs-tab>
</cs-tabs>
```

## Props de `Tabs`

<!-- props:start Tabs -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/tab/tabs.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `variant` | `'line' \| 'pill'` | `'line'` | Subrayado, o pastilla. |
| `value` | `string \| undefined` | `undefined` | Pestaña activa (modo controlado). |
| `defaultValue` | `string \| undefined` | `undefined` | Pestaña inicial (no controlado). |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el `value` de la pestaña elegida. |
<!-- props:end -->

## Props de `Tab`

<!-- props:start Tab -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/tab/tab.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `value` | `string` | requerido | Identifica la pestaña. |
| `label` | `string` | requerido | Texto del botón de la pestaña. |
| `disabled` | `boolean` | `false` | La pestaña no se puede activar. |
<!-- props:end -->

El contenido del panel va proyectado dentro del `cs-tab`.

## Accesibilidad (a11y) y teclado

- La barra es `role="tablist"`, cada botón es `role="tab"` con `aria-selected` y
  `aria-controls`, y cada panel es `role="tabpanel"` con `aria-labelledby`.
- **Flecha derecha / izquierda** mueven entre pestañas y el recorrido **da la vuelta**
  al llegar al extremo; **Home** va a la primera y **End** a la última. Las
  deshabilitadas se saltan.
- El panel activo tiene `tabindex="0"`, así que se puede enfocar y recorrer su
  contenido con el teclado después de elegir la pestaña.
- Los paneles inactivos se ocultan con `hidden`: su contenido no se lee ni recibe foco.

<!-- a11y:start Tabs -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/tab/tabs.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-tabs`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `tablist`, `tab` |
| Atributos ARIA | `aria-label="Pestañas"`, `aria-selected`, `aria-controls` |
| Teclas que maneja el código | `ArrowRight`, `ArrowLeft`, `Home`, `End` |
| Foco | Mueve el foco por código (`.focus()`) |
| Directivas | `csPressScale` |
<!-- a11y:end -->

<!-- a11y:start Tab -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/tab/tab.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-tab`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `tabpanel` |
| Atributos ARIA | `aria-labelledby` |
<!-- a11y:end -->

## Trampas

- `label` es una prop, no contenido proyectado: lo que proyectas dentro del `cs-tab` es
  el **panel**, no el título de la pestaña.
- Controlado y no controlado son excluyentes: con `value` sin `valueChange`, las
  pestañas no cambian.
- El contenido de todos los paneles se renderiza (se oculta con `hidden`, no se
  destruye). Si un panel es costoso, envuelve su contenido en un `@if` propio.
