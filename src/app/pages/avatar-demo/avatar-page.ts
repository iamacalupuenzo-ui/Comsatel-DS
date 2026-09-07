import { Component, computed, signal } from '@angular/core';
import { Avatar, AvatarLabel, AvatarGroup, AvatarAddButton, type AvatarSize, type AvatarStatus } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const LABEL_SIZES: ('xs' | 'sm' | 'md')[] = ['xs', 'sm', 'md'];
const STATUSES: (AvatarStatus | 'none')[] = ['none', 'online', 'offline', 'busy', 'company'];

// Fotos reales del sistema de diseño (public/avatars, calcadas del proyecto
// React — mismas 9 imágenes, mismo criterio: nunca inventar assets nuevos
// para una demo cuando el sistema real ya trae las suyas).
const PHOTOS = Array.from({ length: 9 }, (_, i) => `/avatars/avatar-${i + 1}.jpg`);

@Component({
  selector: 'app-avatar-page',
  imports: [Avatar, AvatarLabel, AvatarGroup, AvatarAddButton, DemoShell],
  templateUrl: './avatar-page.html',
  styleUrl: './avatar-page.css',
})
export class AvatarPage {
  protected readonly sizes = SIZES;
  protected readonly labelSizes = LABEL_SIZES;
  protected readonly statuses = STATUSES;
  protected readonly photos = PHOTOS;
  protected readonly photoAvatars = PHOTOS.slice(0, 4).map((src) => ({ src }));
  protected readonly initialsAvatars = [
    { initials: 'AB' },
    { initials: 'CD' },
    { initials: 'EF' },
    { initials: 'GH' },
    { initials: 'IJ' },
  ];

