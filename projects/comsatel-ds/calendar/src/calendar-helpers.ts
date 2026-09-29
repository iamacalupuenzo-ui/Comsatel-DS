// Helpers puros de fecha para Calendar — puerto 1:1 de la lógica de
// calendar.tsx (React), sin el mecanismo de locale: acá el idioma siempre
// es español (ver "Sin i18n" en page-pattern.md), así que weekdayLabels y
// monthYearLabel usan 'es' fijo en vez de leer un locale activo.
export interface DayCellData {
  date: Date;
  iso: string;
  day: number;
  inCurrentMonth: boolean;
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Siempre 6 semanas (42 celdas) para que la grilla no cambie de alto entre
 * meses de 5 y 6 semanas. */
export function buildWeeks(year: number, month: number, weekStartDay: 0 | 1): DayCellData[][] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const offset = (firstOfMonth.getDay() - weekStartDay + 7) % 7;
  const gridStart = new Date(year, month - 1, 1 - offset);

  const cells: DayCellData[] = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return {
      date,
      iso: toISODate(date),
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === month - 1,
    };
  });

  const weeks: DayCellData[][] = [];
  for (let i = 0; i < 42; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function weekdayLabels(weekStartDay: 0 | 1): string[] {
  const fmt = new Intl.DateTimeFormat('es', { weekday: 'short' });
  // 2023-01-01 es domingo — ancla estable para derivar cualquier día de la semana.
  const base = new Date(2023, 0, 1 + weekStartDay);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const label = fmt.format(d).replace('.', '');
    return label.charAt(0).toUpperCase() + label.slice(1);
  });
}

export function monthYearLabel(year: number, month: number): string {
  const fmt = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' });
  const label = fmt.format(new Date(year, month - 1, 1));
  return label.charAt(0).toUpperCase() + label.slice(1);
}
