import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { fieldLabelTypography, type InputFieldSize } from '../input/input-tokens';
import { textStyle } from '../tokens/typography';

/**
 * Envoltorio de un campo de formulario: label, el control proyectado, texto de ayuda y mensaje de
 * error, con ids predecibles para enlazarlos. Úsalo con controles que no traen su propio label
 * (Input, InputGroup, InputDropdown sin `label`). El control debe usar `[id]` igual a `for`, y
 * `aria-describedby="{for}-help"` o `aria-errormessage="{for}-error"` cuando corresponda.
 */
@Component({
  selector: 'cs-form-field',
  imports: [Icon, NgStyle],
  template: `
    <div class="cs-form-field">
      @if (label) {
        <label class="cs-form-field__label" [ngStyle]="labelStyle" [attr.for]="for || null" [id]="for ? for + '-label' : null">
          {{ label }}
          @if (required) {
            <span class="cs-form-field__required" aria-hidden="true">*</span>
          }
        </label>
      }
      <ng-content />
      @if (errorMessage) {
        <p class="cs-form-field__error" [id]="for ? for + '-error' : null">
          <cs-icon name="circle-alert" [size]="12" aria-hidden="true" />{{ errorMessage }}
        </p>
      } @else if (helperText) {
        <p class="cs-form-field__helper" [id]="for ? for + '-help' : null">{{ helperText }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host { display: block; min-width: 0; }
      .cs-form-field { display: grid; gap: var(--layout-gap-xs); min-width: 0; }
      .cs-form-field__label {
        color: var(--color-text-base-default);
      }
      .cs-form-field__required { margin-left: var(--layout-gap-2xs); color: var(--color-text-danger-default); }
      .cs-form-field__helper,
      .cs-form-field__error {
        display: flex;
        align-items: center;
        gap: var(--layout-gap-2xs);
        margin: 0;
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
      .cs-form-field__helper { color: var(--color-text-base-subtle); }
      .cs-form-field__error { color: var(--color-text-danger-default); }
    `,
  ],
})
export class FormField {
  /** Id del control proyectado; enlaza el label y da los ids `{for}-help` y `{for}-error`. */
  @Input() for = '';
  @Input() label = '';
  /** Mismo tamaño que el control proyectado; define la tipografía del label. */
  @Input() size: InputFieldSize = 'md';
  @Input() required = false;
  @Input() helperText = '';
  /** Si hay mensaje, se muestra en vez de la ayuda. El control debe marcar `invalid`. */
  @Input() errorMessage = '';

  /** Tipografía de label de la escala de campos (fieldLabelTypography), igual que Input dropdown. */
  protected get labelStyle(): Record<string, string> {
    return textStyle(fieldLabelTypography[this.size], 'accent');
  }

}
