import { Component } from '@angular/core';
import { primitiveColors } from 'comsatel-ds';

const SHADES = ['050', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

interface FamilyDef {
  key: keyof typeof primitiveColors;
  label: string;
  description: string;
}

const FAMILY_DEFS: FamilyDef[] = [
  { key: 'brand', label: 'Brand', description: 'Identidad central de la marca. Se usa en acciones primarias, links, estados activos y expresiones de marca.' },
  { key: 'gray', label: 'Gray', description: 'Base neutral para texto, fondos, separadores y elementos de UI sutiles en todos los temas.' },
  { key: 'success', label: 'Success', description: 'Feedback positivo, acciones confirmadas, indicadores de conexión y banners de éxito.' },
  { key: 'danger', label: 'Danger', description: 'Estados de error, acciones destructivas, alertas críticas y fallos de validación.' },
  { key: 'warning', label: 'Warning', description: 'Estados de precaución que requieren atención del usuario antes de continuar.' },
  { key: 'teal', label: 'Teal', description: 'Acento complementario para contextos tranquilos y fríos, indicadores de datos y destacados temáticos.' },
  { key: 'lime', label: 'Lime', description: 'Contextos de crecimiento, naturaleza y temáticas eco. Se usa en indicadores de tendencias positivas.' },
  { key: 'blue', label: 'Blue', description: 'Estados informativos, links secundarios y elementos interactivos de soporte.' },
  { key: 'purple', label: 'Purple', description: 'Experiencias premium, creativas o con feature flags, y acentos por categoría.' },
  { key: 'pink', label: 'Pink', description: 'Badges de notificación, momentos expresivos y llamadas de atención vibrantes.' },
  { key: 'yellow', label: 'Yellow', description: 'Destacados, marcadores y acentos de tono cálido que captan la atención.' },
];

@Component({
  selector: 'app-color-palette-page',
  templateUrl: './color-palette-page.html',
  styleUrl: './color-palette-page.css',
})
export class ColorPalettePage {
  protected readonly families = FAMILY_DEFS.map(({ key, label, description }) => {
    const palette = primitiveColors[key] as Record<string, string>;
    const shades = SHADES.filter((s) => palette[s]);
    return { key, label, description, palette, shades, mainColor: palette['500'] ?? '#000' };
  });

  protected readonly baseColors = [
    { name: 'Blanco', token: 'root-color-base-white', hex: '#ffffff' },
    { name: 'Negro', token: 'root-color-base-black', hex: '#000000' },
    { name: 'Transparente', token: 'root-color-base-transparent', hex: 'transparent' },
  ];
}
