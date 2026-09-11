// Fórmula compartida entre Radio real y el glyph de radio dentro de
// DropdownItem (selectionMode="radio") — antes eran dos implementaciones
// separadas que "coincidían" a ojo; con esto quedan atadas al mismo código
// para que nunca vuelvan a divergir (mismo criterio que radioDotSize en la
// referencia React).
//
// El punto interior a propósito NO es "ringSize * 0.5" tal cual: con un
// ringSize par pero mitad impar (14→7, 18→9) el punto queda descentrado,
// porque un hijo de ancho impar dentro de un padre de ancho par deja un
// resto de 0.5px que el navegador redondea hacia un solo lado (visible
// incluso a este tamaño chico). Ajustando al entero par más cercano el
// resto siempre se reparte igual a ambos lados.
export function radioDotSize(ringSize: number, ratio = 0.5): number {
  let d = Math.round(ringSize * ratio);
  if ((ringSize - d) % 2 !== 0) d += 1;
  return d;
}
