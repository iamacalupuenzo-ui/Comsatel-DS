import { Component, signal } from '@angular/core';
import { Button, Icon, PressScale } from 'comsatel-ds';
import { DemoShell } from '../../shared/docs/demo-shell';

@Component({
  selector: 'app-press-scale-page',
  imports: [Button, DemoShell, Icon, PressScale],
  templateUrl: './press-scale-page.html',
  styleUrl: './press-scale-page.css',
})
export class PressScalePage {
  protected readonly playgroundCount = signal(0);
  protected readonly guideCount = signal(0);
}
