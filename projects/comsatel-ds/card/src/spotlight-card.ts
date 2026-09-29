import { Component, Input } from '@angular/core';
import { FeatureSpotlightCard } from './feature-spotlight-card';

// Puerto 1:1 de SpotlightCard — envuelve FeatureSpotlightCard (constelación
// de avatares) con un pie de título/descripción.
@Component({
  selector: 'cs-spotlight-card',
  imports: [FeatureSpotlightCard],
  templateUrl: './spotlight-card.html',
  styleUrl: './spotlight-card.css',
})
export class SpotlightCard {
  @Input() title = 'Invite your team';
  @Input() description = 'Share updates and sync design changes';
  @Input() avatars: string[] = [];
}
