import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { Button } from '@iamacalupuenzo-ui/comsatel-ds/button';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds/icons';

/**
 * Zona para cargar archivos: se arrastran o se eligen con el botón. Emite los
 * archivos elegidos y deja la validación a la pantalla (formato, tamaño,
 * contenido), que es quien sabe qué acepta y qué mensaje mostrar; el error se
 * muestra con `errorMessage`. `accept` solo filtra el selector del sistema.
 */
@Component({
  selector: 'cs-file-dropzone',
  imports: [Button, Icon],
  template: `
    <div
      class="cs-file-dropzone"
      [class.cs-file-dropzone--over]="dragOver()"
      [class.cs-file-dropzone--invalid]="!!errorMessage"
      [class.cs-file-dropzone--disabled]="disabled"
      (dragenter)="onDragEnter($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <cs-icon [name]="icon" [size]="24" aria-hidden="true" class="cs-file-dropzone__icon" />
      <strong class="cs-file-dropzone__title">{{ title }}</strong>
      @if (hint) {
        <span class="cs-file-dropzone__hint">{{ hint }}</span>
      }
      <input
        #input
        class="cs-file-dropzone__input"
        type="file"
        tabindex="-1"
        aria-hidden="true"
        [attr.accept]="accept || null"
        [multiple]="multiple"
        [disabled]="disabled"
        (change)="onInputChange()"
      />
      <cs-button variant="default" size="sm" [disabled]="disabled" (click)="input.click()">
        <cs-icon name="upload" [size]="16" aria-hidden="true" />{{ buttonLabel }}
      </cs-button>
    </div>
    @if (errorMessage) {
      <p class="cs-file-dropzone__error" role="alert">
        <cs-icon name="circle-alert" [size]="12" aria-hidden="true" />{{ errorMessage }}
      </p>
    }
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: var(--layout-gap-xs);
      }
      .cs-file-dropzone {
        position: relative;
        display: grid;
        align-content: center;
        justify-items: center;
        row-gap: var(--layout-gap-xs);
        box-sizing: border-box;
        width: 100%;
        min-height: calc(var(--layout-size-3xl) * 2);
        padding: var(--layout-padding-2xl);
        border: var(--layout-border-thin) dashed var(--color-border-neutral-default);
        border-radius: var(--radius-lg);
        background: var(--elevation-surface-default);
        color: var(--color-text-base-default);
        font-family: var(--font-family-content);
        text-align: center;
        transition:
          border-color var(--motion-duration-fast) var(--motion-easing-default),
          background-color var(--motion-duration-fast) var(--motion-easing-default);
      }
      .cs-file-dropzone__icon {
        color: var(--color-text-base-subtle);
      }
      .cs-file-dropzone--over {
        border-color: var(--color-border-brand-default);
        background: var(--color-background-brand-subtlest);
      }
      .cs-file-dropzone--over .cs-file-dropzone__icon {
        color: var(--color-text-brand-default);
      }
      .cs-file-dropzone--invalid {
        border-color: var(--color-border-danger-default);
      }
      .cs-file-dropzone--disabled {
        opacity: var(--opacity-disabled);
      }
      .cs-file-dropzone__title {
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
        font-weight: var(--font-weight-bold);
      }
      .cs-file-dropzone__hint {
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
      .cs-file-dropzone > cs-button {
        margin-top: var(--layout-gap-md);
      }
      .cs-file-dropzone__input {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
      .cs-file-dropzone__error {
        display: flex;
        align-items: center;
        gap: var(--layout-gap-2xs);
        margin: 0;
        color: var(--color-text-danger-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
    `,
  ],
})
export class FileDropzone {
  @Input() title = 'Arrastra el archivo aquí';
  /** Formatos y tamaño admitidos, en una línea: «XLSX, XLS o CSV. Máximo 10 MB.» */
  @Input() hint = '';
  /** Filtra el selector del sistema (por ejemplo `.xlsx,.xls,.csv`). No reemplaza la validación. */
  @Input() accept = '';
  @Input() multiple = false;
  @Input() buttonLabel = 'Seleccionar archivo';
  @Input() icon: IconName = 'file-text';
  @Input() disabled = false;
  /** Error de la última carga (formato, tamaño, contenido); lo decide la pantalla. */
  @Input() errorMessage = '';
  /** Archivos elegidos o soltados. Con `multiple` en false, trae solo el primero. */
  @Output() readonly filesSelected = new EventEmitter<File[]>();

  protected readonly dragOver = signal(false);
  @ViewChild('input', { static: true }) private inputRef!: ElementRef<HTMLInputElement>;
  private dragDepth = 0;

  protected onDragEnter(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    this.dragDepth++;
    this.dragOver.set(true);
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth = Math.max(0, this.dragDepth - 1);
    if (this.dragDepth === 0) this.dragOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth = 0;
    this.dragOver.set(false);
    if (this.disabled) return;
    this.emit(Array.from(event.dataTransfer?.files ?? []));
  }

