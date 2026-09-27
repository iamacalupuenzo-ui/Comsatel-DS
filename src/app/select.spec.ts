import { TestBed } from '@angular/core/testing';
import { Select } from '@iamacalupuenzo-ui/comsatel-ds';

const options = [{ value: 'a', label: 'Operación extensa' }, { value: 'b', label: 'Otra operación' }];
describe('Select: contrato de selección', () => {
  it('puede ocultar limpieza y reelegir conserva el valor simple', async () => {
    const fixture = TestBed.createComponent(Select);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('value', 'a');
    fixture.componentRef.setInput('showClear', false);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.cs-select__clear')).toBeNull();
    const changes: (string | string[])[] = [];
    fixture.componentInstance.valueChange.subscribe(value => changes.push(value));
    fixture.nativeElement.querySelector('[role="combobox"]').click();
    await expect.poll(() => document.querySelector('[role="option"]')).not.toBeNull();
    (document.querySelector('[role="option"]') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(changes).toEqual(['a']);
    expect(document.activeElement?.getAttribute('role')).toBe('combobox');
  });

  it('no permite quitar chips cuando está deshabilitado o en solo lectura', async () => {
    const fixture = TestBed.createComponent(Select);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('value', ['a', 'b']);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    const removes = [...fixture.nativeElement.querySelectorAll('.cs-select__chip-remove')] as HTMLButtonElement[];
    expect(removes.every(button => button.disabled)).toBe(true);
    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('readonly', true);
    await fixture.whenStable();
    expect(removes.every(button => button.disabled)).toBe(true);
  });
});
