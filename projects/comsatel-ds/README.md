# @iamacalupuenzo-ui/comsatel-ds

Biblioteca Angular del Sistema de Diseño Comsatel. El paquete contiene los
componentes, tokens y utilidades públicos; las páginas de documentación y
Storybook permanecen en el repositorio principal.

## Instalarla en otra plataforma

Cada proyecto consumidor configura una vez el registro privado y autentica su
instalación con un token clásico de GitHub con permiso `read:packages`.
Ese es el único permiso requerido para consumir el paquete: un proyecto consumidor
no necesita ni debe solicitar alcance `repo` para leer el código privado del
sistema de diseño. Nunca se debe versionar el token.

```ini
# .npmrc del proyecto consumidor
@iamacalupuenzo-ui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

```bash
npm install @iamacalupuenzo-ui/comsatel-ds@0.1.4
```

El proyecto debe usar Angular 22, que es una dependencia de pares de la
librería. Importa únicamente los componentes que necesita; el bundler elimina
las exportaciones que no se usan.

```ts
import { Button } from '@iamacalupuenzo-ui/comsatel-ds';

@Component({
  imports: [Button],
  template: '<cs-button variant="primary">Guardar</cs-button>',
})
export class ExampleComponent {}
```

## Marca C-Flotas

El paquete exporta el wordmark C-Flotas by Comsatel y el isotipo C-FL como un
componente accesible y auto-contenido. Usa el wordmark cuando identifica el
producto y el isotipo solo en espacios compactos donde el nombre ya es
evidente.

```ts
import { CFlotasLogo } from '@iamacalupuenzo-ui/comsatel-ds';

@Component({
  imports: [CFlotasLogo],
  template: '<cs-c-flotas-logo size="md" />',
})
export class ProductHeaderComponent {}
```

Para el isotipo: `<cs-c-flotas-logo variant="isotype" />`. Los nombres y
valores antiguos `CLocaterFlotasLogo`, `cs-c-locater-flotas-logo`, `full` e
`icon` se mantienen solo para compatibilidad de instalaciones previas.

Para una imagen decorativa junto a un nombre visible, usa
`[decorative]="true"`; no repite el nombre al lector de pantalla.

## Contraseña con visibilidad

La librería exporta `PasswordInput` para este caso. Encapsula el grupo, el botón
nativo de ícono y el comportamiento accesible de mostrar u ocultar la contraseña.
La aplicación mantiene el valor, la validación y los mensajes de error.

```ts
import { PasswordInput } from '@iamacalupuenzo-ui/comsatel-ds';
```

```html
<cs-password-input
  id="login-password"
  name="password"
  autocomplete="current-password"
  [value]="password"
  (valueChange)="password = $event"
></cs-password-input>
```

No reconstruyas el control con `InputGroup` ni uses `cs-button` dentro del
addon. El caso de correo, en cambio, sigue siendo el componente genérico
`cs-input type="email"` con `autocomplete="email"`.

## Cargar estilos públicos

Importa una sola vez el punto de entrada público desde `src/styles.css` (o
decláralo en el arreglo `styles` de `angular.json`):

```css
@import '@iamacalupuenzo-ui/comsatel-ds/styles.css';
```

Incluye las fuentes oficiales Manrope y Public Sans, además de los tokens de
color, tipografía, espaciado, radios, sombras, movimiento y temas. No incluye
resets, estilos de demos ni CSS de una aplicación de producto.

## Publicar una versión

La publicación la realiza GitHub Actions, no una máquina local. Se actualiza
la versión en `package.json`, se crea `docs/releases/<versión>.md`, se valida
el cambio y se crea un tag con el formato `ds-v<versión>` (por ejemplo,
`ds-v0.1.1`). La [plantilla de notas de versión](https://github.com/iamacalupuenzo-ui/Comsatel-DS/tree/main/docs/releases)
exige un resumen, los cambios, el impacto para consumidores y la verificación.
El workflow comprueba esa nota, compila la librería, ejecuta los gates de
documentación, los tests unitarios y Storybook antes de publicar el contenido
de `dist/comsatel-ds` en GitHub Packages.

Las plataformas consumidoras no reciben cambios en ejecución. Adoptan una
nueva versión al actualizar su dependencia y lockfile en un cambio revisable,
probarla y desplegarla como parte de su propio ciclo de entrega.

Para construir una aplicación Angular consumidora sin clonar este workspace,
consulta la [guía de arquitectura de aplicación](https://github.com/iamacalupuenzo-ui/Comsatel-DS/blob/main/docs/consumer-angular.md).
