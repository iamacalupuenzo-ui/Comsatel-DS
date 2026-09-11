import { Component, ElementRef, QueryList, ViewChild, ViewChildren, computed, signal } from '@angular/core';
import { Button, Icon, Popover, type IconName, type PopoverPlacement } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

const PLACEMENTS: PopoverPlacement[] = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
];

interface MenuItemDef {
  label: string;
  icon: IconName;
  danger?: boolean;
}

const MENU_ITEMS: MenuItemDef[] = [
  { label: 'Copiar IMEI', icon: 'copy' },
  { label: 'Compartir ubicación', icon: 'share-2' },
  { label: 'Ver historial', icon: 'history' },
  { label: 'Desconectar', icon: 'power-off', danger: true },
];

const MATCH_WIDTH_OPTIONS = ['Norte 04', 'Norte 07', 'Sur 12', 'Sur 18'];

@Component({
  selector: 'app-popover-page',
  imports: [Button, Icon, Popover, DemoShell, CodeBlock],
  templateUrl: './popover-page.html',
  styleUrl: './popover-page.css',
})
export class PopoverPage {
  protected readonly placements = PLACEMENTS;
  protected readonly menuItems = MENU_ITEMS;
  protected readonly matchWidthOptions = MATCH_WIDTH_OPTIONS;

  /* Playground */
  @ViewChild('pgTrigger', { read: ElementRef }) protected pgTriggerRef?: ElementRef<HTMLElement>;
  protected readonly pgOpen = signal(false);
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Posición', key: 'placement', options: PLACEMENTS, default: 'bottom-start' },
  ];
  protected readonly pgPlacement = signal<PopoverPlacement>('bottom-start');

  /* Colisión de viewport */
  @ViewChild('collisionTrigger', { read: ElementRef }) protected collisionTriggerRef?: ElementRef<HTMLElement>;
  protected readonly collisionOpen = signal(false);

  protected onPlaygroundState(s: DemoState): void {
    if (s['placement']) this.pgPlacement.set(s['placement'] as PopoverPlacement);
  }

  protected readonly pgCode = computed(() => {
    const placementProp = this.pgPlacement() !== 'bottom-start' ? ` placement="${this.pgPlacement()}"` : '';
    return `<cs-button #trigger (click)="open = !open">Abrir</cs-button>\n<cs-popover [isOpen]="open" [triggerRef]="trigger" (closed)="open = false"${placementProp}>\n  ...\n</cs-popover>`;
  });

  /* Posición (grid de 12) */
  @ViewChildren('placementBtn', { read: ElementRef }) protected placementBtns!: QueryList<ElementRef<HTMLElement>>;
  protected readonly openPlacementIndex = signal<number | null>(null);

  protected triggerFor(i: number): ElementRef<HTMLElement> | null {
    return this.placementBtns?.toArray()[i] ?? null;
  }

  protected togglePlacement(i: number): void {
    this.openPlacementIndex.set(this.openPlacementIndex() === i ? null : i);
  }

  /* Igualar ancho del trigger */
  @ViewChild('mwTrigger', { read: ElementRef }) protected mwTriggerRef?: ElementRef<HTMLElement>;
  protected readonly mwOpen = signal(false);
  protected readonly mwValue = signal<string | null>(null);

  protected selectMatchWidth(opt: string): void {
    this.mwValue.set(opt);
    this.mwOpen.set(false);
  }

  /* Componiendo un menú */
  @ViewChild('menuTrigger', { read: ElementRef }) protected menuTriggerRef?: ElementRef<HTMLElement>;
  protected readonly menuOpen = signal(false);

  /* Lineamientos: los ejemplos recomendados deben abrir un Popover real. */
  @ViewChild('guideActionTrigger', { read: ElementRef }) protected guideActionTriggerRef?: ElementRef<HTMLElement>;
  @ViewChild('guideDismissTrigger', { read: ElementRef }) protected guideDismissTriggerRef?: ElementRef<HTMLElement>;
  protected readonly guideActionOpen = signal(false);
  protected readonly guideDismissOpen = signal(false);
}
