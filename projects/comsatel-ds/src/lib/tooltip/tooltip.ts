import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, Renderer2, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { componentTypography, textStyle } from '../tokens/typography';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

let tooltipIdSequence = 0;

@Component({
  selector: 'cs-tooltip',
  imports: [NgStyle],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
})
export class Tooltip implements AfterViewInit {
  @Input({ required: true }) content!: string;
  @Input() side: TooltipSide = 'top';
  @Input() arrow = true;

  protected readonly tooltipId = `cs-tooltip-${++tooltipIdSequence}`;
  private readonly dismissed = signal(false);

  @HostBinding('class.cs-tooltip--dismissed')
  protected get isDismissed(): boolean {
    return this.dismissed();
  }

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const trigger = this.host.nativeElement.querySelector<HTMLElement>(
      '.cs-tooltip__trigger :is(button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]))',
    );
    if (!trigger) return;

    const describedBy = new Set((trigger.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
    describedBy.add(this.tooltipId);
    this.renderer.setAttribute(trigger, 'aria-describedby', [...describedBy].join(' '));
  }

  @HostListener('mouseenter')
  @HostListener('focusin')
  protected restore(): void {
    this.dismissed.set(false);
  }

  @HostListener('keydown.escape', ['$event'])
  protected dismiss(event: Event): void {
    this.dismissed.set(true);
    event.stopPropagation();
  }

  get popupStyle(): Record<string, string> {
    return textStyle(componentTypography.tooltip, 'accent');
  }
}
