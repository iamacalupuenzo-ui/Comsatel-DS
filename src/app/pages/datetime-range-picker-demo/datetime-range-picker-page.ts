import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTimeRangePicker, type DateTimeRangeValue } from 'comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

@Component({
  selector: 'app-datetime-range-picker-page',
  imports: [DateTimeRangePicker, CodeBlock, RouterLink],
  templateUrl: './datetime-range-picker-page.html',
  styleUrl: './datetime-range-picker-page.css',
})
export class DateTimeRangePickerPage {
  protected readonly pgValue = signal<DateTimeRangeValue>({});
  protected readonly validationValue = signal<DateTimeRangeValue>({});

  protected readonly usageCode = `<cs-datetime-range-picker\n  dateLabel="Rango de fechas"\n  timeLabel="Ventana horaria diaria"\n  [value]="value()"\n  (valueChange)="value.set($event)"\n/>`;
}
