import { Component, computed, signal } from '@angular/core';
import { Tooltip, Button, Icon, type TooltipSide } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const SIDES: TooltipSide[] = ['top', 'bottom', 'left', 'right'];

@Component({
  selector: 'app-tooltip-page',
  imports: [Tooltip, Button, Icon, DemoShell],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.css',
})
export class TooltipPage {
  protected readonly sides = SIDES;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Lado', key: 'side', options: SIDES, default: 'top' },
    { kind: 'toggle', label: 'Flecha', key: 'arrow', default: true },
  ];

  protected readonly pgSide = signal<TooltipSide>('top');
  protected readonly pgArrow = signal(true);

  protected onPlaygroundState(s: DemoState): void {
    if (s['side']) this.pgSide.set(s['side'] as TooltipSide);
    if (s['arrow'] !== undefined) this.pgArrow.set(!!s['arrow']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [`content="Save changes"`];
    if (this.pgSide() !== 'top') props.push(`side="${this.pgSide()}"`);
    if (!this.pgArrow()) props.push(`[arrow]="false"`);
    return `<cs-tooltip ${props.join(' ')}>\n  <cs-button>Hover or focus</cs-button>\n</cs-tooltip>`;
  });
}
