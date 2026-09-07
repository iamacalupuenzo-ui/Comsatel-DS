import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Role {
  role: string;
  token: string;
  description: string;
  colors: string[];
}
interface Emphasis {
  label: string;
  cssVar: string;
}
interface State {
  label: string;
  bg: string;
  border: string;
}
interface Subpage {
  title: string;
  href: string;
  description: string;
}
interface AnatomyItem {
  label: string;
  desc: string;
  palette: string[];
}

@Component({
  selector: 'app-color-overview-page',
  imports: [RouterLink],
  templateUrl: './color-overview-page.html',
  styleUrl: './color-overview-page.css',
})
export class ColorOverviewPage {
  protected readonly anatomy: AnatomyItem[] = [
    {
      label: '01. Primitivos',
      desc: '11 familias de color (brand, gray, success, danger, warning + 6 acentos), cada una con 10 tonos de 050 a 900.',
      palette: ['#e0eaff', '#a4bcfb', '#6172f3', '#444ce7', '#3538cd', '#2d31a6', '#2d3282', '#1e2340', '#1a1d40', '#0f1230'],
    },
    {
      label: '02. Tokens semánticos',
      desc: 'Nombrados por rol y énfasis (ej. color/background/brand/subtle). Se usan directo en componentes, nunca primitivos.',
      palette: ['var(--color-background-brand-subtlest)', 'var(--color-background-brand-subtle)', 'var(--color-background-brand-default)', 'var(--color-text-brand-default)', 'var(--color-border-brand-default)', 'var(--color-icon-brand-default)', 'var(--color-text-brand-bolder)', 'var(--color-background-brand-bolder)', 'var(--color-background-brand-boldest)', 'var(--color-background-brand-strongest)'],
    },
    {
      label: '03. Modos de tema',
      desc: 'Light y Dark. Cada modo mapea los tokens semánticos a distintos primitivos, sin cambios de código.',
      palette: ['#f9fafb', '#f2f4f7', '#eaecf0', '#d0d5dd', '#98a2b3', '#667085', '#344054', '#1d2939', '#101828', '#0c0e16'],
    },
  ];

  protected readonly roles: Role[] = [
    { role: 'Background', token: 'color/background/*', description: 'Rellena superficies, contenedores y regiones de página. Va desde subtlest (apenas visible) hasta boldest (relleno a saturación total).', colors: ['var(--color-background-neutral-subtlest)', 'var(--color-background-neutral-subtle)', 'var(--color-background-neutral-default)', 'var(--color-background-brand-subtlest)', 'var(--color-background-brand-default)'] },
    { role: 'Text', token: 'color/text/*', description: 'Se aplica a todo el contenido tipográfico. Incluye niveles de jerarquía base y variantes semánticas para estados de feedback.', colors: ['var(--color-text-base-subtlest)', 'var(--color-text-base-subtle)', 'var(--color-text-base-default)', 'var(--color-text-base-bolder)', 'var(--color-text-base-boldest)'] },
    { role: 'Border', token: 'color/border/*', description: 'Bordes de inputs, cards y separadores. Va desde líneas invisibles hasta bordes de énfasis para foco y selección.', colors: ['var(--color-border-neutral-subtlest)', 'var(--color-border-neutral-subtle)', 'var(--color-border-neutral-default)', 'var(--color-border-brand-default)', 'var(--color-border-focused)'] },
    { role: 'Icon', token: 'color/icon/*', description: 'Controla el relleno o trazo de íconos. Refleja la jerarquía de texto con variantes neutrales y semánticas.', colors: ['var(--color-icon-neutral-subtlest)', 'var(--color-icon-neutral-subtle)', 'var(--color-icon-neutral-default)', 'var(--color-icon-brand-default)', 'var(--color-icon-selected)'] },
    { role: 'Shadow', token: 'color/shadow/*', description: 'Sombras con tinte de color que refuerzan elevación y profundidad sin usar negro puro, adaptándose a cada tema.', colors: ['var(--color-background-neutral-subtlest)', 'var(--color-background-neutral-subtle)', 'var(--color-background-neutral-default)', 'var(--color-background-neutral-bolder)', 'var(--color-background-neutral-boldest)'] },
    { role: 'Elevation surface', token: 'elevation/surface/*', description: 'Colores de fondo para superficies UI en capas: página base, cards elevadas, overlays y pozos hundidos.', colors: ['var(--elevation-surface-sunken)', 'var(--elevation-surface-default)', 'var(--elevation-surface-raised)', 'var(--elevation-surface-overlay)', 'var(--color-background-neutral-boldest)'] },
  ];

  protected readonly emphasisLevels: Emphasis[] = [
    { label: 'Subtlest', cssVar: '--color-background-brand-subtlest' },
    { label: 'Subtle', cssVar: '--color-background-brand-subtle' },
    { label: 'Default', cssVar: '--color-background-brand-default' },
    { label: 'Bolder', cssVar: '--color-background-brand-bolder' },
    { label: 'Boldest', cssVar: '--color-background-brand-boldest' },
  ];

  protected readonly states: State[] = [
    { label: 'Default', bg: 'var(--color-background-brand-default)', border: 'transparent' },
    { label: 'Hover', bg: 'var(--color-background-brand-bolder)', border: 'transparent' },
    { label: 'Pressed', bg: 'var(--color-background-brand-boldest)', border: 'transparent' },
    { label: 'Selected', bg: 'var(--color-background-brand-subtlest)', border: 'var(--color-border-selected)' },
    { label: 'Focused', bg: 'var(--color-background-brand-subtlest)', border: 'var(--color-border-focused)' },
    { label: 'Disabled', bg: 'var(--color-background-disabled)', border: 'transparent' },
  ];

  protected readonly subpages: Subpage[] = [
    { title: 'Paleta de color', href: '/foundations/color/palette', description: 'Referencia completa de colores primitivos con valores hex para las 11 familias de color (escalas 050-900).' },
    { title: 'Tokens semánticos', href: '/foundations/color/semantic', description: 'Todos los tokens semánticos organizados por rol: background, text, border, icon, shadow, con guías de uso.' },
  ];

  protected emphasisShortLabel(cssVar: string): string {
    return cssVar.replace('--color-background-brand-', '');
  }
}
