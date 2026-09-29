import { Component, computed, signal } from '@angular/core';
import { Skeleton, type SkeletonVariant } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const VARIANTS: { value: SkeletonVariant; label: string; when: string }[] = [
  { value: 'text', label: 'Texto', when: 'Líneas de texto mientras llega el contenido: títulos, párrafos o celdas de tabla.' },
  { value: 'rectangle', label: 'Rectángulo', when: 'Bloques con forma propia: tarjetas, imágenes, gráficos o un mapa.' },
  { value: 'circle', label: 'Círculo', when: 'Avatares e íconos redondos de una fila o una tarjeta.' },
];

@Component({
  selector: 'app-skeleton-page',
  imports: [Skeleton, DemoShell],
  templateUrl: './skeleton-page.html',
  styleUrl: './skeleton-page.css',
})
export class SkeletonPage {
  protected readonly states = VARIANTS;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'variant', options: VARIANTS.map(({ value, label }) => ({ value, label })), default: 'text' },
    { kind: 'select', label: 'Ancho', key: 'width', options: ['100%', '75%', '50%'], default: '100%' },
  ];
  protected readonly variant = signal<SkeletonVariant>('text');
  protected readonly width = signal('100%');
  protected readonly info = computed(() => VARIANTS.find((v) => v.value === this.variant()) ?? VARIANTS[0]);
  protected readonly size = computed(() => (this.variant() === 'circle' ? 40 : this.variant() === 'rectangle' ? 96 : undefined));
  protected stateCode(variant: SkeletonVariant): string { return `<cs-skeleton variant="${variant}" ${variant === 'circle' ? '[width]="40" [height]="40"' : variant === 'rectangle' ? 'width="100%" [height]="96"' : 'width="100%"'} />`; }

  protected onState(s: DemoState): void {
    if (s['variant']) this.variant.set(s['variant'] as SkeletonVariant);
    if (s['width']) this.width.set(String(s['width']));
  }

  protected readonly code = computed(() => {
    if (this.variant() === 'circle') return '<cs-skeleton variant="circle" [width]="40" [height]="40" />';
    if (this.variant() === 'rectangle') return `<cs-skeleton variant="rectangle" width="${this.width()}" [height]="96" />`;
    return `<cs-skeleton width="${this.width()}" />`;
  });

  protected readonly cardCode = '<div class="card">\n  <cs-skeleton variant="circle" [width]="40" [height]="40" />\n  <cs-skeleton width="60%" />\n  <cs-skeleton width="90%" />\n</div>';
  protected readonly tableCode = '@for (row of [1, 2, 3]; track row) {\n  <div class="row">\n    <cs-skeleton width="30%" />\n    <cs-skeleton width="20%" />\n    <cs-skeleton width="35%" />\n  </div>\n}';
}
