import { Component, Input, signal } from '@angular/core';
import { Motion, type MotionPreset } from 'comsatel-ds';

@Component({
  selector: 'app-preset-card',
  standalone: true,
  imports: [Motion],
  templateUrl: './preset-card.html',
  styleUrl: './preset-card.css',
})
export class PresetCard {
  @Input({ required: true }) preset!: MotionPreset;
  @Input({ required: true }) label!: string;

  protected readonly show = signal(true);

  protected toggle(): void {
    this.show.update((v) => !v);
  }
}
