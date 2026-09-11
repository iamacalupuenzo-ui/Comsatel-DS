import { Component, computed, signal } from '@angular/core';
import { Icon, Stepper, type StepperOrientation, type StepperStep, type StepperStepState } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const STEP_IDS = ['asignado', 'recogida', 'transito', 'entregado'] as const;
type StepId = (typeof STEP_IDS)[number];
const STEP_OPTIONS = [
  { value: 'asignado', label: 'Asignado' }, { value: 'recogida', label: 'Recogida' },
  { value: 'transito', label: 'En tránsito' }, { value: 'entregado', label: 'Entregado' },
] as const;

function buildSteps(activeId: StepId): StepperStep[] {
  const activeIndex = STEP_IDS.indexOf(activeId);
  const metadata = [
    { id: 'asignado', label: 'Asignado', description: '08:00' },
    { id: 'recogida', label: 'Recogida', description: '08:45' },
    { id: 'transito', label: 'En tránsito', description: 'En ruta' },
    { id: 'entregado', label: 'Entregado', description: 'Pendiente' },
  ] as const;
  return metadata.map((step, index) => ({ ...step, state: index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'pending' as StepperStepState }));
}

@Component({
  selector: 'app-stepper-page',
  imports: [DemoShell, Stepper, Icon],
  templateUrl: './stepper-page.html',
  styleUrl: './stepper-page.css',
})
export class StepperPage {
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Orientación', key: 'orientation', options: [{ value: 'horizontal', label: 'Horizontal' }, { value: 'vertical', label: 'Vertical' }], default: 'horizontal' },
    { kind: 'select', label: 'Paso activo', key: 'activeStep', options: STEP_OPTIONS, default: 'recogida' },
  ];
  protected readonly orientation = signal<StepperOrientation>('horizontal');
  protected readonly activeStep = signal<StepId>('recogida');
  protected readonly interactiveStep = signal<StepId>('recogida');
  protected readonly playgroundSteps = computed(() => buildSteps(this.activeStep()));
  protected readonly interactiveSteps = computed(() => buildSteps(this.interactiveStep()));
  protected readonly currentLabel = computed(() => this.interactiveSteps().find((step) => step.state === 'active')?.label ?? 'Asignado');
  protected readonly playgroundCode = computed(() => {
    const orientation = this.orientation() === 'horizontal' ? '' : ' orientation="vertical"';
    return `<cs-stepper${orientation}\n  [steps]="steps"\n/>`;
  });
  protected readonly stateSteps: StepperStep[][] = [
    [{ id: 'done', label: 'Completado', state: 'done' }],
    [{ id: 'active', label: 'Activo', state: 'active' }],
    [{ id: 'pending', label: 'Pendiente', state: 'pending' }],
  ];

  protected onStateChange(state: DemoState): void {
    if (state['orientation']) this.orientation.set(state['orientation'] as StepperOrientation);
    if (state['activeStep']) this.activeStep.set(state['activeStep'] as StepId);
  }
  protected selectInteractiveStep(id: string): void {
    if (STEP_IDS.includes(id as StepId)) this.interactiveStep.set(id as StepId);
  }
}
