import { Component, computed, signal } from '@angular/core';
import { Button, Icon, Spotlight, type SpotlightPlacement } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

interface TourStep {
  target: string;
  targetDescription: string;
  headline: string;
  body: string;
  placement: SpotlightPlacement;
}

const TOUR_STEPS: TourStep[] = [
  { target: 'Filtros', targetDescription: 'Flota y estado', headline: 'Paso 1: Filtros', body: 'Acota el mapa por flota, estado o tipo de unidad.', placement: 'right' },
  { target: 'Agrupamiento', targetDescription: 'Marcadores cercanos', headline: 'Paso 2: Agrupamiento', body: 'Los grupos alejados se colapsan en un conteo para que el mapa siga siendo legible.', placement: 'right' },
  { target: 'Unidad', targetDescription: 'Detalle en vivo', headline: 'Paso 3: Tarjeta de unidad', body: 'Haz clic en cualquier unidad para abrir su tarjeta de detalle en vivo.', placement: 'right' },
];

interface PlacementExample {
  placement: SpotlightPlacement;
  label: string;
  headline: string;
  description: string;
}

const PLACEMENT_EXAMPLES: PlacementExample[] = [
  { placement: 'top', label: 'Arriba', headline: 'Panel de filtro', description: 'Se abre sobre el campo sin cubrir el mapa.' },
  { placement: 'bottom', label: 'Abajo', headline: 'Nueva vista', description: 'Explica una función próxima al botón que la activa.' },
  { placement: 'left', label: 'Izquierda', headline: 'Estado de unidad', description: 'Mantiene libre la acción principal situada a la derecha.' },
  { placement: 'right', label: 'Derecha', headline: 'Detalles de ruta', description: 'Acompaña una fila sin ocultar su información esencial.' },
];

@Component({
  selector: 'app-spotlight-page',
  imports: [Spotlight, Button, Icon, DemoShell],
  templateUrl: './spotlight-page.html',
  styleUrl: './spotlight-page.css',
})
export class SpotlightPage {
  protected readonly placementExamples = PLACEMENT_EXAMPLES;
  protected readonly tourSteps = TOUR_STEPS;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'toggle', label: 'Descripción', key: 'description', default: true },
    { kind: 'toggle', label: 'Contador de pasos', key: 'stepCount', default: true },
  ];
  protected readonly pgShowDescription = signal(true);
  protected readonly pgShowStepCount = signal(true);
  protected readonly pgVisible = signal(true);
  protected readonly guideTourStep = signal(0);
  protected readonly guideExitVisible = signal(false);

  protected onPlaygroundState(s: DemoState): void {
    if (s['description'] !== undefined) this.pgShowDescription.set(!!s['description']);
    if (s['stepCount'] !== undefined) this.pgShowStepCount.set(!!s['stepCount']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [];
    if (this.pgShowDescription()) props.push('description="Las unidades cercanas ahora se agrupan automáticamente..."');
    if (this.pgShowStepCount()) props.push('stepCount="1 de 3"');
    return `<cs-spotlight [isVisible]="visible" headline="Nuevo: agrupamiento de unidades" primaryActionLabel="Entendido" (primaryAction)="visible = false"${props.length ? '\n  ' + props.join('\n  ') : ''}>\n  <cs-button>Mostrar Spotlight</cs-button>\n</cs-spotlight>`;
  });

  /* Recorrido de varios pasos */
  protected readonly tourStep = signal(0);
  protected readonly tourVisible = signal(true);

  protected nextStep(): void {
    if (this.tourStep() < this.tourSteps.length - 1) this.tourStep.set(this.tourStep() + 1);
    else this.tourVisible.set(false);
  }
  protected prevStep(): void {
    if (this.tourStep() > 0) this.tourStep.set(this.tourStep() - 1);
  }
  protected restartTour(): void {
    this.tourStep.set(0);
    this.tourVisible.set(true);
  }

  protected nextGuideStep(): void {
    this.guideTourStep.update((step) => step === 2 ? 0 : step + 1);
  }
}
