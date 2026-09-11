import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Icon } from '../icons/icon';
import { Radio } from './radio';

export type RadioOrientation = 'vertical' | 'horizontal';

let groupUid = 0;

/**
 * Administra el `name` compartido (así el navegador trata a los
 * `<cs-radio>` proyectados como un solo grupo real de `<input
 * type="radio">`, con arrow keys moviendo la selección gratis), más
 * `value`/controlado o no controlado, `disabled` de grupo, y el
 * label/helper/error a nivel de grupo (mismo patrón que DateTimePicker
 * para helperText/errorText). Solo API compuesta — sin un `options: []`
 * declarativo separado: para el caso simple, el consumidor arma el `@for`
 * en su propio template (ver radio-page.html), lo que los declara como
 * contenido proyectado y los deja alcanzables vía `@ContentChildren` igual
 * que el caso avanzado.
 *
 * Coordinación con los hijos: mismo mecanismo que Accordion/AccordionItem
 * — `@ContentChildren` en vez de que el hijo intente `inject(RadioGroup)`,
 * ver el comentario en accordion.ts.
 */
@Component({
  selector: 'cs-radio-group',
  imports: [Icon],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.css',
})
export class RadioGroup implements AfterContentInit, OnChanges, OnDestroy {
  @Input() name?: string;
  @Input() value?: string;
  @Input() defaultValue?: string;
  @Output() readonly valueChange = new EventEmitter<string>();
  @Input() label?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() helperText?: string;
  @Input() errorText?: string;
  @Input() orientation: RadioOrientation = 'vertical';
  @Input('aria-label') ariaLabel = '';
  @Input('aria-labelledby') ariaLabelledby = '';
  @Input('aria-describedby') ariaDescribedby = '';

  @ContentChildren(Radio) private itemsQuery!: QueryList<Radio>;

  private readonly generatedName = `cs-radio-group-${++groupUid}`;
  private internalValue?: string;
  private itemSubs: { unsubscribe(): void }[] = [];
  private queryChangesSub?: { unsubscribe(): void };

  ngOnChanges(): void {
    if (this.value === undefined && this.internalValue === undefined) this.internalValue = this.defaultValue;
    this.sync();
  }

  ngAfterContentInit(): void {
    if (this.value === undefined) this.internalValue = this.defaultValue;
    this.wireItems();
    this.queryChangesSub = this.itemsQuery.changes.subscribe(() => this.wireItems());
  }

  ngOnDestroy(): void {
    this.itemSubs.forEach((s) => s.unsubscribe());
    this.queryChangesSub?.unsubscribe();
  }

  private get currentValue(): string | undefined {
    return this.value ?? this.internalValue;
  }

  protected get resolvedName(): string {
    return this.name ?? this.generatedName;
  }

  protected get labelId(): string {
    return `${this.generatedName}-label`;
  }

  protected get helperId(): string {
    return `${this.generatedName}-help`;
  }

  protected get errorId(): string {
    return `${this.generatedName}-error`;
  }

  protected get describedBy(): string | null {
    const contextId = this.invalid && this.errorText ? this.errorId : this.helperText ? this.helperId : '';
    const ids = [this.ariaDescribedby, contextId].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  }

  protected get errorMessageId(): string | null {
    return this.invalid && this.errorText ? this.errorId : null;
  }

  protected get labelledBy(): string | null {
    const ids = [this.ariaLabelledby, this.label ? this.labelId : ''].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  }

  private wireItems(): void {
    this.itemSubs.forEach((s) => s.unsubscribe());
    this.itemSubs = this.itemsQuery.map((item) => item.selectedChange.subscribe((v) => this.select(v)));
    this.sync();
  }

  private sync(): void {
    if (!this.itemsQuery) return;
    const v = this.currentValue;
    this.itemsQuery.forEach((item) => {
      item.checked.set(item.value === v);
      item.groupName.set(this.resolvedName);
      item.groupDisabled.set(this.disabled);
      item.groupRequired.set(this.required);
      item.groupInvalid.set(this.invalid);
      item.groupDescribedBy.set(this.describedBy ?? '');
      item.groupErrorMessage.set(this.errorMessageId ?? '');
    });
  }

  private select(v: string): void {
    if (this.value === undefined) this.internalValue = v;
    this.valueChange.emit(v);
    this.sync();
  }
}
