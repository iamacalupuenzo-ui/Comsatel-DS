¿Qué cambió al agregar los primitivos de color?

## En 30 segundos

Se añadieron 109 primitivos literales, sin remapear roles. La instantánea de 212 roles en claro, oscuro y glass quedó idéntica antes y después.

## Resultado

Los valores existentes se agruparon por tono y se ubicaron en el paso 050–950 más cercano por luminosidad. La paleta secundaria ya contenía sus 11 valores, por eso no se duplicó.

Cantidad de primitivos nuevos: brand 20; gray 33; danger 11; success 11; warning 11; overlay 9; blue, lime, orange, pink, purple, teal y yellow 2 cada uno. Total: 109.

Pasos con sufijo por coincidencia de luminosidad:

- brand: 100a, 100b, 200a, 200b, 200c, 400a, 400b, 500a, 700a, 800a, 900a.
- gray: 050a, 050b, 100a, 100b, 100c, 300a, 400a, 400b, 400c, 400d, 500a, 500b, 600a, 600b, 600c, 600d, 600e, 700a, 700b, 800a, 800b, 900a, 900b.
- danger: 100a, 600a; success: 100a, 700a, 800a; warning: 400a, 600a.
- overlay: 050a, 050b, 500a, 950a, 950b, 950c; yellow: 500a.

Verificación: SHA-256 de ambas instantáneas idéntico. Hash del commit local: `git rev-parse HEAD` desde este repositorio; un commit no puede contener su propio hash literal.

## Pregunta de comprobación

¿Cambió el valor final de algún rol de color en los tres contextos?

## Listo 0a
