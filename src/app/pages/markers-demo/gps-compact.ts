import { Component } from '@angular/core';
import { Icon } from 'comsatel-ds';

/** Etiqueta compacta de dispositivo GPS para vistas de zoom alejado — ver
 * gps-full para la tarjeta completa que aparece a zoom cercano. */
@Component({
  selector: 'app-gps-compact',
  standalone: true,
  imports: [Icon],
  templateUrl: './gps-compact.html',
  styleUrl: './gps-compact.css',
})
export class GpsCompact {}
