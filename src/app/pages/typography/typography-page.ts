import { Component, ElementRef, ViewChild, signal, computed, effect } from '@angular/core';
import {
  componentTypography,
  textStyle,
  textStyles,
  weights,
  InputDropdown,
  type InputDropdownOption,
  type StyleName,
  type WeightName,
} from 'comsatel-ds';

const STYLE_NAMES = Object.keys(textStyles) as StyleName[];
const WEIGHT_NAMES = Object.keys(weights) as WeightName[];

const WEIGHT_LABELS: Record<WeightName, string> = {
  regular: 'Regular',
  accent: 'Medio',
  emphasis: 'Seminegrita',
  bold: 'Negrita',
};

const STYLE_OPTIONS: InputDropdownOption[] = STYLE_NAMES.map((n) => ({ value: n, label: n }));
const WEIGHT_OPTIONS: InputDropdownOption[] = WEIGHT_NAMES.map((n) => ({ value: n, label: WEIGHT_LABELS[n] }));

const GROUP_LABELS: Record<'heading' | 'content' | 'label', string> = {
  heading: 'Títulos',
  content: 'Contenido',
  label: 'Etiquetas compactas',
};

const USES: Record<StyleName, string> = {
  'heading/display': 'Titulares destacados de portadas. Evita usarlo dentro de controles o tarjetas pequeñas.',
  'heading/large': 'Título principal de una página o vista.',
  'heading/medium': 'Secciones principales y encabezados de diálogos amplios.',
  'heading/small': 'Subsecciones y encabezados de paneles.',
  'content/feature': 'Introducciones destacadas y mensajes breves de alta jerarquía.',
  'content/highlight': 'Párrafos introductorios y contenido con énfasis visual moderado.',
  'content/body': 'Párrafos, instrucciones y descripciones de lectura continua. También botón LG.',
  'content/caption': 'Texto auxiliar legible, etiquetas de formulario y mensajes de banner. También botón MD.',
  'content/ui': 'Controles de interfaces densas, pestañas y botón SM. Prefiere body para explicaciones largas.',
  'content/note': 'Metadatos breves, texto secundario, botón XS y badge LG. Evita párrafos largos.',
  'label/small': 'Badge MD y desplegables XS heredados. Uso compacto excepcional; evita instrucciones esenciales.',
  'label/micro': 'Badge SM e iniciales de avatar XS. Evita texto de lectura o información esencial aislada.',
};

const RULES: [string, string][] = [
  ['Escala funcional', 'Conservamos los tamaños existentes de 12 a 48 px (con raíz de 16 px). Es una escala por función, no una progresión matemática única. Los tamaños de 10 y 11 px quedan separados como excepciones compactas.'],
  ['Interlineado proporcional', 'El contenido utiliza 1.5 veces su tamaño; los títulos, proporciones más ajustadas. El cálculo depende del token de tamaño: si cambia, el interlineado lo acompaña.'],
  ['Centrado y espacio disponible', 'Flexbox centra la caja de línea. El centrado óptico depende de la fuente, sus métricas y el contexto; no se garantiza con una fracción de píxel.'],
  ['Accesibilidad', 'Evalúa zoom de 200% y ajustes de interlineado 1.5, espaciado entre letras 0.12em, entre palabras 0.16em y después de párrafos 2em, sin recortes ni pérdida de funciones.'],
  ['Jerarquía semántica', 'Elige h1-h6 según la estructura del documento, no por el tamaño visual. Un estilo tipográfico no cambia el significado del elemento HTML.'],
];

interface PropertyRow {
  label: string;
  value: string;
}

@Component({
  selector: 'app-typography-page',
  imports: [InputDropdown],
  templateUrl: './typography-page.html',
  styleUrl: './typography-page.css',
})
export class TypographyPage {
  protected readonly styleNames = STYLE_NAMES;
  protected readonly weightNames = WEIGHT_NAMES;
  protected readonly weightLabels = WEIGHT_LABELS;
  protected readonly styleOptions = STYLE_OPTIONS;
  protected readonly weightOptions = WEIGHT_OPTIONS;
  protected readonly groups = ['heading', 'content', 'label'] as const;
  protected readonly groupLabels = GROUP_LABELS;
  protected readonly uses = USES;
  protected readonly rules = RULES;
  protected readonly componentTypography = componentTypography;

  protected readonly selectedStyle = signal<StyleName>('content/body');
  protected readonly selectedWeight = signal<WeightName>('regular');
  protected readonly sampleText = signal(
    '¿Dónde está tu vehículo? Revisa la ubicación, el próximo envío y la señal. ÁÉÍÓÚ · áéíóú · Ññ · Üü · 0123456789',
  );

  @ViewChild('probe') probeRef?: ElementRef<HTMLSpanElement>;
  protected readonly properties = signal<PropertyRow[]>([]);

  protected readonly previewStyle = computed(() => textStyle(this.selectedStyle(), this.selectedWeight()));
  protected readonly codeText = computed(() =>
    Object.entries(this.previewStyle())
      .map(([k, v]) => `${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${v};`)
      .join('\n'),
  );

  constructor() {
    effect(() => {
      // Se re-ejecuta cuando cambian selectedStyle/selectedWeight (leídos más
      // abajo) — mide el <span> oculto igual que el probe con ResizeObserver
      // en TypographyPageContent.tsx, pero sin necesitar el observer porque
      // acá no hay resize de viewport que reajuste la fuente.
      this.selectedStyle();
      this.selectedWeight();
      queueMicrotask(() => this.measure());
    });
  }

  private measure(): void {
    const el = this.probeRef?.nativeElement;
    if (!el) return;
    const s = getComputedStyle(el);
    this.properties.set([
      { label: 'Familia', value: s.fontFamily },
      { label: 'Tamaño', value: s.fontSize },
      { label: 'Interlineado', value: s.lineHeight },
      { label: 'Peso', value: s.fontWeight },
      { label: 'Espaciado entre letras', value: s.letterSpacing },
    ]);
  }

  protected onStyleChange(value: string): void {
    const next = value as StyleName;
    this.selectedStyle.set(next);
    this.selectedWeight.set(textStyles[next].weight as WeightName);
  }

  protected onWeightChange(value: string): void {
    this.selectedWeight.set(value as WeightName);
  }

  protected onSampleChange(value: string): void {
    this.sampleText.set(value);
  }

  protected stylesInGroup(group: 'heading' | 'content' | 'label'): StyleName[] {
    return this.styleNames.filter((n) => n.startsWith(`${group}/`));
  }

  protected defaultWeightFor(name: StyleName): WeightName {
    return textStyles[name].weight as WeightName;
  }

  protected textStyleFor(name: StyleName, weight?: WeightName) {
    return textStyle(name, weight);
  }

  protected readonly buttonSizes = Object.keys(componentTypography.button) as Array<keyof typeof componentTypography.button>;
  protected readonly badgeSizes = Object.keys(componentTypography.badge) as Array<keyof typeof componentTypography.badge>;
  protected readonly avatarSizes = Object.keys(componentTypography.avatar) as Array<keyof typeof componentTypography.avatar>;

  protected buttonStyleFor(size: keyof typeof componentTypography.button): string {
    return componentTypography.button[size];
  }
  protected badgeStyleFor(size: keyof typeof componentTypography.badge): string {
    return componentTypography.badge[size];
  }
  protected avatarStyleFor(size: keyof typeof componentTypography.avatar): string {
    return componentTypography.avatar[size];
  }
}
