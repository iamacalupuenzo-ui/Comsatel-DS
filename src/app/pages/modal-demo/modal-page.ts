import { Component, computed, signal } from '@angular/core';
import { Button, Icon, Input, Modal, type ModalAppearance, type ModalScrollBehavior, type ModalWidthToken } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

const APPEARANCES: ModalAppearance[] = ['default', 'warning', 'danger'];
const WIDTHS: ModalWidthToken[] = ['sm', 'md', 'lg', 'xl'];
type GuideModal = 'destructive' | 'low-risk' | 'focused-footer' | 'many-actions' | 'aligned-severity' | 'misaligned-severity';

const SCROLL_MODAL_BODY = [
  'El historial GPS de esta unidad se guarda durante 12 meses desde la fecha de reporte. Posición, velocidad y eventos asignados por el conductor se conservan todos al mismo intervalo con el que se reportaron — no hay reducción de muestreo en los registros más antiguos.',
  'Los reportes de recorrido construidos a partir de este historial quedan ligados a los puntos crudos originales, no a una foto fija: si un punto se corrige (se elimina una lectura errónea, se reasigna un conductor), los reportes generados después de esa corrección la reflejan, pero los reportes ya exportados no cambian retroactivamente.',
  'Las grabaciones de cámara ligadas a un recorrido siguen una ventana de retención distinta y más corta, y no están cubiertas por esta política — revisa la configuración de grabación del grupo de cámaras de esa unidad.',
  'Exportar un reporte no elimina el dato subyacente de este historial; solo hace que esa exportación puntual deje de recibir correcciones futuras.',
];

@Component({
  selector: 'app-modal-page',
  imports: [Button, Icon, Input, Modal, DemoShell, CodeBlock],
  templateUrl: './modal-page.html',
  styleUrl: './modal-page.css',
})
export class ModalPage {
  protected readonly scrollModalBody = SCROLL_MODAL_BODY;
  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Apariencia', key: 'appearance', options: APPEARANCES, default: 'default' },
    { kind: 'select', label: 'Ancho', key: 'width', options: WIDTHS, default: 'md' },
  ];

  protected readonly pgAppearance = signal<ModalAppearance>('default');
  protected readonly pgWidth = signal<ModalWidthToken>('md');
  protected readonly pgOpen = signal(false);

  protected onPlaygroundState(s: DemoState): void {
    if (s['appearance']) this.pgAppearance.set(s['appearance'] as ModalAppearance);
    if (s['width']) this.pgWidth.set(s['width'] as ModalWidthToken);
  }

  protected readonly pgCode = computed(() => {
    const lines: string[] = ['<cs-modal'];
    lines.push(`  [isOpen]="isOpen"`);
    lines.push(`  title="Duplicar este recorrido"`);
    if (this.pgAppearance() !== 'default') lines.push(`  appearance="${this.pgAppearance()}"`);
    if (this.pgWidth() !== 'md') lines.push(`  width="${this.pgWidth()}"`);
    lines.push(`  [primaryAction]="{ label: 'Confirmar' }"`);
    lines.push(`  [secondaryAction]="{ label: 'Cancelar' }"`);
    lines.push(`  (closed)="isOpen = false"`);
    lines.push(`>`);
    lines.push(`  Esto crea una copia del recorrido seleccionado.`);
    lines.push(`</cs-modal>`);
    return lines.join('\n');
  });

  /* Apariencia */
  protected readonly appearanceOpen = signal<ModalAppearance | null>(null);

  /* Ancho */
  protected readonly widthOpen = signal<ModalWidthToken | null>(null);
  protected readonly widths = WIDTHS;

  /* Comportamiento de scroll */
  protected readonly scrollOpen = signal<ModalScrollBehavior | null>(null);

  /* Formulario */
  protected readonly formOpen = signal(false);
  protected readonly formName = signal('');

  protected readonly guideOpen = signal<GuideModal | null>(null);
  protected readonly guideStatus = signal('');

  protected openGuide(guide: GuideModal): void {
    this.guideStatus.set('');
    this.guideOpen.set(guide);
  }

  protected closeGuide(status = 'Modal cerrado.'): void {
    this.guideOpen.set(null);
    this.guideStatus.set(status);
  }

  protected showNonBlockingNotice(): void {
    this.guideStatus.set('Aviso mostrado sin bloquear la página.');
  }

  protected resetGuidelines(): void {
    this.guideOpen.set(null);
    this.guideStatus.set('');
  }

  protected submitForm(): void {
    // Demo: no hay backend real, solo cierra al "enviar".
    this.formOpen.set(false);
  }
}
