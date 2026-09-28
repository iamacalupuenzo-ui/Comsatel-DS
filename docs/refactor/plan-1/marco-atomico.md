¿Qué debe quedar validado antes de subir al siguiente nivel del sistema de diseño?

## En 30 segundos

Plan 1 avanzará de Primitivos a Páginas de referencia sin saltos. El primer bloqueo es real: `tokens.css` solo declara primitivos CSS para el secundario cálido; 181 de 207 roles de color del bloque claro todavía tienen un valor directo. Se crearán primitivas exactas y se comprobará que ningún valor computado cambie antes de revisar semánticos, componentes y patrones del producto.

## Recursos

- [Inventario completo de componentes y patrones](marco-atomico-inventario.md)

La [matriz original](../plan-1-migracion-componentes.md) conserva las rutas y criterios por módulo. Las [partes 0 a 7](./parte-0-metodo.md) siguen como evidencia de contratos y brechas; este marco fija ahora el orden de ejecución. `DS:` abrevia `projects/comsatel-ds/src/lib/`; `FO:` abrevia `D:/Proyectos - V4/Proyecto-Comsatel-v1/src/app/`. En las tablas, «pendiente» significa que el estado debe medirse antes de declarar paridad, no que esté roto.

## Nivel 0 · Primitivos

### Estado encontrado

| Familia | Existe | Falta y plan de creación |
| --- | --- | --- |
| Color | `primitive-colors.ts` tiene brand, gray, success, danger, warning, teal, lime, blue, purple, pink, yellow, surface y base; `tokens.css` solo publica `--color-primitive-secondary-050…950`. | Publicar en CSS paletas por tono y pasos 050–950, con anclas que reproduzcan exactamente los valores actuales de los roles. Las escalas TypeScript existentes son insumo, no equivalencia automática: por ejemplo `primitiveColors.brand.500` no coincide con `--color-background-brand-default`. Completar 950 y tonos faltantes sin usar interpolación como sustituto de un valor ya aprobado. |
| Espaciado | `--layout-padding-*` y `--layout-gap-*` son escalas numéricas actuales. | Identificarlas como primitivas en datos y documentación; conservar 10/14 px como excepciones exactas. No crear un paso nuevo por aproximación. |
| Radios y bordes | `--layout-radius-*`, `--layout-border-*` y alias `--radius-*`. | Declarar la dirección primitivo → alias; verificar cada alias por tema. |
| Sombras y capas | `--shadow-xs…xl`, `--elevation-z-index-*`. | Registrar sombras y números de capa como primitivas/constantes de efecto; no alterar su composición. |
| Tipografía | `typography.ts` y CSS generado con familia, tamaño y peso `--font-primitive-*`. | Completar la trazabilidad de interlineado y tracking; generar CSS desde su fuente, nunca editar el archivo generado a mano. |
| Motion | Duraciones y curvas `--motion-*` en CSS. | Documentarlas como primitivas y relacionar los roles de interacción que las consumen, sin cambiar milisegundos ni curvas. |

### Puerta de salida: cero cambio visual

Antes de tocar un rol, capturar con navegador los valores computados de **cada** token semántico en `:root`, `data-theme="light"`, `dark` y el contexto limitado `glass`, incluidos `rgba`, sombras, `calc()` y tipografía. Guardar una instantánea máquina legible con nombre, tema, valor y unidad. Crear los primitivos exactos y remapear; repetir en el mismo navegador y viewport. La comparación normaliza solo formato equivalente de color, no tolera diferencia numérica (`0 px` de geometría, mismos colores y tiempos). Fallar si aparece un rol sin valor, alias circular, diferencia visual o contraste menor. Comparar además lienzo humo, tarjetas blancas, controles, foco y gráficos mediante capturas a 1440×900 y móvil. Solo con inventario completo, diff vacío y revisión de Claude se abre Nivel 1.

## Nivel 1 · Semánticos

Los roles expresan intención y deben resolver por una cadena finita de alias que termine en un primitivo. La identidad semántica se conserva aunque dos roles hoy compartan color.

