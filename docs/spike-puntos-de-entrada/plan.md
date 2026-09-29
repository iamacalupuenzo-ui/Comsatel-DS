**Pregunta antes de leer:** ¿Tres puntos de entrada reducen el código de la librería que carga el shell sin romper el import raíz?

## En 30 segundos

La prueba debe separar `icons`, `motion` e `input` y medir el sitio compilado, sin publicar el paquete.
El umbral es bajar la contribución de la librería en `main` de 612 kB a 200 kB o menos y volver a menos de 1 MB inicial.
El import raíz se conserva como API; su beneficio de tamaño queda sujeto a una medición separada.

## El problema y la decisión

Hoy `sideEffects: false` no basta: los 91 `export *` terminan en un solo FESM de 1,09 MB y el primer import del shell incorpora 612 kB a `main`. El sitio quedó en 1,03 MB inicial. La hipótesis es que ng-packagr genere FESM independientes para los tres subpaths y que esbuild pueda dejar el resto fuera del arranque. FleetOperations puede sufrir lo mismo, pero no se le hará build ni se afirmará una mejora allí sin medirla.

Elige `icons` (`Icon`, `ICON_REGISTRY`, `IconName`) porque el shell lo usa y tiene muchos consumidores internos; `motion` (`Motion`, utilidades y `PressScale`) porque `PressScale` también está en el shell y depende de las utilidades de motion; e `input` (al menos `InputGroupClear`, que usa `Icon`) para comprobar una dependencia real entre puntos de entrada. `Button` no sirve como prueba de composición: `button.ts` no importa otro componente; solo su historia usa `Icon`. En el spike, `input` puede exportar solo `InputGroupClear` y el resto de su API permanecer en raíz: se está probando el mecanismo, no migrando las 57 carpetas.

Descarta un cambio de `sideEffects` porque ya vale `false`, y descarta dividir solo el import del consumidor: sin nuevos puntos de entrada seguiría resolviendo el FESM único. Tampoco se propone subir otra vez el budget ni condicionar la prueba a Vercel; el destino será GitLab.

## Contrato de empaquetado y compatibilidad

Ubica `ng-package.json` y `public-api.ts` en `projects/comsatel-ds/icons/`, `motion/` e `input/`; cada `ng-package.json` declara `lib.entryFile: "public-api.ts"`. Esos archivos exponen las clases reales de `src/lib` y ng-packagr debe producir `exports["./icons"]`, `exports["./motion"]` y `exports["./input"]` con FESM y declaraciones independientes. Comprueba primero que ng-packagr 22 admite esos archivos fuente; si exige que estén dentro de la carpeta secundaria, mueve los fuentes elegidos y adapta el lector de docs, sin duplicar clases.

Entre entradas usa el nombre público, por ejemplo `import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons'` y `import { tokenEase } from '@iamacalupuenzo-ui/comsatel-ds/motion'`. Sustituye también los imports relativos que apuntan desde el resto de `lib/` hacia los símbolos migrados; un relativo que cruza entradas puede generar duplicados o fallar al empaquetar. Incluye imports de tipo. Mantén una sola definición de cada clase y compruébalo en las declaraciones generadas. La entrada raíz reexporta los símbolos migrados desde los subpaths y conserva los otros exports. Esto debe sostener la API anterior; **no garantiza** que el import raíz quede liviano mientras siga exponiendo los demás componentes. El build y los tamaños decidirán eso.

`projects/comsatel-ds/ng-package.json` conserva los assets globales `styles.css`, `tokens.css` y `typography-tokens.css` en la raíz. `scripts/package-style.mjs` debe preservar las claves de exports que genere ng-packagr al agregar `./styles.css`. Los subpaths de JavaScript no sustituyen la importación global de CSS.

## Medición y criterios de aceptación

Trabaja en `spike/secondary-entry-points`. Antes de editar, y luego con los tres subpaths, ejecuta en este repo: `npm run build:lib` y `npx ng build comsatel-ds-angular --configuration production --stats-json`. Conserva por separado el `stats.json` generado bajo `dist/comsatel-ds-angular/` y la salida de consola de cada build. Usa la misma versión de dependencias, configuración y página en ambas corridas; registra los bytes sin gzip. La línea `Initial total` de Angular da el total inicial (JS y CSS). Lee el aporte de la librería a `main` con este comando de PowerShell, apuntando al stats correspondiente:

```powershell
$stats = (Get-ChildItem dist/comsatel-ds-angular -Filter stats.json -Recurse | Select-Object -First 1).FullName
node -e 'const s=require(process.argv[1]); const norm=k=>k.replaceAll(String.fromCharCode(92),"/"); const pair=Object.entries(s.outputs).find(([k])=>/(^|\/)main-[^/]+[.]js$/.test(norm(k))); if(!pair) throw Error("main no aparece en stats"); const n=Object.entries(pair[1].inputs).filter(([k])=>/dist\/comsatel-ds\/fesm2022\//.test(norm(k))).reduce((a,[,v])=>a+v.bytesInOutput,0); console.log({main:pair[0], bytesLibreriaEnMain:n});' $stats
```

