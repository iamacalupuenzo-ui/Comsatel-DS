# Agents

<!-- adsa:start -->
## Design system: comsatel-ds-angular 0.0.0

This project uses comsatel-ds-angular. Before writing any UI:

- Find the component first: run `npx adsa-cli search "<what you need>"`, then `npx adsa-cli docs <component>`. Do not read `node_modules` types and do not
  reach for habits from shadcn, MUI or Radix: this system has its own names.
- Import per component: `import { Button } from "comsatel-ds"` (the library's package name, not the workspace name `comsatel-ds-angular`).
- Colour, spacing, radius and typography come from the system's tokens. Raw palette
  classes (raw colour literals) and raw hex values are not allowed in product code.
- Icons come only from the system's icon set. No second icon library, no local
  `components/ui` folder, no copied component source.
- **If the component you need does not exist, stop and ask.** Do not invent a
  wrapper, do not approximate it with a div, and do not silently pick the nearest
  thing. Known absences and what to use instead are listed in GAPS.md.
- Before you call the work done: `npm run check:docs` and `npm run test:ci` must pass.
<!-- adsa:end -->

## Comsatel DS: reglas del proyecto

- **Busca en `guidelines/` antes de escribir UI.** Cada guía trae la tabla de props y el
  contrato a11y generados desde el código, y las trampas conocidas. Para armar una
  pantalla completa, empieza por `guidelines/patterns/index.md`.
- Importa desde `comsatel-ds`, nunca desde `projects/comsatel-ds/src/...`.
- Colores, espaciado, radios, sombras, z-index y motion salen de
  `guidelines/design-tokens.md`. Nunca escribas un hex, un píxel suelto ni un `z-index`
  numérico en un componente o una página.
- En las plantillas, una prop `boolean` o `number` va con binding: `[disabled]="true"`.
  Escrita como atributo (`disabled`) Angular pasa texto y el componente la ignora.
- Nunca uses un `<select>` nativo: usa `cs-input-dropdown` o `cs-select`.
- Casi todos los componentes son controlados: los eventos (`closed`, `dismiss`,
  `valueChange`) solo avisan. Cerrar, ocultar o actualizar el valor lo haces tú.
- Si falta un componente o una variante, detente y pregunta. Si se confirma que no
  existe, regístralo en el mismo cambio:
  `npm run gap:report -- "Qué falta" "Qué usar en su lugar" "Por qué o estado"`.
- Si cambias la API o el template de un componente, corre `npm run docs` y completa las
  filas marcadas "Sin descripción": `npm run check:props` falla mientras quede alguna.
- Antes de dar el trabajo por terminado, estos dos comandos tienen que pasar:
  `npm run check:docs` y `npm run test:ci`.
