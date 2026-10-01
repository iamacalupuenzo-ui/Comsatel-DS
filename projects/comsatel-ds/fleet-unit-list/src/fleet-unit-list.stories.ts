import { afterRenderEffect, Component, DestroyRef, ElementRef, inject, Input, input, signal, viewChild } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { FleetUnitList, type FleetUnit, type FleetUnitListAppearance } from './fleet-unit-list';

const UNITS: FleetUnit[] = [
  { id: 'bkl-482', name: 'BKL-482', plate: 'BKL-482', engine: '4D56UAF8823', vehicleType: 'truck', gps: 'on', ignition: 'on', lastSeen: '01/10/2026 10:53', status: 'active', statusLabel: 'En marcha', speed: '62 km/h', battery: '88%', location: 'Av. Argentina, Callao' },
  { id: 'f3r-917', name: 'F3R-917', plate: 'F3R-917', engine: 'G4FLPV559935', vehicleType: 'car', gps: 'on', ignition: 'on', lastSeen: '01/10/2026 10:52', status: 'active', statusLabel: 'En marcha', speed: '38 km/h', battery: '91%', location: 'Av. Javier Prado' },
  { id: 'acx-205', name: 'ACX-205', plate: 'ACX-205', engine: 'ISB6.7-30411', vehicleType: 'bus', gps: 'on', ignition: 'off', lastSeen: '01/10/2026 10:41', status: 'stopped', statusLabel: 'Detenida', speed: '0 km/h', battery: '54%', location: 'Terminal Norte' },
  { id: 'd7m-641', name: 'D7M-641', plate: 'D7M-641', engine: 'JF16E2089714', vehicleType: 'motorcycle', gps: 'on', ignition: 'on', lastSeen: '01/10/2026 10:53', status: 'active', statusLabel: 'En marcha', speed: '45 km/h', battery: '76%', location: 'Av. Brasil' },
  { id: 'v2p-330', name: 'V2P-330', plate: 'V2P-330', engine: 'HFC4DB21D1S41', vehicleType: 'truck', gps: 'off', ignition: 'off', lastSeen: '30/09/2026 18:20', status: 'offline', statusLabel: 'Sin señal', speed: '—', battery: '12%', location: 'Av. Faucett' },
  { id: 't9h-058', name: 'T9H-058', plate: 'T9H-058', engine: 'SFG15TA220530', vehicleType: 'car', gps: 'on', ignition: 'off', lastSeen: '01/10/2026 09:15', status: 'stopped', statusLabel: 'Detenida', speed: '0 km/h', battery: '67%', location: 'Av. La Marina' },
  { id: 'awq-774', name: 'AWQ-774', plate: 'AWQ-774', engine: '4A91KDC4645', vehicleType: 'car', gps: 'on', ignition: 'on', lastSeen: '01/10/2026 10:50', status: 'active', statusLabel: 'En marcha', speed: '51 km/h', battery: '83%', location: 'Panamericana Sur' },
  { id: 'c5n-186', name: 'C5N-186', plate: 'C5N-186', engine: 'ISF3.8-77120', vehicleType: 'bus', gps: 'on', ignition: 'on', lastSeen: '01/10/2026 10:53', status: 'active', statusLabel: 'En marcha', speed: '57 km/h', battery: '95%', location: 'Vía Expresa' },
];