Si el formato de rutas de `stats.json` difiere, inspecciona sus claves `outputs` e `inputs` y ajusta solo la expresión de ruta; no cambies la definición de la cifra. En ambos builds registra también los FESM generados y qué entradas contribuyen a `main` y a los chunks lazy.

Éxito técnico: compilan y resuelven los tres subpaths, `input` referencia el FESM de `icons` sin copiar su clase, el import raíz sigue compilando para `Icon`, `PressScale` e `InputGroupClear`, y las pruebas y puertas existentes pasan. Éxito de rendimiento: con el shell importando `Icon` de `/icons` y `PressScale` de `/motion`, `bytesLibreriaEnMain` baja de 612 000 a **≤200 000 bytes** y `Initial total` baja de 1 MB. Mide después una variante con los mismos símbolos importados desde la raíz. Si su cifra no cae de forma comparable, conserva la compatibilidad pero registra que FleetOperations necesitaría migrar imports para aprovechar el ahorro; no prometas lo contrario.

## Riesgos y vuelta atrás

El riesgo principal es la cantidad de imports relativos internos (`icons` aparece en 67) y el posible ciclo raíz → secundario → raíz. Detecta el ciclo al empaquetar y evita que un secundario importe jamás desde la raíz. Otro riesgo es que la entrada raíz aún arrastre código no migrado; por eso la prueba de raíz tiene resultado propio. La compilación puede conservar `gsap` en el arranque porque `PressScale` lo usa: interprétalo como dependencia real, no como fallo de aislamiento.

Storybook usa historias fuente en `.storybook/main.ts` y puerto 6006; verifica `npm run build-storybook` y, si hace falta, `npm run storybook` en 6006. `scripts/lib/ds.mjs` lee las rutas de `src/public-api.ts` y archivos `lib/*`; si se mueven fuentes o cambian los exports, ajusta `exportedFiles()`, `components()` y `exportedSymbols()` para que props y a11y sigan cubriendo la API. Ejecuta `npm run docs` solo si cambias API o templates, completa descripciones y pasa `npm run check:docs`, `npm run test:ci` y `npx --yes adsa-cli@0.1.5 audit --gate` con 45/45. Revisa `npm run pack:lib`: el paquete debe incluir los tres subpaths, sus tipos y los CSS; verifica que el workflow `.github/workflows/publish-package.yml` seguiría completando `build:lib`, Storybook y audit. No dispares ese workflow, no cambies versión y no publiques. Si falla el umbral o la compatibilidad, conserva mediciones y hallazgos en la rama; revierte los cambios del spike mediante un commit inverso o descarta la rama, sin tocar `main`.

## Guía para el Constructor

1. Crea `spike/secondary-entry-points`; captura baseline y guarda `stats.json` y consola fuera de `dist/`. Comprueba `git status` antes de editar.
2. Crea `projects/comsatel-ds/{icons,motion,input}/{ng-package.json,public-api.ts}`. Expón `Icon` y su registro, `Motion` y utilidades, `PressScale`, e `InputGroupClear`. Conserva `src/lib` como fuente única; si ng-packagr rechaza fuentes externas al directorio secundario, mueve solo esos fuentes y actualiza sus rutas de template, estilos e historias.
3. En `projects/comsatel-ds/src/public-api.ts`, reemplaza los exports directos de esos símbolos por reexports de los subpaths. En `projects/comsatel-ds/src/lib/**/*.ts`, cambia a imports públicos las referencias entre entradas; comienza por `press-scale.directive.ts` → `/motion` e `input-group-clear.ts` → `/icons`. Trata `app-layout`, `menu`, `tabs`, `pagination`, `autocomplete` y `filter-bar` igual cuando apunten a fuentes migrados. Elimina ciclos y exportaciones dobles.
4. Ajusta `tsconfig.json` con rutas de desarrollo para `@iamacalupuenzo-ui/comsatel-ds/*` hacia los paquetes construidos si la resolución local lo requiere. Conserva `ng-package.json` raíz y comprueba en `dist/comsatel-ds/package.json` los `exports` de JS, tipos y CSS tras `scripts/package-style.mjs`.
5. Cambia solo el import de `src/app/layout/shell/shell.ts` a `/icons` y `/motion`; prueba `InputGroupClear` desde `/input` en `src/app/pages/input-demo/input-page.ts` sin alterar la UI. Repite el build medido y luego la variante de import raíz, en igualdad de condiciones. Comprueba que la entrada raíz conserva los símbolos usados por FleetOperations mediante compilación de un pequeño consumidor de tipos o los imports actuales del sitio; no hagas builds en FleetOperations.
6. Pasa Storybook, docs, tests, audit 45/45 y `pack:lib`; documenta cifras, exportaciones y fallos. Decide con esos datos si escalar la migración de las demás carpetas. Mantén todo en la rama del spike y sin publicar.

**Pregunta de comprobación:** Si el subpath mejora `main` pero el import raíz no, ¿qué cambio necesitaría FleetOperations para obtener el ahorro?
