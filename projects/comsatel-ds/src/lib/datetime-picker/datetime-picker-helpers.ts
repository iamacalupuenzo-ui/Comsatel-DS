// Helpers puros de fecha/hora para DateTimePicker — puerto 1:1 de
// datetime-picker.tsx, sin el mecanismo de locale (siempre español, ver
// "Sin i18n" en page-pattern.md): formatDateDisplay y parseTypedDate usan
// el orden día/mes fijo, no lo derivan de un locale activo.
export function splitValue(value?: string): { dateIso?: string; time?: string } {
  if (!value) return {};
  const [dateIso, time] = value.split('T');
  return { dateIso: dateIso || undefined, time: time || undefined };
}

export function combineValue(dateIso?: string, time?: string): string {
  if (!dateIso) return '';
  return time ? `${dateIso}T${time}` : dateIso;
}

// year: "numeric" a propósito, no un año de 2 dígitos — evita la
// ambigüedad de un año corto ("18/2/26" en vez de "18/2/2026").
export function formatDateDisplay(dateIso: string | undefined): string {
  if (!dateIso) return '';
  const fmt = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'numeric', year: 'numeric' });
  return fmt.format(new Date(`${dateIso}T00:00:00`));
}

/** Interpreta lo que el usuario escribe con el mismo orden día/mes que ya
 * usa formatDateDisplay, así el texto mostrado y el que se puede volver a
 * escribir son siempre consistentes. Acepta '/', '-' o '.' como separador;
 * el año de 2 dígitos también se acepta al escribir (se asume 20XX).
 * Devuelve undefined si el texto no forma una fecha real (incluye "31/02" —
 * no solo valida el rango 1-31 de cada parte por separado). */
export function parseTypedDate(text: string): string | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  const parts = trimmed.split(/[/\-.]/).map((p) => p.trim()).filter(Boolean);
  if (parts.length !== 3) return undefined;
  const nums = parts.map(Number);
  if (nums.some((n) => Number.isNaN(n))) return undefined;
  let [day, month, year] = nums;
  if (year < 100) year += 2000;
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;
  const candidate = new Date(year, month - 1, day);
  if (candidate.getFullYear() !== year || candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
    return undefined;
  }
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

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
