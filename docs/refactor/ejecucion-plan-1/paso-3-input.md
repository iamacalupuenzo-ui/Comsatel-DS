¿Qué necesita Input para cubrir los campos y filtros observados en el producto?

## En 30 segundos

Input e InputGroup ya exponen el estado de filtro aplicado. InputGroup incorpora limpieza accesible, y los campos neutralizan el autocompletado celeste del navegador. Las historias y la demo cubren las composiciones y estados pertinentes sin cambiar el ancho exterior del control.

## Qué cambió

El commit local `145e498c8a46ba5dbeab3fa8bc728bcf89b1bb83` actualizó `projects/comsatel-ds/src/lib/input/input.ts`, `input.html`, `input.css`, `input-group.ts`, `input-group.html`, `input-group.css` y `input-group-input.css`; añadió `input-group-clear.ts` y su prueba. `src/public-api.ts` exporta el nuevo componente. `input.stories.ts`, `input-group.stories.ts`, `password-input.stories.ts` y `src/app/pages/input-demo/` muestran vacío, texto, hover, foco, error, requerido, aplicado, disabled, readonly y tamaños `sm/md/lg` cuando corresponde. La demo de Input ya estaba registrada en `src/app/app.routes.ts` y `src/app/lib/nav.ts`; se amplió la misma página.

El inventario de `src/app` del producto encontró lupa en búsquedas de Capturas, Recuperos y unidades; calendario al final de filtros de fecha; ojo en contraseña; y X para limpiar o cerrar acciones. El DS cubre íconos inicial/final con `InputGroupAddon`, ojo con `PasswordInput` y X con `InputGroupClear`. El botón de limpieza anuncia su acción con `aria-label`, emite `cleared`, dispara `valueChange` del input y devuelve el foco. El estado aplicado usa borde, fondo y texto de selección; error y foco tienen prioridad. Las superficies conservan el mismo ancho y grosor de borde en sus estados. `aria-invalid` y `aria-errormessage` llegan al input nativo.

## Verificación y pendientes

`npx ng test comsatel-ds --watch=false --include='**/input-group-clear.spec.ts' --include='**/input-tokens.spec.ts'`: 2 pruebas y 2 archivos pasaron. `npx tsc -p projects/comsatel-ds/tsconfig.lib.json --noEmit`: pasó. La revisión de TypeScript de Storybook y la revisión de plantillas del sitio con `ngc` pasaron apuntando al `public-api.ts` fuente; el mapeo normal a `dist/comsatel-ds` sigue desactualizado porque no se ejecutó el build completo. El inventario final revisó 1720 referencias y encontró cero sin definición. El script de contraste de gráficos pasó en los tres contextos. `git diff --check`: sin errores.

Queda pendiente la validación visual e interactiva de Storybook y del sitio por Claude, y la publicación de una nueva versión solo si Enzo la autoriza.

## Resultado final

Los tres pasos están implementados en tres commits locales, sin cambios en FleetOperations ni push, tag o publicación. Input queda listo para validación visual con foco, error, filtro aplicado, limpieza y autocompletado cubiertos.

**Pregunta de comprobación:** Si un filtro tiene valor y después se vuelve inválido, ¿qué estado visual debe tener prioridad?

## Correcciones tras validación

- `9e2c63fc98250ee661e6de975706e3b922a9749e`: se reconstruyó únicamente la librería con `npx ng build comsatel-ds`; Storybook compiló con `npm run storybook -- --port 6007 --no-open` y el sitio y una historia de Input respondieron HTTP 200. `README.md` indica reconstruir la librería antes de abrir Storybook o el sitio cuando cambia la API pública, porque `tsconfig.json` resuelve `dist/comsatel-ds`.
- `b645a10e0fcde3bb57908b0a62f4ff1604d2508d`: `InputGroupClear` busca el input desde el `.cs-input-group` más cercano, incluso cuando el botón está proyectado dentro de `cs-input-group-addon`. La nueva prueba de esa composición pasó; en total, las pruebas dirigidas de Input terminaron 3/3 y `tsc --noEmit` de la librería pasó.

Queda la validación visual e interactiva de Claude sobre los estados de Input en navegador.

## Ajustes visuales

El commit local `161363bd63dd943513b9dde1312659f75f4687b5` ajustó `input-group.css`, `input-group-input.css`, `input.css`, `input-group-input.ts`, `input-group-clear.ts`, su prueba, `input-group.stories.ts` y `guidelines/input.md`. Sin addon inicial, el texto de InputGroup queda a 10 px en `sm/md` y a 14 px en `lg`, alineado con Input; junto a un addon conserva 6 px. La X solo aparece con valor y se actualiza al escribir, limpiar o cambiar el valor controlado desde el formulario. La historia del filtro aplicado ahora vincula `active` al valor; la del campo requerido `lg` muestra el placeholder «Requerido lg».

En `readonly`, Input e InputGroup conservan el aspecto normal en reposo y el foco visible, pero el hover no refuerza el borde. El calendario de un filtro de fecha de solo lectura sigue siendo clicable. Esta decisión separa la lectura de la edición sin hacer que el control parezca deshabilitado ni cambiar su ancho o alto.

Verificación: las pruebas dirigidas de Input terminaron 5/5; `npx ng build comsatel-ds` compiló la librería; Storybook compiló con `npm run storybook -- --port 6025 --no-open` y las historias `AppliedFilterAndClear` y `GroupStatesAndSizes` respondieron HTTP 200. `git diff --cached --check` no reportó errores. Queda pendiente la revisión visual final de Claude y cualquier publicación que Enzo decida.

## Input validado por ajustar
