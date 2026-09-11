import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'tracking/evaluation',
    loadComponent: () =>
      import('./pages/evaluation-tracking/evaluation-tracking-page').then((m) => m.EvaluationTrackingPage),
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
    path: 'foundations/layout',
    loadComponent: () => import('./pages/layout/layout-page').then((m) => m.LayoutPage),
  },
  {
    path: 'components/accordion',
    loadComponent: () => import('./pages/accordion-demo/accordion-page').then((m) => m.AccordionPage),
  },
  {
    path: 'components/app-layout',
    loadComponent: () => import('./pages/app-layout-demo/app-layout-page').then((m) => m.AppLayoutPage),
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
    path: 'components/tag',
    loadComponent: () => import('./pages/tag-demo/tag-page').then((m) => m.TagPage),
  },
  {
    path: 'components/progress-indicator',
    loadComponent: () => import('./pages/progress-indicator-demo/progress-indicator-page').then((m) => m.ProgressIndicatorPage),
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
  { path: 'components/header', loadComponent: () => import('./pages/header-demo/header-page').then((m) => m.HeaderPage) },
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
  {
    path: 'components/radio',
    loadComponent: () => import('./pages/radio-demo/radio-page').then((m) => m.RadioPage),
  },
  {
    path: 'components/tab',
    loadComponent: () => import('./pages/tab-demo/tab-page').then((m) => m.TabPage),
  },
  {
    path: 'components/pagination',
    loadComponent: () => import('./pages/pagination-demo/pagination-page').then((m) => m.PaginationPage),
  },
  {
    path: 'components/toast',
    loadComponent: () => import('./pages/toast-demo/toast-page').then((m) => m.ToastPage),
  },
  {
    path: 'components/popover',
    loadComponent: () => import('./pages/popover-demo/popover-page').then((m) => m.PopoverPage),
  },
  {
    path: 'components/select',
    loadComponent: () => import('./pages/select-demo/select-page').then((m) => m.SelectPage),
  },
  {
    path: 'components/spotlight',
    loadComponent: () => import('./pages/spotlight-demo/spotlight-page').then((m) => m.SpotlightPage),
  },
  {
    path: 'components/stepper',
    redirectTo: 'components/progress-indicator',
  },
  {
    path: 'components/datetime-range-picker',
    loadComponent: () =>
      import('./pages/datetime-range-picker-demo/datetime-range-picker-page').then((m) => m.DateTimeRangePickerPage),
  },
  {
    path: 'components/menu',
    loadComponent: () => import('./pages/menu-demo/menu-page').then((m) => m.MenuPage),
  },
  {
    path: 'components/table',
    loadComponent: () => import('./pages/table-demo/table-page').then((m) => m.TablePage),
  },
  {
    path: 'components/table-tree',
    loadComponent: () => import('./pages/table-tree-demo/table-tree-page').then((m) => m.TableTreePage),
  },
  {
    path: 'components/modal',
    loadComponent: () => import('./pages/modal-demo/modal-page').then((m) => m.ModalPage),
  },
  {
    path: 'map/theme',
    loadComponent: () => import('./pages/map-theme-demo/map-theme-page').then((m) => m.MapThemePage),
  },
  {
    path: 'map/markers',
    loadComponent: () => import('./pages/markers-demo/markers-page').then((m) => m.MarkersPage),
  },
  {
    path: 'animations/tokens',
    loadComponent: () => import('./pages/motion-tokens-demo/motion-tokens-page').then((m) => m.MotionTokensPage),
  },
  {
    path: 'animations/motion',
    loadComponent: () => import('./pages/motion-demo/motion-page').then((m) => m.MotionPage),
  },
  {
    path: 'animations/press-scale',
    loadComponent: () => import('./pages/press-scale-demo/press-scale-page').then((m) => m.PressScalePage),
  },
];
