import { Component, computed, signal } from '@angular/core';
import { Motion, type MotionPreset } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { PresetCard } from './preset-card';

const PRESETS: MotionPreset[] = ['fade', 'scale', 'slide-up', 'slide-down', 'slide-left', 'slide-right'];

const PRESET_LABELS: Record<MotionPreset, string> = {
  fade: 'fade',
  scale: 'scale',
  'slide-up': 'slide-up',
  'slide-down': 'slide-down',
  'slide-left': 'slide-left',
  'slide-right': 'slide-right',
};

@Component({
  selector: 'app-motion-page',
  imports: [Motion, DemoShell, PresetCard],
  templateUrl: './motion-page.html',
  styleUrl: './motion-page.css',
})
export class MotionPage {
  protected readonly presets = PRESETS;
  protected readonly presetLabels = PRESET_LABELS;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Preset', key: 'preset', options: PRESETS, default: 'fade' },
    { kind: 'toggle', label: 'Mostrar', key: 'show', default: true },
  ];
  protected readonly pgPreset = signal<MotionPreset>('fade');
  protected readonly pgShow = signal(true);

  protected onPlaygroundState(s: DemoState): void {
    if (s['preset']) this.pgPreset.set(s['preset'] as MotionPreset);
    if (s['show'] !== undefined) this.pgShow.set(s['show'] as boolean);
  }

  protected readonly pgCode = computed(
    () =>
      `import { Motion } from 'comsatel-ds';\n\n` +
      `<cs-motion [show]="${this.pgShow()}" preset="${this.pgPreset()}">\n` +
      `  <div>...</div>\n` +
      `</cs-motion>`,
  );
}
