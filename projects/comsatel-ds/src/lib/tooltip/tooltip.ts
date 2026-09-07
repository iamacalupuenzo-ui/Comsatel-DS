import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { componentTypography, textStyle } from '../tokens/typography';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'cs-tooltip',
  imports: [NgStyle],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
})
export class Tooltip {
  @Input({ required: true }) content!: string;
  @Input() side: TooltipSide = 'top';
  @Input() arrow = true;

  get popupStyle(): Record<string, string> {
    return textStyle(componentTypography.tooltip, 'accent');
  }
}
