import { Component, computed, signal } from '@angular/core';
import { Button, FormField, Input, SideDrawer, Tag, Textarea, type SideDrawerAction, type SideDrawerSurface } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type DrawerContent = 'detail' | 'form';

const CONTENT_INFO: Record<DrawerContent, { label: string; when: string; props: string }> = {
  detail: {
    label: 'Detalle',
    when: 'Muestra la información completa de una fila sin perder la tabla de fondo. Sin pie: las acciones viven en el contenido.',
    props: 'sin primaryAction ni secondaryAction',
  },
  form: {
    label: 'Formulario',
    when: 'Crea o edita un registro con más campos de los que caben en un Modal. La acción principal va a la derecha del pie.',
    props: '[primaryAction]="{ label: \'Guardar\' }" [secondaryAction]="{ label: \'Cancelar\' }"',
  },
};

@Component({
  selector: 'app-side-drawer-page',
  imports: [Button, DemoShell, FormField, Input, SideDrawer, Tag, Textarea],
  templateUrl: './side-drawer-page.html',
  styleUrl: './side-drawer-page.css',
})
export class SideDrawerPage {
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Contenido', key: 'content', options: [{ value: 'detail', label: 'Detalle' }, { value: 'form', label: 'Formulario' }], default: 'form' },
    { kind: 'select', label: 'Superficie', key: 'surface', options: [{ value: 'default', label: 'Blanca' }, { value: 'canvas', label: 'Lienzo' }], default: 'default' },
  ];
  protected readonly content = signal<DrawerContent>('form');
  protected readonly surface = signal<SideDrawerSurface>('default');
  protected readonly open = signal(false);
  protected readonly saving = signal(false);
  protected readonly info = computed(() => CONTENT_INFO[this.content()]);
  protected readonly secondaryAction: SideDrawerAction = { label: 'Cancelar' };
  protected readonly primaryAction = computed<SideDrawerAction | undefined>(() =>
    this.content() === 'form' ? { label: 'Guardar', icon: 'check', loading: this.saving() } : undefined,
  );

  protected onState(s: DemoState): void {
    if (s['content']) this.content.set(s['content'] as DrawerContent);
    if (s['surface']) this.surface.set(s['surface'] as SideDrawerSurface);
  }

  protected save(): void {
    this.saving.set(true);
    setTimeout(() => {
      this.saving.set(false);
      this.open.set(false);
    }, 900);
  }

  protected readonly code = computed(() => {
    const props = ['[isOpen]="abierto"', `title="${this.content() === 'form' ? 'Editar recupero' : 'Recupero REC-0142'}"`];
    if (this.surface() === 'canvas') props.push('surface="canvas"');
    if (this.content() === 'form') {
      props.push('[primaryAction]="{ label: \'Guardar\', icon: \'check\', loading: guardando }"', '[secondaryAction]="{ label: \'Cancelar\' }"', '(primaryActionClick)="guardar()"', '(secondaryActionClick)="abierto = false"');
    }
    props.push('(closed)="abierto = false"');
    return `<cs-side-drawer\n  ${props.join('\n  ')}\n>\n  …contenido…\n</cs-side-drawer>`;
  });
}
