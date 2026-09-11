import { Component } from '@angular/core';
import { Icon } from 'comsatel-ds';

/** Tarjeta completa de dispositivo GPS con hora y estado de señal, para
 * vistas de zoom cercano — ver gps-compact para la etiqueta reducida. */
@Component({
  selector: 'app-gps-full',
  standalone: true,
  imports: [Icon],
  templateUrl: './gps-full.html',
  styleUrl: './gps-full.css',
})
export class GpsFull {}
