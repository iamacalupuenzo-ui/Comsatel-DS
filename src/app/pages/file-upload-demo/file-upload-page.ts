import { Component, computed, signal } from '@angular/core';
import { Button, FileDropzone, FileItem, Icon } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type UploadState = 'default' | 'error' | 'disabled' | 'files';
const STATES: { key: UploadState; title: string; intro: string; props: string }[] = [
  { key: 'default', title: 'Por defecto', intro: 'Arrastra el archivo o elígelo con el botón. La pantalla valida lo que recibe.', props: 'accept=".xlsx,.xls,.csv" (filesSelected)="…"' },
  { key: 'error', title: 'Con error', intro: 'La pantalla rechazó el archivo: el borde se pone rojo y el mensaje dice cómo corregirlo.', props: '[errorMessage]="error"' },
  { key: 'disabled', title: 'Deshabilitado', intro: 'La carga no está disponible en este paso, por ejemplo mientras se valida otro archivo.', props: '[disabled]="true"' },
  { key: 'files', title: 'Archivos adjuntos', intro: 'Cada archivo con su ícono según el tipo, su tamaño y cómo quitarlo; con enlace si ya se puede abrir.', props: 'cs-file-item fileName fileSize href removeLabel' },
];
const ACCEPTED = ['xlsx', 'xls', 'csv'];

interface DemoFile { name: string; size: number; url: string }

@Component({
  selector: 'app-file-upload-page',
  imports: [Button, DemoShell, FileDropzone, FileItem, Icon],
  templateUrl: './file-upload-page.html',
  styleUrl: './file-upload-page.css',
})
export class FileUploadPage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'default' },
  ];
  protected readonly pgState = signal<UploadState>('default');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  protected readonly pgError = signal('');
  protected readonly pgFile = signal('');
  protected readonly files = signal<DemoFile[]>([
    { name: 'foto-unidad.jpg', size: 850_000, url: '' },
    { name: 'video-recupero.mp4', size: 24_500_000, url: '' },
    { name: 'oficio-firmado.pdf', size: 120_000, url: '' },
  ]);

  protected onState(s: DemoState): void {
    if (!s['state']) return;
    this.pgState.set(s['state'] as UploadState);
    this.pgFile.set('');
    this.pgError.set(this.pgState() === 'error' ? 'Selecciona un archivo XLSX, XLS o CSV.' : '');
  }

  /** Lo que haría la pantalla: validar formato y tamaño, y decir qué pasó. */
  protected validate(selected: File[]): void {
    const file = selected[0];
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ACCEPTED.includes(extension)) {
      this.pgError.set('Selecciona un archivo XLSX, XLS o CSV.');
      this.pgFile.set('');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      this.pgError.set('El archivo puede tener un tamaño máximo de 10 MB.');
      this.pgFile.set('');
      return;
    }
    this.pgError.set('');
    this.pgFile.set(file.name);
  }

  protected removeFile(name: string): void {
    this.files.update((list) => list.filter((f) => f.name !== name));
  }

  protected codeFor(key: UploadState): string {
    if (key === 'files') return '<cs-file-item\n  fileName="foto-unidad.jpg"\n  [fileSize]="850000"\n  removeLabel="Quitar foto-unidad.jpg"\n  (remove)="quitar(archivo)"\n/>';
    const attrs = ['accept=".xlsx,.xls,.csv"', 'hint="Formatos admitidos: XLSX, XLS o CSV. Tamaño máximo: 10 MB."'];
    if (key === 'error') attrs.push('[errorMessage]="error()"');
    if (key === 'disabled') attrs.push('[disabled]="true"');
    attrs.push('(filesSelected)="validar($event)"');
    return `<cs-file-dropzone\n  ${attrs.join('\n  ')}\n/>`;
  }
}
