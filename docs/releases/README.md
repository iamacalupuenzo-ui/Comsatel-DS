# Notas de versión

Cada versión publicable de `@iamacalupuenzo-ui/comsatel-ds` tiene un archivo
`<versión>.md` en esta carpeta. La nota se crea en el mismo cambio que altera
`projects/comsatel-ds/package.json`; el gate `npm run check:release-notes`
impide publicar si no existe.

Usa esta estructura breve:

```markdown
# Comsatel DS vX.Y.Z

Estado: Preparada para publicarse

## Resumen

Una o dos frases con el resultado de la versión.

## Cambios

- Cambio relevante para quien consume o mantiene la librería.

## Impacto para consumidores

- Compatibilidad, migración o confirmación explícita de que no hay cambios incompatibles.

## Verificación

- Gates ejecutados y evidencia relevante.
```

Evita listar cada archivo interno. Si existe un cambio incompatible, indícalo
al inicio de la sección de impacto, añade el paso de migración y considera una
versión mayor conforme a SemVer.
