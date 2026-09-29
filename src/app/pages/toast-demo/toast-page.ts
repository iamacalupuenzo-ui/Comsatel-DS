import { Component, computed, signal } from '@angular/core';
import { Button, Toast, ToastRegion, Icon, type ToastAppearance, type ToastVariant, type ToastAction } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

const VARIANTS: ToastVariant[] = ['default', 'info', 'success', 'warning', 'error'];
const ACTION_COUNTS = ['0', '1', '2'] as const;

interface SampleContent {
  title: string;
  description: string;
}

const SAMPLE_CONTENT: Record<ToastVariant, SampleContent> = {
  default: { title: 'Nueva versión publicada', description: 'Actualiza para ver los cambios.' },
  info: { title: 'No hay personas en este proyecto', description: 'Agrega a tu equipo para comenzar.' },
  success: { title: 'Tarea creada correctamente', description: 'START-42 se agregó al backlog.' },
  warning: { title: 'Esta página es visible externamente', description: '¿Seguro que quieres publicarla?' },
  error: { title: 'Hay un problema de conexión', description: 'Revisa tu conexión e inténtalo de nuevo.' },
};

const SAMPLE_ACTIONS: ToastAction[] = [{ label: 'Ver tarea' }, { label: 'Agregar al sprint' }];

@Component({
  selector: 'app-toast-page',
  imports: [Button, Toast, ToastRegion, Icon, DemoShell, CodeBlock],
  templateUrl: './toast-page.html',
  styleUrl: './toast-page.css',
})
export class ToastPage {
  protected readonly variants = VARIANTS;
  protected readonly sampleContent = SAMPLE_CONTENT;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'variant', options: VARIANTS, default: 'default' },
    { kind: 'select', label: 'Acciones', key: 'actionCount', options: ACTION_COUNTS, default: '0' },
    { kind: 'select', label: 'Apariencia', key: 'appearance', options: [{ value: 'solid', label: 'Sólida' }, { value: 'subtle', label: 'Sutil' }], default: 'solid' },
    { kind: 'toggle', label: 'Descartable', key: 'dismissible', default: false },
  ];
  protected readonly pgVariant = signal<ToastVariant>('default');
  protected readonly pgActionCount = signal(0);
  protected readonly pgVisible = signal(true);
  protected readonly pgAppearance = signal<ToastAppearance>('solid');
  protected readonly pgDismissible = signal(false);
  protected readonly actionResult = signal('Aún no se ha ejecutado una acción.');

  protected onPlaygroundState(s: DemoState): void {
    if (s['variant']) this.pgVariant.set(s['variant'] as ToastVariant);
    if (s['actionCount'] !== undefined) this.pgActionCount.set(Number(s['actionCount']));
    if (s['appearance']) this.pgAppearance.set(s['appearance'] as ToastAppearance);
    if (s['dismissible'] !== undefined) this.pgDismissible.set(!!s['dismissible']);
    this.pgVisible.set(true);
  }

  protected readonly pgContent = computed(() => SAMPLE_CONTENT[this.pgVariant()]);
  protected variantCode(variant: ToastVariant): string { return `<cs-toast title="${SAMPLE_CONTENT[variant].title}" variant="${variant}" />`; }
  protected readonly pgActions = computed<ToastAction[] | undefined>(() =>
    this.pgActionCount() > 0 ? SAMPLE_ACTIONS.slice(0, this.pgActionCount()) : undefined,
  );

  protected readonly pgCode = computed(() => {
    const c = this.pgContent();
    const variantProp = this.pgVariant() !== 'default' ? ` variant="${this.pgVariant()}"` : '';
    const actionsProp = this.pgActions() ? `\n  [actions]="[${this.pgActions()!.map((a) => `{ label: '${a.label}' }`).join(', ')}]"` : '';
    const appearanceProp = this.pgVariant() !== 'default' && this.pgAppearance() === 'subtle' ? `\n  appearance="subtle"` : '';
    const forced = this.pgVariant() !== 'default' && this.pgDismissible();
    const dismissProp = this.pgVariant() === 'default' || forced ? `${forced ? '\n  [dismissible]="true"' : ''}\n  (dismissed)="..."` : '';
    return `<cs-toast\n  title="${c.title}"\n  description="${c.description}"${variantProp}${appearanceProp}${actionsProp}${dismissProp}\n/>`;
  });

  protected readonly actionsCode = `<cs-toast\n  title="Nueva versión publicada"\n  description="Actualiza para ver los cambios."\n  [actions]="[{ label: 'Actualizar' }, { label: 'Descartar' }]"\n  (dismissed)="..."\n/>\n\n<cs-toast\n  variant="success"\n  title="Tarea creada correctamente"\n  description="START-42 se agregó al backlog."\n  [actions]="[{ label: 'Ver tarea' }]"\n/>`;

  protected readonly regionCode = `<cs-toast-region placement="top-end">
  @if (mensaje()) {
    <cs-toast
      [variant]="tipo()"
      appearance="subtle"
      [dismissible]="true"
      [title]="mensaje()"
      (dismissed)="cerrar()"
    />
  }
</cs-toast-region>`;

  protected readonly regionMessage = signal('');
  private regionTimer?: ReturnType<typeof setTimeout>;
  protected showRegionToast(): void {
    clearTimeout(this.regionTimer);
    this.regionMessage.set('Ubicación copiada');
    this.regionTimer = setTimeout(() => this.regionMessage.set(''), 3000);
  }

  protected reportAction(label: string): void {
    this.actionResult.set(`Acción ejecutada: ${label}.`);
  }

  protected reportDismissed(): void {
    this.pgVisible.set(false);
    this.actionResult.set('Toast descartado.');
  }
}
