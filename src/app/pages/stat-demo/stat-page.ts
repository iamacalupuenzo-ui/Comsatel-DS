import { Component, computed, signal } from '@angular/core';
import { Stat, type StatSize, type StatTrend } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type StatState = 'good' | 'bad' | 'neutral' | 'none';
interface StatDemo { key: StatState; title: string; intro: string; props: string; label: string; value: number; delta: number | null; trend: StatTrend; caption: string }
const STATES: StatDemo[] = [
  { key: 'good', title: 'Sube y es bueno', intro: 'Más órdenes listas para captura es una buena noticia: la variación va en verde.', props: 'trend="up-is-good"', label: 'Listas para captura', value: 42, delta: 5, trend: 'up-is-good', caption: 'vs. hace una semana' },
  { key: 'bad', title: 'Sube y es malo', intro: 'Más órdenes que requieren revisión es una mala noticia: la misma subida va en rojo.', props: 'trend="down-is-good"', label: 'Requieren revisión', value: 12, delta: 3, trend: 'down-is-good', caption: 'vs. hace una semana' },
  { key: 'neutral', title: 'Neutral', intro: 'Cuando subir no es bueno ni malo, como el volumen en trabajo. Una variación de 0 siempre es neutra.', props: 'trend="neutral"', label: 'En trabajo', value: 500, delta: 18, trend: 'neutral', caption: 'vs. hace una semana' },
  { key: 'none', title: 'Sin variación', intro: 'Cifras de monitoreo sin comparación: solo etiqueta, cifra y contexto opcional.', props: '[delta]="null"', label: 'Con GPS', value: 306, delta: null, trend: 'up-is-good', caption: 'Últimos 30 días' },
];

@Component({
  selector: 'app-stat-page',
  imports: [DemoShell, Stat],
  templateUrl: './stat-page.html',
  styleUrl: './stat-page.css',
})
export class StatPage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'good' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: [{ value: 'lg', label: 'lg' }, { value: 'sm', label: 'sm' }], default: 'lg' },
  ];
  protected readonly stateSizeControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: [{ value: 'lg', label: 'lg' }, { value: 'sm', label: 'sm' }], default: 'lg' },
  ];
  protected readonly pgState = signal<StatState>('good');
  protected readonly pgSize = signal<StatSize>('lg');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  private readonly stateSizes = signal<Record<string, StatSize>>({});

  protected onState(s: DemoState): void {
    if (s['state']) this.pgState.set(s['state'] as StatState);
    if (s['size']) this.pgSize.set(s['size'] as StatSize);
  }
  protected sizeOf(key: string): StatSize {
    return this.stateSizes()[key] ?? 'lg';
  }
  protected onStateSize(key: string, s: DemoState): void {
    if (s['size']) this.stateSizes.update((sizes) => ({ ...sizes, [key]: s['size'] as StatSize }));
  }

  protected codeFor(state: StatDemo, size: StatSize): string {
    const attrs = [`label="${state.label}"`, `[value]="${state.value}"`];
    if (state.delta !== null) attrs.push(`[delta]="${state.delta}"`);
    if (state.trend !== 'up-is-good') attrs.push(`trend="${state.trend}"`);
    if (state.caption) attrs.push(`caption="${state.caption}"`);
    if (size !== 'lg') attrs.push(`size="${size}"`);
    return `<cs-stat\n  ${attrs.join('\n  ')}\n/>`;
  }
}
