# Consumir Comsatel DS desde una aplicación Angular

Esta guía es para construir una aplicación de producto con Comsatel DS, no
para extender este repositorio. El catálogo, las demos y los scripts de este
workspace no se copian ni se clonan dentro de una plataforma consumidora.

## 1. Elegir el destino correcto

- Si la aplicación ya existe, trabaja en su repositorio y conserva su
  arquitectura, rutas y configuración.
- Si no existe una aplicación, crea una base Angular limpia. No uses este
  repositorio como plantilla de una app de negocio:

  ```bash
  npx @angular/cli@22 new mi-plataforma --routing --style css --standalone --strict --skip-git
  cd mi-plataforma
  ```

La librería se instala como dependencia después de que se publique una
versión. El repositorio del Design System se consulta para las guías, no se
convierte en una dependencia por URL de Git.

## 2. Instalar una versión concreta

Configura el registro privado y un token clásico de GitHub con `read:packages`
como variable de entorno segura:

```ini
# .npmrc de la aplicación
@iamacalupuenzo-ui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

```bash
npm install @iamacalupuenzo-ui/comsatel-ds@0.1.0
```

No uses un rango automático para la primera adopción. Actualiza la versión y
el lockfile mediante un PR, valida la aplicación y recién después despliega.

## 3. Estructura recomendada

Esta es una arquitectura de aplicación, no una API que deba exportar la
librería:

```text
src/app/
  core/
    auth/                 # sesión, cliente de autenticación, guards
  layout/
    app-shell/            # header, navegación y área de contenido autenticada
  features/
    auth/
      login/              # página, ruta, validación y estados del login
      recover-password/   # flujo independiente, si existe
    fleet/                # ejemplos de dominios de producto
  shared/                 # utilidades exclusivas de la aplicación
  app.routes.ts
```

`features/auth/login` compone componentes de la librería. No copia sus
fuentes ni crea sustitutos locales de `Input`, `Button`, `Checkbox`, `Banner`
o `AppLayout`.

## 4. Patrón inicial de login B2B

Para una plataforma de operación profesional, empieza con una pantalla de
acceso de administrador: identidad de marca, correo, contraseña, acción
principal, recuperación de contraseña, error claro y enlace de soporte. SSO,
registro público, selección de organización o campos específicos de un rol
solo se agregan si el producto los requiere.

El login es una composición de producto dentro de `features/auth`, no un
componente nuevo de `@iamacalupuenzo-ui/comsatel-ds`. Cuando dos o más
plataformas reutilicen exactamente la misma estructura y contrato, evalúa
crear una plantilla en un repositorio independiente `comsatel-angular-starter`.
No la agregues prematuramente a la librería de componentes.

## 5. Instrucción para un agente

```text
Trabaja en el repositorio de la aplicación destino, no en el repositorio de
Comsatel DS. Usa @iamacalupuenzo-ui/comsatel-ds como dependencia instalada.

Lee AGENTS.md y las guías del Design System antes de construir UI. Crea la
pantalla dentro de src/app/features/auth/login y respeta la estructura core,
layout y features existente. Compón con los componentes públicos del sistema;
no clones, copies ni modifiques el proyecto Comsatel-DS y no copies estilos o
código de productos de referencia.

Para un login, usa Input, Button, Checkbox y Banner existentes cuando apliquen.
Implementa estados de validación, envío, error y foco accesible. Antes de
cerrar, ejecuta los tests y build definidos por la aplicación destino.
```

## 6. Cuándo crear una plantilla real

Crea un starter Angular separado solo cuando haya al menos dos consumidores
que repitan el mismo bootstrap, configuración y estructura de rutas. Ese
starter debe tener su propio repositorio, versión, CI y contrato de soporte;
no debe publicarse dentro del paquete de componentes ni mezclar demos del
Design System con código de negocio.
