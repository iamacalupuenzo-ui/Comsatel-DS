import { Component, computed, signal } from '@angular/core';
import { Banner, Icon, type BannerVariant } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const VARIANTS: BannerVariant[] = ['brand', 'neutral', 'danger', 'success', 'warning'];

interface DismissibleBanner {
  variant: BannerVariant;
  title: string;
  msg: string;
}

const DISMISSIBLE_BANNERS: DismissibleBanner[] = [
  { variant: 'brand', title: 'Nueva función disponible', msg: 'Comsatel ahora genera issues automáticamente. Actívalo en la configuración de tu proyecto.' },
  { variant: 'warning', title: 'La prueba termina pronto', msg: 'Tu prueba expira en 3 días. Mejora tu plan para conservar el acceso a todas las funciones.' },
  { variant: 'danger', title: 'Pago fallido', msg: 'Tu tarjeta fue rechazada. Actualiza tu información de facturación para continuar.' },
];

@Component({
  selector: 'app-banner-page',
  imports: [Banner, Icon, DemoShell],
  templateUrl: './banner-page.html',
  styleUrl: './banner-page.css',
})
export class BannerPage {
  protected readonly variants = VARIANTS;
  protected readonly dismissibleBanners = DISMISSIBLE_BANNERS;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Variante', key: 'variant', options: VARIANTS, default: 'brand' },
    { kind: 'toggle', label: 'Título', key: 'showTitle', default: false },
    { kind: 'toggle', label: 'Acción', key: 'showAction', default: false },
    { kind: 'toggle', label: 'Cerrar', key: 'dismissible', default: false },
    { kind: 'toggle', label: 'Ícono', key: 'icon', default: true },
  ];

  protected readonly pgVariant = signal<BannerVariant>('brand');
  protected readonly pgShowTitle = signal(false);
  protected readonly pgShowAction = signal(false);
  protected readonly pgDismissible = signal(false);
  protected readonly pgIcon = signal(true);

  protected onPlaygroundState(s: DemoState): void {
    if (s['variant']) this.pgVariant.set(s['variant'] as BannerVariant);
    if (s['showTitle'] !== undefined) this.pgShowTitle.set(!!s['showTitle']);
    if (s['showAction'] !== undefined) this.pgShowAction.set(!!s['showAction']);
    if (s['dismissible'] !== undefined) this.pgDismissible.set(!!s['dismissible']);
    if (s['icon'] !== undefined) this.pgIcon.set(!!s['icon']);
  }

  protected readonly pgCode = computed(() => {
    const lines: string[] = [`<cs-banner variant="${this.pgVariant()}"`];
    if (this.pgShowTitle()) lines.push(`  title="Anuncio de función"`);
    if (!this.pgIcon()) lines.push(`  [icon]="false"`);
    if (this.pgShowAction()) lines.push(`  [action]="{ label: 'Saber más' }"`);
    if (this.pgDismissible()) lines.push(`  [dismissible]="true"`);
    lines.push(`>`);
    lines.push(`  Ahorraste <strong>16 horas</strong> en los últimos`);
    lines.push(`  <strong>30 días</strong> gracias a Comsatel.`);
    lines.push(`</cs-banner>`);
    return lines.join('\n');
  });

  /* Descartable */
  protected readonly dismissed = signal<Record<string, boolean>>({});
  protected readonly allDismissed = computed(() => this.dismissibleBanners.every((b) => this.dismissed()[b.variant]));

  protected dismissOne(variant: string): void {
    this.dismissed.update((prev) => ({ ...prev, [variant]: true }));
  }
  protected resetDismissed(): void {
    this.dismissed.set({});
  }

  protected readonly guideActionDone = signal(false);
  protected readonly guideDismissed = signal(false);

  protected resetGuidelines(): void {
    this.guideActionDone.set(false);
    this.guideDismissed.set(false);
  }
}
