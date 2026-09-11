import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';

/** @deprecated Usa `ProgressStepState`. */
export type StepperStepState = 'done' | 'active' | 'pending';
/** @deprecated Usa `ProgressIndicatorOrientation`. */
export type StepperOrientation = 'horizontal' | 'vertical';

/** @deprecated Usa `ProgressIndicatorStep`. */
export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  state: StepperStepState;
}

/**
 * @deprecated Usa `ProgressIndicator` (`cs-progress-indicator`): misma API y mismo
 * resultado. Se mantiene exportado solo para no romper a quien ya lo usa.
 */
@Component({
  selector: 'cs-stepper',
  imports: [Icon, NgTemplateOutlet],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
})
export class Stepper {
  /** Secuencia ordenada de pasos y su estado actual. */
  @Input({ required: true }) steps: StepperStep[] = [];
  @Input() orientation: StepperOrientation = 'horizontal';
  /** Habilita botones nativos para que el consumidor controle el cambio de paso. */
  @Input() interactive = false;
  @Input() ariaLabel = 'Progreso';
  @Output() readonly stepClick = new EventEmitter<string>();

  protected isHorizontal(): boolean {
    return this.orientation === 'horizontal';
  }

  protected isFilled(step: StepperStep | undefined): boolean {
    return step?.state !== 'pending';
  }

  protected stepLabel(step: StepperStep, index: number): string {
    const states: Record<StepperStepState, string> = {
      done: 'completado', active: 'activo', pending: 'pendiente',
    };
    return `Paso ${index + 1}: ${step.label}, ${states[step.state]}`;
  }

  protected selectStep(step: StepperStep): void {
    if (this.interactive) this.stepClick.emit(step.id);
  }
}
