import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Tag, Timeline, TimelineItem } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type TimelineState = 'history' | 'single' | 'content';
const STATES: { key: TimelineState; title: string; intro: string; props: string }[] = [
  { key: 'history', title: 'Historial con paso actual', intro: 'Del más antiguo al más reciente. El último es el estado vigente y se marca con current.', props: '[current]="true" en el último paso' },
  { key: 'single', title: 'Un solo paso', intro: 'Un registro recién creado: su historial tiene solo la creación, sin línea.', props: 'un csTimelineItem' },
  { key: 'content', title: 'Con contenido extra', intro: 'Un paso puede llevar contenido proyectado debajo, por ejemplo el estado nuevo como Tag.', props: 'contenido proyectado en csTimelineItem' },
];

@Component({
  selector: 'app-timeline-page',
  imports: [DemoShell, NgTemplateOutlet, Tag, Timeline, TimelineItem],
  templateUrl: './timeline-page.html',
  styleUrl: './timeline-page.css',
})
export class TimelinePage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'history' },
  ];
  protected readonly pgState = signal<TimelineState>('history');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);

  protected onState(s: DemoState): void {
    if (s['state']) this.pgState.set(s['state'] as TimelineState);
  }

  protected codeFor(key: TimelineState): string {
    if (key === 'single') return '<ol csTimeline aria-label="Historial de la orden">\n  <li csTimelineItem title="Creación" time="27 sep. 2026, 10:42" description="Carga masiva de MAF." [current]="true"></li>\n</ol>';
    const extra = key === 'content' ? '\n    <cs-tag value="Observado" severity="danger" [rounded]="true" size="sm" />\n  ' : '';
    return `<ol csTimeline aria-label="Historial de la orden">\n  <li csTimelineItem title="Creación" time="27 sep. 2026, 10:42" description="Carga masiva de MAF."></li>\n  <li csTimelineItem title="Cambio de estado" time="28 sep. 2026, 09:15" description="Falta el oficio firmado." [current]="true">${extra}</li>\n</ol>`;
  }
}