| Grupo | Hallazgo y acción | Validación |
| --- | --- | --- |
| Sin primitivo CSS | En claro, 181 de 207 roles `--color-*` tienen valor directo; 26 son alias. La deuda cubre `--color-background-*` salvo secundarios cálidos, `--color-text-*`, `--color-border-*`, `--color-icon-*`, `--color-chart-*`, `--color-accent-*`, `--color-status-*`, `--color-map-*`, `--color-interaction-*` y superficies `--elevation-surface-*`. En oscuro hay 190 redefiniciones `--color-*`; glass solo redefine gráfico. | Inventario exportado por tema con nombres exactos; cero roles con literal final fuera de primitivas, salvo transparencia/composición documentada que también tendrá primitivo. |
| Duplicados de valor | `#153565` alimenta diez roles distintos de marca, selección, texto, borde e ícono; `#667085` y `#98a2b3` alimentan ocho cada uno; `#ffffff` alimenta base, superficie de gráfico/tooltip e inversos. Otros grupos repetidos incluyen `#d0d5dd`, `#eaecf0`, `#122a4f`, `#dc6803`, `#1b4079`. | Compartir el mismo primitivo cuando el valor es idéntico; mantener nombres semánticos distintos, en particular `--color-background-selected` frente a marca. |
| Alias locales o inexistentes | FO usa `--app-surface-canvas` en lugar de `--color-background-canvas` y menciona `--z-index-tooltip`, `--elevation-shadow-raised`, `--font-size-display-sm`, `--font-line-height-display-sm`, `--font-weight-semibold`, `--font-size-heading-xs`, `--font-line-height-heading-xs`, `--color-text-base-disabled`. `--color-map-vehicle-*` se compone dinámicamente y requiere validar sufijos. | Mapear cada uso a rol real o registrar brecha; no publicar nombres erróneos como API. La limpieza local ocurre en Plan 2, no en este paso. |
| Roles faltantes del producto | Fecha sola, filtro aplicado y superficies de mapa necesitan contratos semánticos comprobados. Series actuales/anterior, grilla, ejes, tooltip y su superficie ya se añadieron en el paso de color; falta probar su aplicación en gráficos. Superficies para overlay, estado de vehículo y selección se cotejan con roles existentes antes de crear otros. | Por cada rol propuesto: uso real, tres contextos cuando aplique, contraste y vínculo a primitivo; no crear un alias por cada literal local. |

El script de inventario del paso 1 ya obtuvo cero `var()` indefinidas en componentes del DS. Eso verifica existencia de nombres, **no** la cadena primitivo → semántico; la nueva auditoría debe recorrer alias, resolver ciclos, comparar temas y detectar duplicados deliberados. Nivel 2 espera ese veredicto.

El [inventario de niveles 2 a 6](marco-atomico-inventario.md) asigna cada componente y patrón a una puerta de validación.

## Orden de ejecución y puertas de validación

| Nivel | Entrega y prueba de salida | Solo entonces sigue |
| --- | --- | --- |
| 0 Primitivos | Paletas/escala completas; instantáneas computadas antes/después iguales, contraste y capturas sin diferencia. | 1 Semánticos |
| 1 Semánticos | Todos los roles resuelven a primitivo; alias locales inventariados, duplicados intencionales y roles faltantes decididos. | 2 Átomos |
| 2 Átomos | Cada átomo tiene API, story de estados, demo, foco y geometría medidos. | 3 Moléculas |
| 3 Moléculas | Composición y teclado/foco/error verificados; filtros, fecha y autocompletado sin acoplamiento al producto. | 4 Organismos |
| 4 Organismos | Datos entran por API, acciones salen por eventos; vacío/carga/error/móvil y evidencia visual. Decisiones de modal, tabla y ECharts se resuelven antes de sus filas. | 5 Plantillas |
| 5 Plantillas | Shells genéricos de lista, exploración y tablero con responsive y foco, sin services de Fleet. | 6 Páginas de referencia |
| 6 Páginas de referencia | Storybook, sitio Angular y guías muestran instancias reales y enlazan regresiones; revisión final por Claude. | Cierre de Plan 1 |

Los commits ya hechos se ubican así: color `addbe52` y espaciados `5717883` pertenecen a fundamentos, pero vuelven a Nivel 0 para trazar primitivas y comparar valores computados; sus roles se revalidan en Nivel 1. Input `145e498` pertenece a Nivel 2 (`cs-input` y campo interno) y Nivel 3 (`cs-input-group`, `cs-password-input` y limpieza); no se repite su implementación, pero se remapea a primitivos y se vuelve a medir después de validar 0 y 1. Los reportes de ejecución siguen como evidencia, no como pase automático a niveles posteriores.

## Storybook, sitio y estructura de carpetas

Las historias usarán `Fundamentos/Primitivos` y `Fundamentos/Semánticos` para niveles 0–1; `Átomos/...`, `Moléculas/...`, `Organismos/...` y `Plantillas/...` para 2–5. El sitio repetirá esa clasificación en `lib/nav.ts`, rutas y páginas de referencia, con una demo por componente o patrón. Cada ficha indica nivel, contrato, estados, evidencia visual y dependencia del nivel anterior. Se cambia la navegación y la documentación en el mismo nivel que el código, aunque la revisión global de páginas ocurre en Nivel 6.

**Recomendación:** no mover carpetas de `src/lib`. La ubicación física actual sostiene imports relativos, `src/public-api.ts`, empaquetado, rutas de historias y consumidores. Mover todo crea un riesgo amplio para la API pública sin mejorar el contrato; clasificar en títulos de Storybook, nav, guías y metadatos. Solo proponer un movimiento puntual si una nueva frontera de API lo exige y existe plan de compatibilidad.

**Pregunta de comprobación:** Si `--color-text-brand-default` y `--color-border-selected` comparten hoy `#153565`, ¿por qué deben conservar dos nombres después de remapearlos al mismo primitivo?

## Listo para validar
