import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';

export type ProgressStepState = 'done' | 'active' | 'pending';
export type ProgressIndicatorOrientation = 'horizontal' | 'vertical';

export interface ProgressIndicatorStep {
  id: string;
  label: string;
  description?: string;
  state: ProgressStepState;
}

@Component({
  selector: 'cs-progress-indicator',
  imports: [Icon],
  templateUrl: './progress-indicator.html',
  styleUrl: './progress-indicator.css',
})
export class ProgressIndicator {
  @Input({ required: true }) steps: ProgressIndicatorStep[] = [];
  @Input() orientation: ProgressIndicatorOrientation = 'horizontal';
  /** Convierte los nodos en botones para volver a un paso del recorrido. */
  @Input() interactive = false;
  @Input() ariaLabel = 'Progreso';
  @Output() readonly stepClick = new EventEmitter<string>();

  protected isHorizontal(): boolean {
    return this.orientation === 'horizontal';
  }

  protected isFilled(step: ProgressIndicatorStep): boolean {
    return step.state !== 'pending';
  }

  protected nextStep(index: number): ProgressIndicatorStep | undefined {
    return this.steps[index + 1];
  }

  protected onStepClick(step: ProgressIndicatorStep): void {
    if (this.interactive) this.stepClick.emit(step.id);
  }
}
