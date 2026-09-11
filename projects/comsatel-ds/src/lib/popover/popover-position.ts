export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverPlacement = PopoverSide | `${PopoverSide}-start` | `${PopoverSide}-end`;

export interface PopoverRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface PanelSize {
  width: number;
  height: number;
}

// Mide el panel real (no una estimación) y voltea de lado cuando no entra,
// en vez de salirse de la pantalla. Algoritmo puro — sin dependencias de
// Angular ni de tokens, se puede probar aislado.
export function computePopoverPosition(
  trigger: PopoverRect,
  panel: PanelSize,
  placement: PopoverPlacement,
  offset: number,
): { top: number; left: number } {
  const [side, align = 'center'] = placement.split('-') as [PopoverSide, PopoverAlign?];
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const margin = 8;

  function place(activeSide: PopoverSide): { top: number; left: number } {
    let top = 0;
    let left = 0;
    if (activeSide === 'top') top = trigger.top - panel.height - offset;
    if (activeSide === 'bottom') top = trigger.top + trigger.height + offset;
    if (activeSide === 'left') left = trigger.left - panel.width - offset;
    if (activeSide === 'right') left = trigger.left + trigger.width + offset;

    if (activeSide === 'top' || activeSide === 'bottom') {
      left =
        align === 'start'
          ? trigger.left
          : align === 'end'
            ? trigger.left + trigger.width - panel.width
            : trigger.left + trigger.width / 2 - panel.width / 2;
    } else {
      top =
        align === 'start'
          ? trigger.top
          : align === 'end'
            ? trigger.top + trigger.height - panel.height
            : trigger.top + trigger.height / 2 - panel.height / 2;
    }
    return { top, left };
  }

  let activeSide = side;
  let pos = place(activeSide);

  // Voltear al lado opuesto si no entra en el eje principal.
  if (activeSide === 'bottom' && pos.top + panel.height > viewportH - margin && trigger.top - panel.height - offset >= margin) {
    activeSide = 'top';
  } else if (activeSide === 'top' && pos.top < margin && trigger.top + trigger.height + offset + panel.height <= viewportH - margin) {
    activeSide = 'bottom';
  } else if (activeSide === 'right' && pos.left + panel.width > viewportW - margin && trigger.left - panel.width - offset >= margin) {
    activeSide = 'left';
  } else if (activeSide === 'left' && pos.left < margin && trigger.left + trigger.width + offset + panel.width <= viewportW - margin) {
    activeSide = 'right';
  }
  if (activeSide !== side) pos = place(activeSide);

  // Fijar dentro del viewport en el eje cruzado (nunca voltea, solo se acomoda).
  pos.left = Math.min(Math.max(pos.left, margin), Math.max(margin, viewportW - panel.width - margin));
  pos.top = Math.min(Math.max(pos.top, margin), Math.max(margin, viewportH - panel.height - margin));

  return pos;
}
