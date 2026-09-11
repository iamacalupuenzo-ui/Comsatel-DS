import { Component, computed, signal } from '@angular/core';
import { Icon, Tag, type IconName, type TagSeverity, type TagSize } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const SEVERITIES: TagSeverity[] = ['primary', 'secondary', 'success', 'info', 'warn', 'danger', 'contrast'];
const SIZES: TagSize[] = ['sm', 'md', 'lg'];
const ICON_OPTIONS = ['ninguno', 'tag', 'circle-check', 'alert-triangle'] as const;
type IconOption = (typeof ICON_OPTIONS)[number];

@Component({
  selector: 'app-tag-page',
  imports: [Tag, Icon, DemoShell],
  templateUrl: './tag-page.html',
  styleUrl: './tag-page.css',
})
export class TagPage {
  protected readonly severities = SEVERITIES;
  protected readonly sizes = SIZES;
  protected readonly iconOptions = ICON_OPTIONS;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Severidad', key: 'severity', options: SEVERITIES, default: 'primary' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'toggle', label: 'Redondeado', key: 'rounded', default: true },
    { kind: 'select', label: 'Ícono', key: 'icon', options: ICON_OPTIONS, default: 'tag' },
  ];

  protected readonly severity = signal<TagSeverity>('primary');
  protected readonly size = signal<TagSize>('md');
  protected readonly rounded = signal(true);
  protected readonly iconOption = signal<IconOption>('tag');

  protected onStateChange(state: DemoState): void {
    if (state['severity']) this.severity.set(state['severity'] as TagSeverity);
    if (state['size']) this.size.set(state['size'] as TagSize);
    if (state['rounded'] !== undefined) this.rounded.set(Boolean(state['rounded']));
    if (state['icon']) this.iconOption.set(state['icon'] as IconOption);
  }

  protected readonly icon = computed<IconName | null>(() => {
    const value = this.iconOption();
    return value === 'ninguno' ? null : value;
  });

  protected readonly playgroundCode = computed(() => {
    const severity = this.severity() !== 'primary' ? ` severity="${this.severity()}"` : '';
    const size = this.size() !== 'md' ? ` size="${this.size()}"` : '';
    const rounded = this.rounded() ? ' [rounded]="true"' : '';
    const icon = this.icon() ? ` icon="${this.icon()}"` : '';
    return `<cs-tag${severity}${size}${rounded}${icon} value="Nueva etiqueta" />`;
  });
}
