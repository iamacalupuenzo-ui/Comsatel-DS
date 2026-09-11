import { Component, computed, signal } from '@angular/core';
import { Tab, Tabs, type TabsVariant } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

const VARIANTS: TabsVariant[] = ['line', 'pill'];

@Component({
  selector: 'app-tab-page',
  imports: [Tab, Tabs, DemoShell, CodeBlock],
  templateUrl: './tab-page.html',
  styleUrl: './tab-page.css',
})
export class TabPage {
  protected readonly variants = VARIANTS;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Variante', key: 'variant', options: VARIANTS, default: 'line' },
  ];
  protected readonly pgVariant = signal<TabsVariant>('line');

  protected onPlaygroundState(s: DemoState): void {
    if (s['variant']) this.pgVariant.set(s['variant'] as TabsVariant);
  }

  protected readonly pgCode = computed(
    () =>
      `<cs-tabs variant="${this.pgVariant()}">\n  <cs-tab value="overview" label="Overview">...</cs-tab>\n  <cs-tab value="specs" label="Specs">...</cs-tab>\n  <cs-tab value="changelog" label="Changelog">...</cs-tab>\n</cs-tabs>`,
  );

  protected readonly variantsCode = `<cs-tabs variant="line">...</cs-tabs>\n<cs-tabs variant="pill">...</cs-tabs>`;
  protected readonly disabledCode = `<cs-tabs>\n  <cs-tab value="a" label="Activo">...</cs-tab>\n  <cs-tab value="b" label="Deshabilitado" [disabled]="true"></cs-tab>\n  <cs-tab value="c" label="También activo">...</cs-tab>\n</cs-tabs>`;
}
