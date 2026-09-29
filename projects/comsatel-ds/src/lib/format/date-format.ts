/**
 * Formato único de fecha y hora del sistema: «27 sep. 2026», «16:56» y
 * «27 sep. 2026, 16:56». Mes abreviado en letras (evita confundir día y mes)
 * y reloj de 24 horas (más corto y sin «a. m.»).
 *
 * No usa Intl a propósito: cada locale y cada versión del navegador devuelve
 * algo distinto («sept», «set.», «sep», «4:56 p. m.»). La tabla fija da el
 * mismo texto en todos lados.
 */
const MONTHS = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];

export type DateInput = Date | string | number;

/**
 * Convierte a Date. Una fecha sola ('2026-09-27') se lee en horario local:
 * `new Date('2026-09-27')` la tomaría como UTC y en Perú mostraría el día
 * anterior. Devuelve null si el valor no es una fecha válida.
 */
export function toDate(value: DateInput | null | undefined): Date | null {
  if (value === null || value === undefined || value === '') return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === 'string') {
    const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnly) return new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** «27 sep. 2026». Vacío si el valor no es una fecha. */
export function formatDate(value: DateInput | null | undefined): string {
  const date = toDate(value);
  if (!date) return '';
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** «16:56» (24 h). Vacío si el valor no es una fecha. */
export function formatTime(value: DateInput | null | undefined): string {
  const date = toDate(value);
  if (!date) return '';
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** «27 sep. 2026, 16:56». Vacío si el valor no es una fecha. */
export function formatDateTime(value: DateInput | null | undefined): string {
  const date = toDate(value);
  if (!date) return '';
  return `${formatDate(date)}, ${formatTime(date)}`;
}

/** «27 sep.»: día y mes, para rangos del mismo año o ejes de gráficos. */
export function formatDayMonth(value: DateInput | null | undefined): string {
  const date = toDate(value);
  if (!date) return '';
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/**
 * Tiempo relativo para avisos recientes: «Ahora», «Hace 5 min», «Hace 2 h».
 * Desde las 24 horas pasa a la fecha y hora del sistema, porque «Hace 30 h»
 * se lee peor que una fecha. `now` se pasa para que la pantalla lo refresque.
 */
export function formatRelativeTime(value: DateInput | null | undefined, now: DateInput = Date.now()): string {
  const date = toDate(value);
  const reference = toDate(now);
  if (!date || !reference) return '';
  const seconds = Math.max(0, Math.round((reference.getTime() - date.getTime()) / 1000));
  if (seconds < 60) return 'Ahora';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Hace ${hours} h`;
  return formatDateTime(date);
}
