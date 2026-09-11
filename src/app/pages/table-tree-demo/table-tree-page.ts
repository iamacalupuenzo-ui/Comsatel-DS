import { Component, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { Badge, TableTree, type BadgeVariant, type TableTreeColumn, type TableTreeItem } from 'comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

const STATUS_LABEL: Record<string, string> = { active: 'Activo', stopped: 'Detenido', offline: 'Sin señal' };
const STATUS_VARIANT: Record<string, BadgeVariant> = { active: 'success', stopped: 'warning', offline: 'neutral' };

const COLUMNS: TableTreeColumn[] = [
  { key: 'name', label: 'Nombre', width: '45%' },
  { key: 'status', label: 'Estado', width: '25%' },
  { key: 'updated', label: 'Actualizado', width: '30%' },
];

@Component({
  selector: 'app-table-tree-page',
  imports: [TableTree, Badge, CodeBlock],
  templateUrl: './table-tree-page.html',
  styleUrl: './table-tree-page.css',
})
export class TableTreePage implements OnInit {
  protected readonly columns = COLUMNS;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly statusVariant = STATUS_VARIANT;

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

    this.lazyItems.set([
      { id: 'lazy-norte', cells: ['Región Norte', '—', '—'], hasChildren: true },
      { id: 'lazy-sur', cells: ['Región Sur', '—', '—'], hasChildren: true },
    ]);
  }

  // Carga perezosa: los hijos empiezan undefined y se resuelven recién al
  // expandir por primera vez (fila skeleton mientras tanto, ver
  // table-tree.ts / TableTreeItem.children).
  protected onLazyExpandedChange(ids: string[]): void {
    this.lazyExpanded.set(ids);
    const status = (s: string) => ({ template: this.statusCellRef, context: { $implicit: s } });
    for (const id of ids) {
      const region = this.lazyItems().find((r) => r.id === id);
      if (region && region.children === undefined) {
        setTimeout(() => {
          this.lazyItems.update((items) =>
            items.map((r) =>
              r.id === id
                ? {
                    ...r,
                    children: [
                      { id: `${id}-u1`, cells: ['Unidad 1', status('active'), 'hace 1 min'] },
                      { id: `${id}-u2`, cells: ['Unidad 2', status('active'), 'hace 4 min'] },
                    ],
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