  /* ---------------------------------------------------------------
     Playground
     --------------------------------------------------------------- */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'select', label: 'Tipo', key: 'type', options: ['image', 'initials', 'placeholder'], default: 'image' },
    { kind: 'select', label: 'Estado', key: 'status', options: STATUSES, default: 'online' },
  ];
  protected readonly pgSize = signal<AvatarSize>('md');
  protected readonly pgType = signal<'image' | 'initials' | 'placeholder'>('image');
  protected readonly pgStatus = signal<AvatarStatus | 'none'>('online');

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as AvatarSize);
    if (s['type']) this.pgType.set(s['type'] as 'image' | 'initials' | 'placeholder');
    if (s['status'] !== undefined) this.pgStatus.set(s['status'] as AvatarStatus | 'none');
  }

  protected readonly pgStatusValue = computed<AvatarStatus | undefined>(() =>
    this.pgStatus() === 'none' ? undefined : (this.pgStatus() as AvatarStatus),
  );
  protected readonly pgCode = computed(() => {
    const sp = this.pgStatus() !== 'none' ? ` status="${this.pgStatus()}"` : '';
    const sz = this.pgSize() !== 'md' ? ` size="${this.pgSize()}"` : '';
    if (this.pgType() === 'image') return `<cs-avatar${sz}${sp} src="/avatars/avatar-1.jpg" alt="Usuario"></cs-avatar>`;
    if (this.pgType() === 'initials') return `<cs-avatar${sz}${sp} initials="AB"></cs-avatar>`;
    return `<cs-avatar${sz}${sp}></cs-avatar>`;
  });

  /* ---------------------------------------------------------------
     Estado
     --------------------------------------------------------------- */
  protected readonly statusControls: ControlDef[] = [{ kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' }];
  protected readonly statusSize = signal<AvatarSize>('md');
  protected onStatusState(s: DemoState): void {
    if (s['size']) this.statusSize.set(s['size'] as AvatarSize);
  }
  protected readonly statusCode = computed(
    () =>
      `<!-- sin estado · online · offline · busy · company -->\n` +
      `<cs-avatar size="${this.statusSize()}" status="online" src="/avatars/avatar-1.jpg"></cs-avatar>\n` +
      `<cs-avatar size="${this.statusSize()}" status="online" initials="AB"></cs-avatar>\n` +
      `<cs-avatar size="${this.statusSize()}" status="online"></cs-avatar>`,
  );

  /* ---------------------------------------------------------------
     Avatar Label con iniciales
     --------------------------------------------------------------- */
  protected readonly labelControls: ControlDef[] = [{ kind: 'select', label: 'Tamaño', key: 'size', options: LABEL_SIZES, default: 'sm' }];
  protected readonly labelSize = signal<'xs' | 'sm' | 'md'>('sm');
  protected onLabelState(s: DemoState): void {
    if (s['size']) this.labelSize.set(s['size'] as 'xs' | 'sm' | 'md');
  }
  protected readonly labelCode = computed(
    () =>
      `<cs-avatar-label size="${this.labelSize()}" initials="AB" name="Alex Brown" status="online"></cs-avatar-label>\n` +
      `<cs-avatar-label size="${this.labelSize()}" initials="CD" name="Chris Davis" status="busy"></cs-avatar-label>\n` +
      `<cs-avatar-label size="${this.labelSize()}" name="Usuario desconocido" status="offline"></cs-avatar-label>`,
  );

  /* ---------------------------------------------------------------
     Avatar Group con iniciales
     --------------------------------------------------------------- */
  protected readonly groupControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: LABEL_SIZES, default: 'sm' },
    { kind: 'select', label: 'Máx. visible', key: 'maxVisible', options: ['1', '2', '3', '4', '5', '6'], default: '3' },
  ];
  protected readonly groupSize = signal<'xs' | 'sm' | 'md'>('sm');
  protected readonly groupMaxVisible = signal(3);
  protected onGroupState(s: DemoState): void {
    if (s['size']) this.groupSize.set(s['size'] as 'xs' | 'sm' | 'md');
    if (s['maxVisible']) this.groupMaxVisible.set(Number(s['maxVisible']));
  }
  protected readonly groupCode = computed(
    () =>
      `const avatars = [\n  { initials: 'AB' },\n  { initials: 'CD' },\n  { initials: 'EF' },\n];\n\n` +
      `<cs-avatar-group size="${this.groupSize()}" [avatars]="avatars" [maxVisible]="${this.groupMaxVisible()}"></cs-avatar-group>`,
  );

  /* ---------------------------------------------------------------
     Avatar Group sin botón de agregar
     --------------------------------------------------------------- */
  protected readonly groupNoAddControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: LABEL_SIZES, default: 'sm' },
    { kind: 'select', label: 'Máx. visible', key: 'maxVisible', options: ['1', '2', '3', '4', '5', '6'], default: '4' },
  ];
  protected readonly groupNoAddSize = signal<'xs' | 'sm' | 'md'>('sm');
  protected readonly groupNoAddMaxVisible = signal(4);
  protected onGroupNoAddState(s: DemoState): void {
    if (s['size']) this.groupNoAddSize.set(s['size'] as 'xs' | 'sm' | 'md');
    if (s['maxVisible']) this.groupNoAddMaxVisible.set(Number(s['maxVisible']));
  }
  protected readonly groupNoAddCode = computed(
    () =>
      `<cs-avatar-group\n` +
      `  size="${this.groupNoAddSize()}"\n` +
      `  [avatars]="avatars"\n` +
      `  [maxVisible]="${this.groupNoAddMaxVisible()}"\n` +
      `  [showAddButton]="false"\n` +
      `></cs-avatar-group>`,
  );

  /* ---------------------------------------------------------------
     Botón de agregar
     --------------------------------------------------------------- */
  protected readonly addControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: LABEL_SIZES, default: 'sm' },
    { kind: 'select', label: 'Estado', key: 'state', options: ['Default', 'Hover', 'Focus', 'Disabled'], default: 'Default' },
  ];
  protected readonly addSize = signal<'xs' | 'sm' | 'md'>('sm');
  protected readonly addState = signal('Default');
  protected onAddState(s: DemoState): void {
    if (s['size']) this.addSize.set(s['size'] as 'xs' | 'sm' | 'md');
    if (s['state']) this.addState.set(s['state'] as string);
  }
  protected readonly addDisabled = computed(() => this.addState() === 'Disabled');
  protected readonly addForceHover = computed(() => this.addState() === 'Hover');
  protected readonly addForceFocus = computed(() => this.addState() === 'Focus');
  protected readonly addCode = computed(() => {
    const disabled = this.addDisabled() ? ' [disabled]="true"' : '';
    return `<cs-avatar-add-button size="${this.addSize()}"${disabled} (addClick)="handleAdd()"></cs-avatar-add-button>`;
  });
}
