# Motion

Anima la entrada y la salida de un contenido según un booleano, siempre con los tokens de
duración y easing del sistema. Un preset elige qué se anima; las duraciones y los easings
eligen cuánto tarda y cómo acelera.

- **Import:** `import { Motion } from 'comsatel-ds';`
- **Selector:** `<cs-motion>`
- **Clase raíz emitida:** `.cs-motion`

```html
<cs-motion [show]="filtersOpen" preset="slide-down" enterDuration="entering" exitDuration="leaving">
  <div class="filters">Filtros avanzados</div>
</cs-motion>
```

## Props

<!-- props:start Motion -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/motion/motion.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `show` | `boolean` | `false` | Muestra u oculta el contenido con animación. |
| `preset` | `'fade' \| 'scale' \| 'slide-up' \| 'slide-down' \| 'slide-left' \| 'slide-right'` | `'fade'` | Qué se anima. |
| `enterDuration` | `'fast' \| 'leaving' \| 'medium' \| 'entering' \| 'slow'` | `'entering'` | Token de duración de la entrada. |
| `exitDuration` | `'fast' \| 'leaving' \| 'medium' \| 'entering' \| 'slow'` | `'leaving'` | Token de duración de la salida. |
| `enterEasing` | `'default' \| 'enter' \| 'exit' \| 'spring'` | `'enter'` | Token de easing de la entrada. |
| `exitEasing` | `'default' \| 'enter' \| 'exit' \| 'spring'` | `'exit'` | Token de easing de la salida. |
| `innerClass` | `string` | `''` | Clase que se aplica al contenedor animado. |
<!-- props:end -->

## Helpers de animación

Para animar con GSAP fuera de `cs-motion`, la librería exporta los mismos easings y la
lectura de duraciones desde los tokens:

```ts
import { EASE_DEFAULT, tokenSeconds } from 'comsatel-ds';

gsap.to(element, {
  height: 'auto',
  duration: tokenSeconds(element, '--motion-duration-medium'),
  ease: EASE_DEFAULT,
});
```

`tokenSeconds` lee el valor del token en tiempo real, así una animación sigue un cambio de
token sin tocar el código. También existen `EASE_ENTER`, `EASE_EXIT` y `EASE_SPRING`. En una animación propia con GSAP,
consulta `prefersReducedMotion()` antes de animar y aplica el estado final directo si
devuelve `true`.

## Accesibilidad (a11y)

- Cuando `show` pasa a `false`, el contenido se anima hacia afuera y **se saca del DOM** al
  terminar: después de la salida no queda nada visible, enfocable ni legible.
- El componente no mueve el foco. Si el contenido tenía el foco al ocultarse, el foco se
  pierde: devuélvelo tú al control que abrió el panel.
- `cs-motion` respeta `prefers-reduced-motion: reduce`: el contenido aparece y desaparece
  sin animación, en el mismo momento en que cambia `show`.

<!-- a11y:start Motion -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/motion/motion.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-motion`

| Aspecto | Qué hace el código |
| :-- | :-- |
| prefers-reduced-motion | Lo respeta |
<!-- a11y:end -->

## Trampas

- El contenido proyectado existe como vista desde que el componente se instancia; `show`
  solo decide si está insertado en el DOM. No pongas lógica costosa asumiendo que no se
  crea hasta mostrarse.
- Para expandir y colapsar una lista dentro de un `@for`, la herramienta es la directiva
  `csCollapse`, no un `cs-motion` por ítem.
- Nunca escribas una duración en milisegundos a mano: usa los tokens o `tokenSeconds`.
