import { Component } from '@angular/core';
import {
  ActionCard,
  CardBanner,
  FeatureSpotlightCard,
  Icon,
  PreviewCard,
  SpotlightCard,
  type AvatarGroupItem,
} from 'comsatel-ds';
import { DemoShell } from '../../shared/docs/demo-shell';

// cs-avatar-group no fabrica placeholders solo — a diferencia de React
// (que mostraba 3 círculos de color cuando `avatars.length === 0`), acá
// hay que pasar explícitamente los items vacíos para que el placeholder
// real de cs-avatar (ícono de silueta) aparezca 3 veces.
const PLACEHOLDER_AVATARS: AvatarGroupItem[] = [{}, {}, {}];

const BANNER_VARIANTS = [
  { variant: 'neutral' as const, title: 'Neutral', desc: 'Estado por defecto, sin urgencia asociada.', badge: 'Info' },
  { variant: 'brand' as const, title: 'Brand', desc: 'Destaca una novedad o funcionalidad nueva.', badge: 'Nuevo' },
  { variant: 'success' as const, title: 'Success', desc: 'Confirma que una acción se completó correctamente.', badge: 'Aprobado' },
  { variant: 'warning' as const, title: 'Warning', desc: 'Señala algo que requiere atención antes de continuar.', badge: 'Revisar' },
  { variant: 'destructive' as const, title: 'Destructive', desc: 'Indica un error o un estado bloqueante.', badge: 'Error' },
];

@Component({
  selector: 'app-card-page',
  imports: [ActionCard, CardBanner, FeatureSpotlightCard, SpotlightCard, PreviewCard, Icon, DemoShell],
  templateUrl: './card-page.html',
  styleUrl: './card-page.css',
})
export class CardPage {
  protected readonly bannerVariants = BANNER_VARIANTS;
  protected readonly placeholderAvatars = PLACEHOLDER_AVATARS;
}
