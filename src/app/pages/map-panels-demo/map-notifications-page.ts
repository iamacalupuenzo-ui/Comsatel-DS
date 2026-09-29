import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { Button, Icon, MapNotification, MapPanel } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { demoNotifications, type DemoNotification } from './map-demo-data';

type CardState = 'unread' | 'read' | 'grouped' | 'action';
interface CardDemo { key: CardState; title: string; intro: string; props: string; entry: DemoNotification; action: boolean }
const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000);
const CARD_STATES: CardDemo[] = [
  { key: 'unread', title: 'Nueva', intro: 'Todavía no se vio: lleva la marca «Nueva». Deja de serlo cuando la persona abre el panel.', props: '[unread]="true"', entry: { id: 'c1', eventLabel: 'Retomó movimiento', unitName: 'Camión Norte 04', unitCode: 'ABC-123', time: minutesAgo(0), count: 1, unread: true }, action: false },
  { key: 'read', title: 'Vista', intro: 'Ya se vio pero sigue pendiente: se queda en la lista hasta que alguien la descarte o la resuelva.', props: '[unread]="false"', entry: { id: 'c2', eventLabel: 'Retomó movimiento', unitName: 'Furgón Centro 09', unitCode: 'PQR-678', time: minutesAgo(95), count: 1, unread: false }, action: false },
  { key: 'grouped', title: 'Agrupada', intro: 'Varios avisos del mismo evento y unidad se juntan en una tarjeta con el conteo y la hora del último.', props: '[count]="3"', entry: { id: 'c3', eventLabel: 'Retomó movimiento', unitName: 'Furgón Sur 12', unitCode: 'GHI-789', time: minutesAgo(8), count: 3, unread: true }, action: false },
  { key: 'action', title: 'Con acción', intro: 'Una acción secundaria va en su propia fila, para no competir con el clic que centra la unidad.', props: '<cs-button variant="link" size="xs">Seguir unidad</cs-button>', entry: { id: 'c4', eventLabel: 'Retomó movimiento', unitName: 'Bus Este 21', unitCode: 'BAB-711', time: minutesAgo(35), count: 2, unread: false }, action: true },
];

type PanelState = 'open' | 'collapsed' | 'empty';
const PANEL_STATES: { key: PanelState; title: string; intro: string }[] = [
  { key: 'open', title: 'Abierto con avisos', intro: 'Lista de avisos, el más reciente arriba. Al abrirlo, todos pasan a vistos.' },
  { key: 'collapsed', title: 'Contraído con contador', intro: 'El contador de pendientes queda a la vista aunque el panel esté contraído.' },
  { key: 'empty', title: 'Sin avisos', intro: 'Sin pendientes, el panel se achica a «Sin notificaciones» y el pie desaparece.' },
];

@Component({
  selector: 'app-map-notifications-page',
  imports: [Button, DemoShell, Icon, MapNotification, MapPanel],
  templateUrl: './map-notifications-page.html',
  styleUrls: ['./map-demo.css', './map-notifications-page.css'],
})
export class MapNotificationsPage {
  protected readonly cardStates = CARD_STATES;
  protected readonly panelStates = PANEL_STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: PANEL_STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'open' },
  ];
  protected readonly pgState = signal<PanelState>('open');
  protected readonly pgInfo = computed(() => PANEL_STATES.find((s) => s.key === this.pgState()) ?? PANEL_STATES[0]);
  protected readonly pgOpen = signal(true);
  protected readonly entries = signal<DemoNotification[]>(demoNotifications());
  protected readonly voice = signal(true);
  protected readonly lastAction = signal('');
  /** Refresca «Hace N min» cada 30 segundos, como el producto. */
  protected readonly now = signal(Date.now());
  protected readonly pending = computed(() => this.entries().length);
  protected readonly pendingDescription = computed(() => `${this.pending()} ${this.pending() === 1 ? 'notificación pendiente' : 'notificaciones pendientes'}`);

  constructor() {
    const timer = setInterval(() => this.now.set(Date.now()), 30_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  protected onState(s: DemoState): void {
    if (!s['state']) return;
    const state = s['state'] as PanelState;
    this.pgState.set(state);
    this.pgOpen.set(state !== 'collapsed');
    this.entries.set(state === 'empty' ? [] : demoNotifications());
  }

  protected onOpen(open: boolean): void {
    this.pgOpen.set(open);
    if (open) this.entries.update((all) => all.map((entry) => ({ ...entry, unread: false })));
  }

  protected dismiss(id: string): void {
    this.entries.update((all) => all.filter((entry) => entry.id !== id));
  }

  protected entriesFor(state: PanelState): DemoNotification[] {
    return state === 'empty' ? [] : demoNotifications().slice(0, 3);
  }

  protected readonly panelCode = `<cs-map-panel
  label="Notificaciones de unidades"
  title="Notificaciones"
  icon="bell"
  listLabel="Lista de notificaciones"
  [badge]="pending()"
  [badgeDescription]="pending() + ' notificaciones pendientes'"
  [(open)]="open"
>
  <button csMapPanelActions type="button" aria-label="Silenciar avisos de voz" …>…</button>
  @for (entry of entries(); track entry.id) {
    <cs-map-notification
      [eventLabel]="entry.eventLabel"
      [unitName]="entry.unitName"
      [unitCode]="entry.unitCode"
      [time]="entry.time"
      [now]="now()"
      [count]="entry.count"
      [unread]="entry.unread"
      (selected)="centerUnit(entry)"
      (dismissed)="dismiss(entry.id)"
    />
  } @empty {
    <p class="empty">Sin notificaciones</p>
  }
  @if (entries().length) {
    <cs-button csMapPanelFooter variant="link" size="sm" [fullWidth]="true" (click)="clearAll()">Limpiar notificaciones</cs-button>
  }
</cs-map-panel>`;

  protected cardCode(state: CardDemo): string {
    const attrs = [`eventLabel="${state.entry.eventLabel}"`, `unitName="${state.entry.unitName}"`, `unitCode="${state.entry.unitCode}"`, '[time]="entry.time"', '[now]="now()"'];
    if (state.entry.count > 1) attrs.push(`[count]="${state.entry.count}"`);
    if (state.entry.unread) attrs.push('[unread]="true"');
    attrs.push('(selected)="centerUnit()"', '(dismissed)="dismiss()"');
    const actions = state.action ? '\n  <cs-button variant="link" size="xs" (click)="followUnit()">Seguir unidad</cs-button>\n' : '';
    return `<cs-map-notification\n  ${attrs.join('\n  ')}\n>${actions}</cs-map-notification>`;
  }
}