  protected onInputChange(): void {
    const input = this.inputRef.nativeElement;
    this.emit(Array.from(input.files ?? []));
    // Permite volver a elegir el mismo archivo después de corregirlo.
    input.value = '';
  }

  private emit(files: File[]): void {
    const selected = this.multiple ? files : files.slice(0, 1);
    if (selected.length) this.filesSelected.emit(selected);
  }
}

const IMAGE = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'heic'];
const VIDEO = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
const AUDIO = ['mp3', 'wav', 'ogg', 'm4a', 'aac'];

/** Ícono según la extensión del archivo. */
export function fileIconFor(fileName: string): IconName {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
  if (IMAGE.includes(extension)) return 'image';
  if (VIDEO.includes(extension)) return 'video';
  if (AUDIO.includes(extension)) return 'music';
  return 'file-text';
}

/** Tamaño legible: «850 KB», «2,4 MB». */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toLocaleString('es', { maximumFractionDigits: 1 })} MB`;
}

/**
 * Archivo adjunto en una lista: ícono según el tipo, nombre (con enlace si
 * hay `href`), tamaño y acciones. Con `removeLabel` muestra el botón de
 * quitar; otras acciones (por ejemplo «Reemplazar») se proyectan.
 */
@Component({
  selector: 'cs-file-item',
  imports: [Icon],
  template: `
    <div class="cs-file-item">
      @if (href) {
        <a class="cs-file-item__name cs-file-item__name--link" [href]="href" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'Abrir ' + fileName + ' en una nueva pestaña'">
          <cs-icon [name]="resolvedIcon" [size]="16" aria-hidden="true" />
          <span class="cs-file-item__text">{{ fileName }}</span>
        </a>
      } @else {
        <span class="cs-file-item__name">
          <cs-icon [name]="resolvedIcon" [size]="16" aria-hidden="true" />
          <span class="cs-file-item__text">{{ fileName }}</span>
        </span>
      }
      @if (fileSize !== null) {
        <span class="cs-file-item__size">{{ sizeLabel }}</span>
      }
      <span class="cs-file-item__actions">
        <ng-content />
        @if (removeLabel) {
          <button type="button" class="cs-file-item__remove" [attr.aria-label]="removeLabel" (click)="remove.emit()">
            <cs-icon name="trash-2" [size]="14" aria-hidden="true" />
          </button>
        }
      </span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }
      .cs-file-item {
        display: flex;
        align-items: center;
        gap: var(--layout-gap-sm);
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        padding: var(--layout-padding-sm) var(--layout-padding-md);
        border: var(--layout-border-thin) solid var(--color-border-divider);
        border-radius: var(--radius-md);
        background: var(--elevation-surface-default);
        color: var(--color-text-base-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
      .cs-file-item__name {
        display: flex;
        flex: 1;
        align-items: center;
        gap: var(--layout-gap-sm);
        min-width: 0;
        color: inherit;
      }
      .cs-file-item__name--link {
        text-decoration: none;
        cursor: pointer;
      }
      .cs-file-item__name--link:hover .cs-file-item__text {
        text-decoration: underline;
      }
      .cs-file-item__name--link:focus-visible {
        outline: none;
        border-radius: var(--radius-sm);
        box-shadow: 0 0 0 var(--layout-border-thick) var(--color-border-focused);
      }
      .cs-file-item__text {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cs-file-item__size {
        flex-shrink: 0;
        color: var(--color-text-base-subtle);
      }
      .cs-file-item__actions {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        gap: var(--layout-gap-xs);
      }
      .cs-file-item__actions:empty {
        display: none;
      }
      .cs-file-item__remove {
        display: grid;
        place-items: center;
        margin-left: var(--layout-gap-md);
        padding: var(--layout-padding-2xs);
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-danger-default);
        cursor: pointer;
      }
      .cs-file-item__remove:hover {
        background: var(--color-background-neutral-subtle);
      }
      .cs-file-item__remove:focus-visible {
        outline: none;
        box-shadow: 0 0 0 var(--layout-border-thick) var(--color-border-focused);
      }
    `,
  ],
})
export class FileItem {
  @Input({ required: true }) fileName = '';
  /** Tamaño en bytes; null para no mostrarlo. */
  @Input() fileSize: number | null = null;
  /** Si hay URL, el nombre abre el archivo en una pestaña nueva. */
  @Input() href = '';
  /** Ícono propio; sin valor, se elige según la extensión. */
  @Input() icon?: IconName;
  /** Nombre accesible del botón de quitar («Quitar foto.jpg»). Vacío para no mostrarlo. */
  @Input() removeLabel = '';
  @Output() readonly remove = new EventEmitter<void>();

  protected get resolvedIcon(): IconName {
    return this.icon ?? fileIconFor(this.fileName);
  }

  protected get sizeLabel(): string {
    return this.fileSize === null ? '' : formatFileSize(this.fileSize);
  }
}
