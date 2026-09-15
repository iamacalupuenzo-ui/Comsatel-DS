# Comsatel Design System para Angular

Repositorio de la biblioteca Angular, el catálogo visual, las guías para
agentes y los controles de calidad del Sistema de Diseño Comsatel. La
aplicación documenta los componentes; el paquete distribuible contiene solo
la API pública de la librería.

## Inicio rápido

```bash
npm ci --legacy-peer-deps
npm run build:lib
npm start -- --port 4300
```

Abre `http://localhost:4300/`. Después de modificar archivos de
`projects/comsatel-ds/`, vuelve a ejecutar `npm run build:lib`; el servidor
de Angular no recompila la librería automáticamente.

## Verificación

Antes de integrar un cambio ejecuta:

```bash
npm run check:docs
npm run build:lib
npm run test:ci
npm run build-storybook
```

`check:docs` valida cobertura de guías, API, accesibilidad, ejemplos y las
notas de versión. El workflow remoto repite esos gates antes de publicar.

## Catálogo desplegado en Vercel

Vercel publica el catálogo visual Angular, no el paquete de componentes. La
configuración versionada en `vercel.json` establece el directorio público real
de Angular (`dist/comsatel-ds-angular/browser`) y redirige las rutas del
catálogo a `index.html` para que enlaces directos como `/components/input`
funcionen tras una recarga.

En el proyecto de Vercel, usa la raíz de este repositorio, el comando de build
`npm run build` y deja que `vercel.json` controle el directorio de salida. Si
el panel tiene un valor anterior en **Output Directory**, elimínalo o cámbialo
a `dist/comsatel-ds-angular/browser` antes de redeplegar.

## Consumir la librería

La distribución privada se publica como
`@iamacalupuenzo-ui/comsatel-ds` en GitHub Packages. Consulta las
[instrucciones de instalación](projects/comsatel-ds/README.md) para
configurar el registro, el token de lectura y las dependencias de pares de
Angular 22.

Si vas a crear una plataforma Angular nueva, sigue la
[guía para aplicaciones consumidoras](docs/consumer-angular.md). Indica cómo
usar una base Angular limpia y la arquitectura de producto sin clonar este
workspace.

## Versiones y publicaciones

Cada versión tiene una nota breve en [docs/releases](docs/releases/README.md).
La nota explica qué cambió, el impacto para las plataformas consumidoras y la
evidencia de verificación. Se crea antes de publicar, con el mismo número que
`projects/comsatel-ds/package.json`.

Para publicar una versión aprobada:

1. Actualiza el número de versión y crea `docs/releases/<versión>.md`.
2. Ejecuta los gates de verificación.
3. Crea y envía el tag `ds-v<versión>`.

GitHub Actions verifica el tag, genera la librería y publica únicamente
`dist/comsatel-ds`. Las aplicaciones consumidoras actualizan su dependencia
y lockfile en un cambio propio; una nueva versión nunca modifica por sí sola
una aplicación desplegada.

## Trabajo asistido

Lee [AGENTS.md](AGENTS.md) antes de modificar una interfaz. Las guías de
`guidelines/` y el servidor MCP describen la API, accesibilidad y patrones
reales del sistema.
