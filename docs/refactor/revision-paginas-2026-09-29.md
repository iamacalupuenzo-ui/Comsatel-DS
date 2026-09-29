¿Qué cambió en las páginas que no seguían el patrón del sitio?

## En 30 segundos

Filter bar ya muestra estados separados, casos de uso y una tabla legible; su barra se comprobó en escritorio y a 767 px.
Reconstruí las páginas con estados ausentes y las secciones nuevas de Toast y Modal. Textarea ya cumplía y quedó igual.
La revisión de Table quedó fuera por el cambio de alcance. Compilación, documentación y pruebas pasan.

## Qué pasó y qué hicimos

La captura inicial de Filter bar confirmó un playground con interruptores, sin sección de estados y con una tabla «Reglas» en lugar de casos de uso. También faltaba importar el estilo compartido de página: la tabla de propiedades aparecía como texto sin columnas. Reconstruí el contenido con un selector «Estado», notas antes del ejemplo, seis cajas de estados, un caso de Capturas y la tabla de propiedades. La barra ahora usa todo el ancho disponible con `box-sizing: border-box`; el panel se abrió en Playwright y la búsqueda y el botón «Más filtros» midieron 32 px de alto. A 767 px los controles se apilaron.

Capturas de Filter bar: [antes](revision-paginas-capturas/filter-bar-antes.png) · [después](revision-paginas-capturas/filter-bar-despues.png) · [panel abierto](revision-paginas-capturas/filter-bar-panel-abierto.png) · [767 px](revision-paginas-capturas/filter-bar-movil.png).

### Páginas de formulario y carga

**Textarea** ya tenía título con versión, alternativa clara, selector de estado, notas fuera de la caja, un ejemplo por estado y tabla de propiedades. No necesité cambiarla. Capturas: [antes](revision-paginas-capturas/textarea-antes.png) · [después](revision-paginas-capturas/textarea-despues.png).

**Form field** usaba «Mensaje» como control y explicaciones fijas, sin sección de estados. Lo cambié a «Estado», vinculé las notas al estado elegido y agregué cajas para por defecto, ayuda, error y requerido, con selector de tamaño en cada una. Capturas: [antes](revision-paginas-capturas/form-field-antes.png) · [después](revision-paginas-capturas/form-field-despues.png).

**Skeleton** explicaba las variantes en el playground, pero no tenía una caja por forma. Agregué estados separados de texto, rectángulo y círculo; conservé los casos de tarjeta y tabla. Capturas: [antes](revision-paginas-capturas/skeleton-antes.png) · [después](revision-paginas-capturas/skeleton-despues.png).

### Páginas de datos y paneles

**Column manager** tenía controles útiles, pero carecía de estados y caso de uso. Agregué «Estado» al playground, cajas para vista predeterminada, personalizada y deshabilitada, tamaño por caja y el ejemplo de una matriz configurable. Capturas: [antes](revision-paginas-capturas/column-manager-antes.png) · [después](revision-paginas-capturas/column-manager-despues.png).

**Fleet unit list** mostraba selección y fijados solo como datos del playground. Agregué estados separados, incluido una fila deshabilitada, y el caso del panel lateral de un mapa. Capturas: [antes](revision-paginas-capturas/fleet-unit-list-antes.png) · [después](revision-paginas-capturas/fleet-unit-list-despues.png).

**Side drawer** tampoco importaba los estilos compartidos: sus tablas se veían sin estructura. Añadí esa importación y cajas para detalle, formulario y superficie de lienzo. Abrí el cajón y lo cerré con Escape en Playwright. Capturas: [antes](revision-paginas-capturas/side-drawer-antes.png) · [después](revision-paginas-capturas/side-drawer-despues.png).

### Secciones nuevas

**Toast** agrupaba todas las variantes en una caja; las notas de apariencia y descarte no respondían al estado elegido, y la región era un ejemplo suelto. Separé las variantes, añadí casos para apariencia sólida, sutil y descarte, y puse la región dentro de DemoShell. El aviso regional apareció al pulsar «Mostrar aviso». Capturas: [antes](revision-paginas-capturas/toast-antes.png) · [después](revision-paginas-capturas/toast-despues.png).

**Modal** solo explicaba la superficie en una nota del playground. Añadí notas del estado elegido y dos cajas propias para superficie blanca y de lienzo. La apertura del modal se verificó en Playwright. Capturas: [antes](revision-paginas-capturas/modal-antes.png) · [después](revision-paginas-capturas/modal-despues.png).

## Límites y verificación

Por el cambio de alcance, no revisé ni modifiqué `src/app/pages/table-demo` ni `projects/comsatel-ds/src/lib/table`. Tampoco modifiqué la API de la librería. No confirmé bugs del componente Filter bar ni de los otros componentes revisados; por eso no hay correcciones de librería pendientes en este reporte.

Ejecuté `npm run docs` (0 guías regeneradas), `npm run check:docs` (0 fallas), `npx ngc -p tsconfig.app.json --noEmit` (sin errores) y `npm run test:ci` (12 pruebas aprobadas). Las capturas se tomaron con Chromium headless aislado en el puerto 4301.

¿Qué diferencia hay entre el contador de «Más filtros» y la aparición de «Limpiar filtros»?
