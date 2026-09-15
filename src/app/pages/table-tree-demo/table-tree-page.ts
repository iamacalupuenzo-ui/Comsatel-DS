import { Component, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { Tag, TableTree, type IconName, type TableTreeColumn, type TableTreeItem, type TagSeverity } from 'comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

// Mismo criterio de estado que ya usa FleetUnitList (fleet-unit-list.ts:
// STATUS_SEVERITY/STATUS_ICON) — un solo lenguaje visual de estado en todo
// el sistema, no una variante local nueva por página.
const STATUS_LABEL: Record<string, string> = { active: 'Activo', stopped: 'Detenido', offline: 'Sin señal' };
const STATUS_SEVERITY: Record<string, TagSeverity> = { active: 'success', stopped: 'warn', offline: 'secondary' };
const STATUS_ICON: Record<string, IconName> = { active: 'activity', stopped: 'circle-pause', offline: 'wifi-off' };

const COLUMNS: TableTreeColumn[] = [
  { key: 'name', label: 'Nombre', width: '45%' },
  { key: 'status', label: 'Estado', width: '25%' },
  { key: 'updated', label: 'Actualizado', width: '30%' },
];

@Component({
  selector: 'app-table-tree-page',
  imports: [TableTree, Tag, CodeBlock],
  templateUrl: './table-tree-page.html',
  styleUrl: './table-tree-page.css',
})
export class TableTreePage implements OnInit {
  protected readonly columns = COLUMNS;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly statusSeverity = STATUS_SEVERITY;
  protected readonly statusIcon = STATUS_ICON;

  @ViewChild('statusCell', { static: true }) private statusCellRef!: TemplateRef<unknown>;

  protected items: TableTreeItem[] = [];
  protected readonly expandedIds = signal<string[]>(['norte']);

  protected readonly lazyItems = signal<TableTreeItem[]>([]);
  protected readonly lazyExpanded = signal<string[]>([]);

  ngOnInit(): void {
    const status = (s: string) => ({ template: this.statusCellRef, context: { $implicit: s } });

    this.items = [
      {
        id: 'norte',
        cells: ['Región Norte', status('active'), '—'],
        children: [
          { id: 'norte-04', cells: ['Camión Norte 04', status('active'), 'hace 2 min'] },
          { id: 'norte-07', cells: ['Camión Norte 07', status('stopped'), 'hace 14 min'] },
        ],
      },
      {
        id: 'sur',
        cells: ['Región Sur', status('offline'), '—'],
        children: [{ id: 'sur-12', cells: ['Furgón Sur 12', status('offline'), 'hace 3 h'] }],
      },
    ];

    this.lazyItems.set(this.freshLazyRegions());
  }

  private freshLazyRegions(): TableTreeItem[] {
    return [
      { id: 'lazy-norte', cells: ['Región Norte', '—', '—'], hasChildren: true, skeletonRowCount: 6 },
      { id: 'lazy-sur', cells: ['Región Sur', '—', '—'], hasChildren: true, skeletonRowCount: 3 },
    ];
  }

  // Carga perezosa: los hijos empiezan undefined y se resuelven recién al
  // expandir por primera vez (filas skeleton mientras tanto, ver
  // table-tree.ts / TableTreeItem.children). skeletonRowCount refleja acá
  // el total real que va a resolver cada región — 6 unidades para Norte, 3
  // para Sur — para que el número de filas skeleton no cambie de golpe al
  // número de filas reales.
  //
  // Al CERRAR una región, esta demo descarta sus hijos ya cargados
  // (vuelven a `undefined`) — así cada apertura vuelve a mostrar el
  // skeleton, útil para revisar la carga repetidas veces. Es una decisión
  // de esta página de documentación, no del componente: en una app real,
  // si los datos no cambian entre aperturas, lo normal es conservarlos
  // (`TableTreeItem.children` es 100% responsabilidad del consumidor).
  protected onLazyExpandedChange(ids: string[]): void {
    const previouslyOpen = this.lazyExpanded();
    this.lazyExpanded.set(ids);

    const closed = previouslyOpen.filter((id) => !ids.includes(id));
    if (closed.length > 0) {
      this.lazyItems.update((items) =>
        items.map((r) => (closed.includes(r.id) ? { ...r, children: undefined } : r)),
      );
    }

    const status = (s: string) => ({ template: this.statusCellRef, context: { $implicit: s } });
    for (const id of ids) {
      const region = this.lazyItems().find((r) => r.id === id);
      if (region && region.children === undefined) {
        const count = region.skeletonRowCount ?? 1;
        setTimeout(() => {
          this.lazyItems.update((items) =>
            items.map((r) =>
              r.id === id && this.lazyExpanded().includes(id)
                ? {
                    ...r,
                    children: Array.from({ length: count }, (_, i) => ({
                      id: `${id}-u${i + 1}`,
                      cells: [`Unidad ${i + 1}`, status(i % 2 === 0 ? 'active' : 'stopped'), `hace ${i + 1} min`],
                    })),
                  }
                : r,
            ),
          );
        }, 900);
      }
    }
  }

  protected readonly usageCode = `<cs-table-tree\n  [columns]="columns"\n  [items]="items"\n  [expandedIds]="expandedIds()"\n  (expandedIdsChange)="expandedIds.set($event)"\n>\n  <div emptyState>Sin resultados</div>\n</cs-table-tree>`;
}
