import { Component, computed, signal } from '@angular/core';
import { Icon, type IconName } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { ListItem } from '@iamacalupuenzo-ui/comsatel-ds/list-item';
import { Tag } from '@iamacalupuenzo-ui/comsatel-ds/tag';
import { CodeBlock } from '../../shared/docs/code-block';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const ICONS = ['truck', 'map-pin', 'file-text', 'user'] as const satisfies readonly IconName[];

@Component({
  selector: 'app-list-item-page',
  imports: [ListItem, Tag, Icon, DemoShell, CodeBlock],
  templateUrl: './list-item-page.html',
  styleUrl: './list-item-page.css',
})
export class ListItemPage {
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Ícono', key: 'icon', options: [{ value: 'none', label: 'Sin ícono' }, ...ICONS.map(value => ({ value, label: value }))], default: 'truck' },
    { kind: 'toggle', label: 'Flecha final', key: 'trailingIcon', default: true },
    { kind: 'toggle', label: 'Seleccionable', key: 'selectable', default: false },
    { kind: 'toggle', label: 'Seleccionado', key: 'selected', default: false },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
  ];
  protected readonly icon = signal<IconName | null>('truck');
  protected readonly showTrailingIcon = signal(true);
  protected readonly selectable = signal(false);
  protected readonly selected = signal(false);
  protected readonly disabled = signal(false);
  protected readonly actionCount = signal(0);

  protected onStateChange(state: DemoState): void {
    if (state['icon']) this.icon.set(state['icon'] === 'none' ? null : state['icon'] as IconName);
    if (state['trailingIcon'] !== undefined) this.showTrailingIcon.set(Boolean(state['trailingIcon']));
    if (state['selectable'] !== undefined) {
      this.selectable.set(Boolean(state['selectable']));
      if (!state['selectable']) this.selected.set(false);
    }
    if (state['selected'] !== undefined) {
      const selected = Boolean(state['selected']);
      this.selected.set(selected);
      if (selected) this.selectable.set(true);
    }
    if (state['disabled'] !== undefined) this.disabled.set(Boolean(state['disabled']));
  }

  protected readonly playgroundCode = computed(() => {
    const props = [`label="Reporte de mantenimiento"`];
    if (this.icon()) props.push(`leadingIcon="${this.icon()}"`);
    if (!this.showTrailingIcon()) props.push('[trailingIcon]="null"');
    if (this.selectable()) props.push('[selectable]="true"');
    if (this.selected()) props.push('[selected]="true"');
    if (this.disabled()) props.push('[disabled]="true"');
    return `<cs-list-item ${props.join(' ')} />`;
  });

  protected activate(): void {
    this.actionCount.update(count => count + 1);
  }
}
