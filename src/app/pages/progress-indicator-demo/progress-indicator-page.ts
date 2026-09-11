import { Component, computed, signal } from '@angular/core';
import {
  Icon,
  ProgressIndicator,
  type ProgressIndicatorOrientation,
  type ProgressIndicatorStep,
} from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const ORIENTATIONS: ProgressIndicatorOrientation[] = ['horizontal', 'vertical'];
const ORIENTATION_OPTIONS = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
] as const;
const STEP_IDS = ['inicio', 'revision', 'completo'] as const;
type StepId = (typeof STEP_IDS)[number];
const STEP_OPTIONS = [
  { value: 'inicio', label: 'Inicio' },
  { value: 'revision', label: 'Revisión' },
  { value: 'completo', label: 'Completado' },
] as const;

function buildSteps(activeId: StepId): ProgressIndicatorStep[] {
  const activeIndex = STEP_IDS.indexOf(activeId);
  const labels = [
    { id: 'inicio', label: 'Inicio', description: 'Información' },
    { id: 'revision', label: 'Revisión', description: 'Validación' },
    { id: 'completo', label: 'Completado', description: 'Confirmación' },
  ] as const;
  return labels.map((step, index) => ({
    ...step,
    state: index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'pending',
  }));
}

@Component({
  selector: 'app-progress-indicator-page',
  imports: [ProgressIndicator, Icon, DemoShell],
  templateUrl: './progress-indicator-page.html',
  styleUrl: './progress-indicator-page.css',
})
export class ProgressIndicatorPage {
  protected readonly orientations = ORIENTATIONS;
  protected readonly stepIds = STEP_IDS;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Orientación', key: 'orientation', options: ORIENTATION_OPTIONS, default: 'horizontal' },
    { kind: 'select', label: 'Paso activo', key: 'activeStep', options: STEP_OPTIONS, default: 'revision' },
    { kind: 'toggle', label: 'Interactivo', key: 'interactive', default: false },
  ];

  protected readonly orientation = signal<ProgressIndicatorOrientation>('horizontal');
  protected readonly activeStep = signal<StepId>('revision');
  protected readonly interactive = signal(false);
  protected readonly interactiveStep = signal<StepId>('revision');

  protected readonly playgroundSteps = computed(() => buildSteps(this.activeStep()));
  protected readonly interactiveSteps = computed(() => buildSteps(this.interactiveStep()));
  protected readonly currentLabel = computed(() => {
    const step = this.interactiveSteps().find((item) => item.state === 'active');
    return step?.label ?? 'Completado';
  });
  protected readonly playgroundCode = computed(() => {
    const orientation = this.orientation() === 'horizontal' ? '' : ` orientation="${this.orientation()}"`;
    const interactive = this.interactive() ? ' [interactive]="true"' : '';
    const steps = this.playgroundSteps().map((step) => `  { id: "${step.id}", label: "${step.label}", state: "${step.state}" }`).join(',\n');
    return `<cs-progress-indicator${orientation}${interactive}\n  [steps]="steps"\n/>\n\nconst steps = [\n${steps},\n];`;
  });

  protected onStateChange(state: DemoState): void {
    if (state['orientation']) this.orientation.set(state['orientation'] as ProgressIndicatorOrientation);
    if (state['activeStep']) this.activeStep.set(state['activeStep'] as StepId);
    if (state['interactive'] !== undefined) this.interactive.set(Boolean(state['interactive']));
  }

  protected onInteractiveStep(id: string): void {
    if (STEP_IDS.includes(id as StepId)) this.interactiveStep.set(id as StepId);
  }

  protected onPlaygroundStep(id: string): void {
    if (STEP_IDS.includes(id as StepId)) this.activeStep.set(id as StepId);
  }
}