/** El scroll es responsabilidad del panel que contiene la lista. */
@Component({
  selector: 'story-fleet-unit-list-panel',
  imports: [FleetUnitList, Icon],
  template: `
    <div class="story-fleet-panel">
      <div #scroller class="story-fleet-panel__scroller" [class.story-fleet-panel__scroller--hidden]="!showScrollbar()"
        [class.story-fleet-panel__scroller--filled]="appearance() === 'filled'" (scroll)="checkScroll()">
        <div #content>
          <cs-fleet-unit-list [units]="units()" [appearance]="appearance()" [selectable]="selectable()"
            [pinnable]="pinnable()" [showTelemetry]="showTelemetry()"
            [selectedId]="selectedId()" (selectedIdChange)="selectedId.set($event)"
            [pinnedIds]="pinnedIds()" (pinnedIdsChange)="pinnedIds.set($event)" />
        </div>
      </div>
      @if (showHint()) {
        <div class="story-fleet-panel__hint" aria-hidden="true"><cs-icon name="chevron-down" [size]="16" /></div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; width: calc(var(--layout-size-3xl) * 4.5); max-width: 100%; }
    .story-fleet-panel { --story-fleet-panel-surface: var(--color-background-canvas); position: relative; }
    .story-fleet-panel:has(.story-fleet-panel__scroller--filled) { --story-fleet-panel-surface: var(--elevation-surface-default); }
    .story-fleet-panel__scroller { box-sizing: border-box; max-height: calc(var(--layout-size-3xl) * 4.5); overflow-y: auto; padding: var(--layout-padding-sm); border: var(--layout-border-thin) solid var(--color-border-neutral-subtle); border-radius: var(--radius-md); background: var(--color-background-canvas); box-shadow: var(--shadow-lg); }
    .story-fleet-panel__scroller--hidden { scrollbar-width: none; }
    .story-fleet-panel__scroller--hidden::-webkit-scrollbar { display: none; }
    .story-fleet-panel__scroller--filled { --cs-fleet-unit-list-surface: var(--elevation-surface-default); background: var(--elevation-surface-default); }
    .story-fleet-panel__hint { position: absolute; inset-inline: var(--layout-border-thin); inset-block-end: var(--layout-border-thin); display: flex; justify-content: center; padding-block: var(--layout-padding-lg) var(--layout-padding-xs); border-radius: 0 0 var(--radius-md) var(--radius-md); background: linear-gradient(to bottom, transparent, var(--story-fleet-panel-surface)); color: var(--color-text-base-subtlest); pointer-events: none; }
  `],
})
class FleetUnitListPanelStory {
  readonly units = input.required<FleetUnit[]>();
  readonly showScrollbar = input(false);
  readonly appearance = input<FleetUnitListAppearance>('outlined');
  readonly selectable = input(true);
  readonly pinnable = input(true);
  readonly showTelemetry = input(false);
  protected readonly selectedId = signal<string | null>(null);
  protected readonly pinnedIds = signal<string[]>([]);
  protected readonly showHint = signal(false);
  @Input() set initialSelectedId(value: string | null) { this.selectedId.set(value); }
  @Input() set initialPinnedIds(value: string[]) { this.pinnedIds.set(value); }
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');
  private readonly content = viewChild<ElementRef<HTMLElement>>('content');

  constructor() {
    const observer = new ResizeObserver(() => this.checkScroll());
    inject(DestroyRef).onDestroy(() => observer.disconnect());
    afterRenderEffect(() => {
      this.units();
      this.pinnedIds();
      this.showScrollbar();
      const scroller = this.scroller()?.nativeElement;
      const content = this.content()?.nativeElement;
      observer.disconnect();
      if (!scroller || !content) return;
      observer.observe(scroller);
      observer.observe(content);
      this.checkScroll();
    });
  }

  protected checkScroll(): void {
    const scroller = this.scroller()?.nativeElement;
    this.showHint.set(!!scroller && !this.showScrollbar() && scroller.scrollHeight > scroller.clientHeight &&
      Math.ceil(scroller.scrollTop + scroller.clientHeight) < Math.floor(scroller.scrollHeight));
  }
}

const meta: Meta<FleetUnitList> = {
  title: 'Organismos/FleetUnitList',
  component: FleetUnitList,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FleetUnitListPanelStory] })],
  args: { units: UNITS.slice(0, 4), selectable: true, pinnable: true },
  render: (args) => ({
    props: { ...args },
    template: `<story-fleet-unit-list-panel [units]="units" [appearance]="appearance ?? 'outlined'"
      [selectable]="selectable !== false" [pinnable]="pinnable !== false"
      [showTelemetry]="showTelemetry ?? false" [initialSelectedId]="selectedId ?? null"
      [initialPinnedIds]="pinnedIds ?? []" [showScrollbar]="false" />`,
  }),
};

export default meta;
type Story = StoryObj<FleetUnitList>;

export const Default: Story = {};
export const Selected: Story = { args: { selectedId: 'bkl-482' } };
export const Pinned: Story = { args: { pinnedIds: ['acx-205'] } };
export const Filled: Story = { args: { appearance: 'filled' } };
export const Disabled: Story = { args: { units: UNITS.slice(0, 4).map(unit => unit.id === 'acx-205' ? { ...unit, disabled: true } : unit) } };
export const WithTelemetry: Story = { args: { showTelemetry: true } };

export const ScrollWithoutBar: Story = {
  args: { units: UNITS },
};

export const ScrollWithBar: Story = {
  args: { units: UNITS },
  render: (args) => ({
    props: { ...args },
    template: '<story-fleet-unit-list-panel [units]="units" [showScrollbar]="true" />',
  }),
};
