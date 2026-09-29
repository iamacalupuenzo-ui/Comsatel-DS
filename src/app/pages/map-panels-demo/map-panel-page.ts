import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MapPanel } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { DEMO_UNITS } from './map-demo-data';
import { MapFullDemo } from './map-full-demo';

type PanelState = 'open' | 'collapsed' | 'badge' | 'scroll' | 'empty';
interface PanelDemo { key: PanelState; title: string; intro: string; props: string; open: boolean; badge: number | null; items: number }
const STATES: PanelDemo[] = [
  { key: 'open', title: 'Abierto', intro: 'El panel crece con su contenido hasta el alto que le da la pantalla. Si el contenido es corto, el panel también.', props: '[open]="true"', open: true, badge: null, items: 2 },
  { key: 'collapsed', title: 'Contraído', intro: 'Queda una píldora de 48 px con el encabezado. El cuerpo no recibe foco de teclado mientras está contraído.', props: '[open]="false"', open: false, badge: null, items: 2 },
  { key: 'badge', title: 'Con contador', intro: 'El contador rojo se ve también contraído, para no perder de vista que hay algo pendiente. Desde 100 muestra «99+».', props: '[badge]="3" badgeDescription="3 avisos pendientes"', open: false, badge: 3, items: 3 },
  { key: 'scroll', title: 'Con más contenido', intro: 'Cuando el contenido no entra, el scroll es interno y sin barra: un chevrón al pie avisa que hay más abajo.', props: '[open]="true"', open: true, badge: null, items: 6 },
  { key: 'empty', title: 'Vacío', intro: 'Sin contenido, el panel se achica a un mensaje corto. El texto lo escribe la pantalla.', props: '[open]="true"', open: true, badge: null, items: 0 },
];

@Component({
  selector: 'app-map-panel-page',
  imports: [DemoShell, MapFullDemo, MapPanel, NgTemplateOutlet],
  templateUrl: './map-panel-page.html',
  styleUrls: ['./map-demo.css', './map-panel-page.css'],
})
export class MapPanelPage {
  protected readonly states = STATES;
  protected readonly units = DEMO_UNITS;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'open' },
  ];
  protected readonly pgState = signal<PanelState>('open');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  // El playground es interactivo: el chevrón cambia esto sin tocar el selector.
  protected readonly pgOpen = signal(true);
  private readonly stateOpen = signal<Record<string, boolean>>({});
  protected readonly activePanel = signal<'a' | 'b' | null>('a');
  protected readonly mobileCode = `<!-- La pantalla recuerda cuál está abierto; abrir uno contrae el otro. -->
<cs-map-panel label="Buscar unidades" [open]="active() === 'search'" (openChange)="active.set($event ? 'search' : null)">…</cs-map-panel>
<cs-map-panel label="Notificaciones" [open]="active() === 'alerts'" (openChange)="active.set($event ? 'alerts' : null)">…</cs-map-panel>`;

  protected onState(s: DemoState): void {
    if (s['state']) {
      this.pgState.set(s['state'] as PanelState);
      this.pgOpen.set(this.pgInfo().open);
    }
  }
  protected isOpen(state: PanelDemo): boolean {
    return this.stateOpen()[state.key] ?? state.open;
  }
  protected setOpen(state: PanelDemo, open: boolean): void {
    this.stateOpen.update((all) => ({ ...all, [state.key]: open }));
  }

  protected codeFor(state: PanelDemo): string {
    const attrs = ['label="Unidades en seguimiento"', 'title="Seguimiento"', 'icon="eye"', '[(open)]="open"'];
    if (state.badge) attrs.push(`[badge]="${state.badge}"`, 'badgeDescription="3 avisos pendientes"');
    const body = state.items ? '  <!-- contenido: tarjetas, lista… -->' : '  <p class="empty">Sin unidades en seguimiento</p>';
    return `<!-- El host se ubica con position:absolute y top/bottom: el panel crece hasta ese alto. -->\n<cs-map-panel\n  ${attrs.join('\n  ')}\n>\n${body}\n</cs-map-panel>`;
  }
}
