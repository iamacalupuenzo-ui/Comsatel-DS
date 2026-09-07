import { AfterViewInit, Component, signal } from '@angular/core';

type Group = 'padding' | 'gap';
interface Step {
  name: string;
  token: string;
  use: string;
}

const STEP_NAMES_PADDING = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
const STEP_NAMES_GAP = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

function useFor(group: Group, name: string): string {
  const compact = ['2XS', 'XS', 'SM'].includes(name);
  const large = ['2XL', '3XL', '4XL', '5XL', '6XL'].includes(name);
  if (name === 'NONE') {
    return group === 'padding'
      ? 'Sin espacio interno: divisores, imágenes a sangre o contenedores que ya reciben padding.'
      : 'Sin separación cuando los elementos deben leerse como una sola unidad visual.';
  }
  if (compact) {
    return group === 'padding'
      ? 'Para chips, iconos y relaciones densas dentro de controles compactos.'
      : 'Para icono y texto, chips o pares de elementos muy cercanos.';
  }
  if (large) {
    return group === 'padding'
      ? 'Para tarjetas destacadas, secciones internas y superficies con contenido amplio.'
      : 'Para separar grupos funcionales y bloques principales de una página.';
  }
  return group === 'padding'
    ? 'Ritmo base para controles, filas y padding habitual de tarjetas o banners.'
    : 'Ritmo base entre campos, filas y elementos relacionados de contenido.';
}

function buildSteps(group: Group, names: string[]): Step[] {
  return names.map((name) => ({
    name: name.toUpperCase(),
    token: `--layout-${group}-${name}`,
    use: useFor(group, name.toUpperCase()),
  }));
}

@Component({
  selector: 'app-spacing-tokens-page',
  templateUrl: './spacing-tokens-page.html',
  styleUrl: './spacing-tokens-page.css',
})
export class SpacingTokensPage implements AfterViewInit {
  protected readonly groups: { key: Group; title: string; use: string; steps: Step[] }[] = [
    { key: 'padding', title: 'Padding', use: 'Espacio interno', steps: buildSteps('padding', STEP_NAMES_PADDING) },
    { key: 'gap', title: 'Gap', use: 'Espacio entre elementos hermanos', steps: buildSteps('gap', STEP_NAMES_GAP) },
  ];

  protected readonly resolvedValues = signal<Record<string, string>>({});

  ngAfterViewInit(): void {
    this.refreshValues();
  }

  private refreshValues(): void {
    const css = getComputedStyle(document.documentElement);
    const all: Record<string, string> = {};
    for (const group of this.groups) {
      for (const step of group.steps) {
        all[step.token] = css.getPropertyValue(step.token).trim();
      }
    }
    this.resolvedValues.set(all);
  }

  protected resolvedValueFor(token: string): string {
    return this.resolvedValues()[token] ?? '';
  }
}
