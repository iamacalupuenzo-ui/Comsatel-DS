import { Component, computed, signal } from '@angular/core';
import { Pagination } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const TOTAL_PAGES_OPTIONS = ['3', '10', '25'] as const;

@Component({
  selector: 'app-pagination-page',
  imports: [Pagination, DemoShell],
  templateUrl: './pagination-page.html',
  styleUrl: './pagination-page.css',
})
export class PaginationPage {
  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Total de páginas', key: 'totalPages', options: TOTAL_PAGES_OPTIONS, default: '10' },
  ];
  protected readonly pgTotalPages = signal(10);
  protected readonly pgPage = signal(1);

  protected onPlaygroundState(s: DemoState): void {
    if (s['totalPages']) {
      const total = Number(s['totalPages']);
      this.pgTotalPages.set(total);
      this.pgPage.set(Math.min(this.pgPage(), total));
    }
  }

  protected readonly pgCode = computed(
    () => `const page = signal(1);\n\n<cs-pagination [totalPages]="${this.pgTotalPages()}" [page]="page()" (pageChange)="page.set($event)" />`,
  );

  /* Variantes */
  protected readonly numberedPage = signal(4);
  protected readonly simplePage = signal(4);

  /* Salto a primera/última */
  protected readonly fewPage = signal(3);
  protected readonly manyPage = signal(10);

  /* Truncado */
  protected readonly edgePage = signal(2);
  protected readonly middlePage = signal(6);

  /* Estados de borde */
  protected readonly firstPage = signal(1);
  protected readonly lastPage = signal(5);

  /* Lineamientos */
  protected readonly guideAPage = signal(3);
  protected readonly guideBPage = signal(3);
  protected readonly guideCPage = signal(18);
  protected readonly manyNumbers = Array.from({ length: 40 }, (_, i) => i + 1);
}
