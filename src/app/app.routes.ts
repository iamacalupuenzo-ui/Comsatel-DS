import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'foundations/tokens',
    loadComponent: () => import('./pages/tokens/tokens-page').then((m) => m.TokensPage),
  },
  {
    path: 'foundations/color',
    loadComponent: () =>
      import('./pages/color-overview/color-overview-page').then((m) => m.ColorOverviewPage),
  },
  {
    path: 'foundations/color/palette',
    loadComponent: () =>
      import('./pages/color-palette/color-palette-page').then((m) => m.ColorPalettePage),
  },
  {
    path: 'foundations/color/semantic',
    loadComponent: () =>
      import('./pages/color-semantic/color-semantic-page').then((m) => m.ColorSemanticPage),
  },
  {
    path: 'foundations/typography',
    loadComponent: () =>
      import('./pages/typography/typography-page').then((m) => m.TypographyPage),
  },
  {
    path: 'foundations/typography/tokens',
    loadComponent: () =>
      import('./pages/typography-tokens/typography-tokens-page').then((m) => m.TypographyTokensPage),
  },
  {
    path: 'foundations/spacing',
    loadComponent: () => import('./pages/spacing/spacing-page').then((m) => m.SpacingPage),
  },
  {
    path: 'foundations/spacing/tokens',
    loadComponent: () =>
      import('./pages/spacing-tokens/spacing-tokens-page').then((m) => m.SpacingTokensPage),
  },
  {
    path: 'foundations/radius',
    loadComponent: () => import('./pages/radius/radius-page').then((m) => m.RadiusPage),
  },
  {
    path: 'foundations/icons',
    loadComponent: () => import('./pages/icons/icons-page').then((m) => m.IconsPage),
  },
  {
    path: 'foundations/effects',
    loadComponent: () => import('./pages/effects/effects-page').then((m) => m.EffectsPage),
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./pages/avatar-demo/avatar-page').then((m) => m.AvatarPage),
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./pages/badge-demo/badge-page').then((m) => m.BadgePage),
  },
  {
    path: 'components/banner',
    loadComponent: () => import('./pages/banner-demo/banner-page').then((m) => m.BannerPage),
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/checkbox-demo/checkbox-page').then((m) => m.CheckboxPage),
  },
  {
    path: 'components/toggle',
    loadComponent: () => import('./pages/toggle-demo/toggle-page').then((m) => m.TogglePage),
  },
  {
    path: 'components/tooltip',
    loadComponent: () => import('./pages/tooltip-demo/tooltip-page').then((m) => m.TooltipPage),
  },
  {
    path: 'components/dropdown',
    loadComponent: () => import('./pages/dropdown-demo/dropdown-page').then((m) => m.DropdownPage),
  },
  {
    path: 'components/input',
    loadComponent: () => import('./pages/input-demo/input-page').then((m) => m.InputPage),
  },
  {
    path: 'components/calendar',
    loadComponent: () => import('./pages/calendar-demo/calendar-page').then((m) => m.CalendarPage),
  },
  {
    path: 'components/datetime-picker',
    loadComponent: () =>
      import('./pages/datetime-picker-demo/datetime-picker-page').then((m) => m.DateTimePickerPage),
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/card-demo/card-page').then((m) => m.CardPage),
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/button-demo/button-page').then((m) => m.ButtonPage),
  },
];
