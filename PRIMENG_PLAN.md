# Decisión final — motor de comportamiento/accesibilidad en Comsatel-DS-Angular

**Decisión (2026-09-09, cierra la evaluación abierta el mismo día):** PrimeNG **no entra como dependencia de
producción** en ningún proyecto. Todo componente de Angular se construye a mano, incluidos los que necesitan un
motor de comportamiento/accesibilidad complejo (Modal, y lo que siga: Menu, Toast, Table con selección). El
detalle de comportamiento/accesibilidad para esos casos vive en
`D:\Investigacion\Skills\e-skills\skills\comsatel-design-system\references\accessibility-patterns.md` — ese
archivo es la referencia real para construirlos, este documento es el historial de cómo se llegó a la decisión.

Contraparte en el skill: `references/component-inventory.md` apunta acá y a `accessibility-patterns.md`.
Contraparte en React: `Sistema-de-dise-o-Comsatel/COMPONENT_GAPS.md` también apunta acá.

---

## Por qué se descartó PrimeNG — resumen de la evaluación

1. **Piloto técnico exitoso** — se construyó `cs-modal` envolviendo `p-dialog` en modo `unstyled` + Pass
   Through, verificado en navegador: funcionaba, y nuestro propio `<cs-button>` hand-built componía sin
   fricción dentro del footer de `p-dialog`. La arquitectura era viable — el motivo del descarte no fue
   técnico.
2. **Licenciamiento — el motivo real.** PrimeNG 22 (la versión que instala `npm install primeng` por defecto)
   cambió a licencia comercial:
   - Community (gratis) requiere elegibilidad — menos de 5 desarrolladores, menos de 10 empleados, menos de
     $1M de ingresos anuales — y tiene tope de 4 desarrolladores incluso calificando. Comsatel tiene 15+
     desarrolladores: no califica.
   - Comercial: $599-799 por desarrollador (precio de lanzamiento), o licencia de Sitio (cotizar).
   - **Envolver PrimeNG dentro de un sistema de diseño propio NO exime a los desarrolladores que lo consuman
     después** — confirmado con la propia FAQ de PrimeUI: "Any developer who builds applications on top of
     your internal wrapper... needs a seat, because the wrapper contains PrimeUI... This applies even if those
     developers never import PrimeUI directly."
   - Alternativa real evaluada: PrimeNG 21 (última versión MIT, verificado leyendo el `LICENSE.md` real
     empaquetado en el tarball de npm) se queda gratis para siempre — pero exige `@angular/core: ^21.0.7`,
     incompatible con Angular 22 (lo que corre este proyecto). No hay combinación limpia.
3. **Ya teníamos la capacidad de resolverlo solos** — la misma sesión ya había construido en React, a mano,
   sin ninguna librería externa: Modal (focus trap, scroll lock, portal), Popover (colisión + volteo
   automático), Stepper (animación orquestada), Accordion. El argumento de "PrimeNG resuelve lo difícil que no
   podemos resolver nosotros" no aplicaba — ya estaba resuelto.
4. **Uso de PrimeNG como referencia, no como dependencia** — sigue siendo válido consultar su documentación
   pública/tipos TypeScript (qué capacidades tiene un buen Modal: focus trap, `closeOnEscape`,
   `dismissableMask`, etc.) igual que se usa React como referencia estructural — nunca copiar su código de
   implementación real, nunca instalar el paquete. El patrón de accesibilidad en sí (WAI-ARIA Dialog pattern)
   es un estándar público, no propiedad de PrimeNG.

## Qué se hizo al revertir

- `npm uninstall primeng` en el workspace.
- `primeng` removido de `dependencies` en `projects/comsatel-ds/package.json`.
- `allowedNonPeerDependencies` removido de `ng-package.json`.
- `providePrimeNG(...)` removido de `src/app/app.config.ts`.
- `cs-modal` reconstruido 100% a mano — ver `projects/comsatel-ds/src/lib/modal/`. Motor propio: portal vía
  `Renderer2.appendChild(document.body, ...)`, foco atrapado manual (ciclo Tab/Shift+Tab sobre los elementos
  focusables del panel), restauración de foco al cerrar, bloqueo de scroll, cierre con Escape y clic afuera.
- **Bug real encontrado y corregido en el camino:** esta app Angular corre sin `zone.js` (zoneless por
  defecto en Angular 22 — no está en `package.json`). Las transiciones de entrada/salida usaban propiedades
  planas mutadas dentro de un `setTimeout` — la vista nunca se actualizaba porque nada le avisaba a Angular
  que había cambiado algo fuera de una pasada de detección de cambios ya en curso. Se corrigió usando
  `signal()` en vez de propiedades planas para `rendered`/`visible` — un `signal()` notifica a Angular sin
  importar si la mutación viene de un evento ligado por Angular o de un timer suelto. Documentado en detalle
  en `accessibility-patterns.md` porque es un problema que va a repetirse en cualquier componente futuro con
  animación de entrada/salida construida a mano.

## Vigente para todo lo que se construya de acá en adelante

- Ningún componente Angular instala PrimeNG ni ninguna otra librería de UI de terceros.
- Para componentes con comportamiento complejo (Menu, Toast, Table con selección, lo que siga), usar
  `accessibility-patterns.md` como guía de construcción — mismo patrón que ya se aplicó en Modal.
- React sigue siendo la referencia estructural de qué construir (secciones de página, props, edge cases ya
  resueltos) — nunca de valores de token ni de la implementación de comportamiento en sí, que se arma nueva en
  cada plataforma según su propio motor (React usa `motion/react` y `createPortal`; Angular usa `Renderer2`,
  `signal()`, y CSS/`@HostListener` a mano).
