# Resultados de la prueba de puntos de entrada (2026-09-29)

Medido con el sitio en producción (`npx ng build comsatel-ds-angular --configuration production --stats-json`), bytes de la librería en `main` según `bytesInOutput` de `dist/comsatel-ds/fesm2022/*`.

| Variante | Librería en main | Total inicial |
| :-- | --: | --: |
| Antes (un solo FESM) | 626.634 B | 1,03 MB |
| Subpaths construidos, shell importando desde la raíz | 626.731 B | 1,03 MB |
| Shell importando `Icon` de `/icons` y `PressScale` de `/motion` | 28.726 B | 530,21 kB |

**Qué se aprendió:**
- ng-packagr exige que los fuentes estén dentro de la carpeta de la entrada (error TS6059 de `rootDir`), así que se movieron con `git mv` a `projects/comsatel-ds/<entrada>/src`.
- El import raíz sigue funcionando (reexporta los subpaths), pero **no ahorra**: el ahorro exige importar desde el subpath.
- Puertas: `check:docs`, `test:ci` 12/12, audit 45/45, `pack:lib` con los 3 subpaths, Storybook compila. Compodoc da 3 errores que ya existían en `main`.

**Pendiente antes de escalar** (validación de Codex): una resolución de tipos más estable que el mapeo de dos destinos en `tsconfig.json`, una regla que prohíba importar desde la raíz dentro de un subpath, verificación del tarball en el workflow de publicación, y medir FleetOperations cambiando solo los imports de su shell.
