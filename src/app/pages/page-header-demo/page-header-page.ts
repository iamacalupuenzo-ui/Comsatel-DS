import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Button, Icon, PageHeader } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type HeaderState = 'two' | 'one' | 'none' | 'no-desc';
const STATES: { key: HeaderState; title: string; intro: string; props: string }[] = [
  { key: 'two', title: 'Con dos acciones', intro: 'Una principal y una secundaria, como Capturas: «Carga masiva» e «Historial de cargas».', props: 'dos cs-button proyectados' },
  { key: 'one', title: 'Con una acción', intro: 'La acción principal de la pantalla, por ejemplo «Registrar recupero».', props: 'un cs-button primary' },
  { key: 'none', title: 'Sin acciones', intro: 'Pantallas de consulta, como un tablero: solo título y descripción.', props: 'sin contenido proyectado' },
  { key: 'no-desc', title: 'Sin descripción', intro: 'Cuando el título se explica solo. Úsalo poco: la descripción orienta a quien llega por primera vez.', props: 'sin description' },
];

@Component({
  selector: 'app-page-header-page',
  imports: [Button, DemoShell, Icon, NgTemplateOutlet, PageHeader],
  templateUrl: './page-header-page.html',
  styleUrl: './page-header-page.css',
})
export class PageHeaderPage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'two' },
  ];
  protected readonly pgState = signal<HeaderState>('two');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);

  protected onState(s: DemoState): void {
    if (s['state']) this.pgState.set(s['state'] as HeaderState);
  }

  protected codeFor(key: HeaderState): string {
    const desc = key === 'no-desc' ? '' : '\n  description="Consulta y gestiona las órdenes de captura registradas para las unidades."';
    const actions = key === 'two'
      ? '\n  <cs-button variant="default" size="sm">Historial de cargas</cs-button>\n  <cs-button variant="primary" size="sm">Carga masiva de capturas</cs-button>\n'
      : key === 'one' ? '\n  <cs-button variant="primary" size="sm">Carga masiva de capturas</cs-button>\n' : '';
    return `<cs-page-header\n  titleId="capture-title"\n  title="Capturas"${desc}\n>${actions}</cs-page-header>`;
  }
}
