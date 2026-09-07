import { Component, computed, signal } from '@angular/core';
import {
  primitiveFonts,
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
const STYLE_OPTIONS: InputDropdownOption[] = STYLE_NAMES.map((n) => ({ value: n, label: n }));
const WEIGHT_OPTIONS: InputDropdownOption[] = WEIGHT_NAMES.map((n) => ({ value: n, label: n }));

function tokenName(style: StyleName, property: 'size' | 'lineHeight'): string {
  return `--font-${property === 'size' ? 'size' : 'line-height'}-${style.replace('/', '-')}`;
}

interface PrimitiveGroup {
  title: string;
  rows: [string, string][];
}

@Component({
  selector: 'app-typography-tokens-page',
  imports: [InputDropdown],
  templateUrl: './typography-tokens-page.html',
  styleUrl: './typography-tokens-page.css',
})
export class TypographyTokensPage {
  protected readonly styleNames = STYLE_NAMES;
  protected readonly weightNames = WEIGHT_NAMES;
  protected readonly styleOptions = STYLE_OPTIONS;
  protected readonly weightOptions = WEIGHT_OPTIONS;

  protected readonly selectedStyle = signal<StyleName>('content/body');
  protected readonly selectedWeight = signal<WeightName>('regular');

  protected readonly sample = 'El sistema muestra información clara para cada recorrido. ÁÉÍÓÚ Ññ 0123456789';

  protected readonly previewStyle = computed(() => ({
    ...textStyle(this.selectedStyle(), this.selectedWeight()),
    color: 'var(--color-text-base-boldest)',
    margin: 0,
    maxWidth: '640px',
    textAlign: 'center' as const,
  }));

  protected readonly codeText = computed(() => {
    const style = this.selectedStyle();
    const weight = this.selectedWeight();
    const group = style.startsWith('heading/') ? 'heading' : 'content';
    return [
      `font-family:    var(--font-family-${group});`,
      `font-size:      var(${tokenName(style, 'size')});`,
      `line-height:    var(${tokenName(style, 'lineHeight')});`,
      `font-weight:    var(--font-weight-${weight});`,
      `letter-spacing: var(--font-letter-spacing-${group});`,
    ].join('\n');
  });

  protected readonly primitiveGroups: PrimitiveGroup[] = [
    { title: 'Familia', rows: Object.entries(primitiveFonts.family).map(([n, v]) => [`--font-primitive-family-${n}`, v]) },
    { title: 'Peso', rows: Object.entries(weights).map(([n, v]) => [`--font-weight-${n}`, v]) },
    { title: 'Tamaño', rows: Object.entries(primitiveFonts.size).map(([n, v]) => [`--font-primitive-size-${n}`, v]) },
    { title: 'Espaciado entre letras', rows: Object.entries(primitiveFonts.letterSpacing).map(([n, v]) => [`--font-primitive-letter-spacing-${n}`, v]) },
  ];

  protected onStyleChange(value: string): void {
    this.selectedStyle.set(value as StyleName);
  }
  protected onWeightChange(value: string): void {
    this.selectedWeight.set(value as WeightName);
  }

  protected defaultWeightFor(name: StyleName): WeightName {
    return textStyles[name].weight as WeightName;
  }
  protected textStyleFor(name: StyleName, weight: WeightName) {
    return { ...textStyle(name, weight), margin: 0, overflowWrap: 'anywhere' as const };
  }
  protected tokenCodeFor(name: StyleName, weight: WeightName): string {
    const group = name.startsWith('heading/') ? 'heading' : 'content';
    return [
      `font-family: var(--font-family-${group});`,
      `font-size: var(${tokenName(name, 'size')});`,
      `line-height: var(${tokenName(name, 'lineHeight')});`,
      `font-weight: var(--font-weight-${weight});`,
      `letter-spacing: var(--font-letter-spacing-${group});`,
    ].join('\n');
  }
}
