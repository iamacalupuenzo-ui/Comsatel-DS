// Mismo generador que datetime-picker-helpers.ts (options de hora cada
// `step` minutos) — duplicado a propósito en vez de importado: son ~10
// líneas y mantener este componente sin depender de datetime-picker.ts
// (pensado para el caso de un solo datetime) evita que un cambio ahí rompa
// silenciosamente el caso de rango.
export interface TimeOption {
  value: string;
  label: string;
}

export function generateTimeOptions(step: number): TimeOption[] {
  const fmt = new Intl.DateTimeFormat('es', { hour: 'numeric', minute: '2-digit' });
  const options: TimeOption[] = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += step) {
    const hh = Math.floor(minutes / 60);
    const mm = minutes % 60;
    const value = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    options.push({ value, label: fmt.format(new Date(2020, 0, 1, hh, mm)) });
  }
  return options;
}

export function formatRangeDisplay(startDate: string | undefined, endDate: string | undefined): string {
  if (!startDate) return '';
  const fmtFull = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', year: 'numeric' });
  const fmtDay = new Intl.DateTimeFormat('es', { day: 'numeric' });
  if (!endDate || endDate === startDate) return fmtFull.format(new Date(`${startDate}T00:00:00`));
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  return sameMonth ? `${fmtDay.format(start)}–${fmtFull.format(end)}` : `${fmtFull.format(start)} – ${fmtFull.format(end)}`;
}
