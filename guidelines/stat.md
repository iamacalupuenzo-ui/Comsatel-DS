# Stat

Indicador de un **tablero**: etiqueta, cifra y una línea de contexto con la variación frente al
periodo anterior.

- **Import:** `import { Stat, type StatTrend } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-stat>`

```html
<cs-stat label="Requieren revisión" [value]="12" [delta]="3" trend="down-is-good" caption="vs. hace una semana"></cs-stat>
```

## Color de la variación

| Indicador | `trend` | Motivo |
| :-- | :-- | :-- |
| «Listas para captura» | `up-is-good` (predeterminado) | Que suba es bueno: verde. |
| «Requieren revisión» | `down-is-good` | Que suba es malo: rojo. |
| «En trabajo» | `neutral` | Subir no es bueno ni malo. |

Una variación de 0 siempre es neutra. El signo (+3, −2) acompaña al color, así que el cambio
no depende solo del color.

## Tamaños

`lg` para las cifras principales (96 px de alto mínimo) y `sm` para bandas de monitoreo con
muchas cifras (58 px).

## Props

<!-- props:start Stat -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/stat/stat.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `label` | `string` | requerido | Qué mide la cifra. |
| `value` | `string \| number` | requerido | La cifra. |
| `caption` | `string` | `''` | Contexto: con qué se compara o qué incluye. |
| `delta` | `number \| null` | `null` | Variación frente al periodo anterior; null para no mostrarla. |
| `trend` | `'up-is-good' \| 'down-is-good' \| 'neutral'` | `'up-is-good'` | Qué dirección de la variación es buena. |
| `size` | `'lg' \| 'sm'` | `'lg'` | lg para cifras principales, sm para bandas de monitoreo. |
<!-- props:end -->

## Accesibilidad

- La etiqueta va antes de la cifra en el orden de lectura.
- La variación se lee con su signo; el color solo la refuerza.

<!-- a11y:start Stat -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/stat/stat.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-stat`

No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.
<!-- a11y:end -->
