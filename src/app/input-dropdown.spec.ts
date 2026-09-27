import { TestBed } from '@angular/core/testing';
import { InputDropdown } from '@iamacalupuenzo-ui/comsatel-ds';

describe('InputDropdown: apertura por teclado', () => {
  it('enfoca una opción habilitada y devuelve foco después de seleccionar', async () => {
    const fixture = TestBed.createComponent(InputDropdown);
    fixture.componentRef.setInput('options', [
      { label: 'No disponible', value: 'disabled', disabled: true },
      { label: 'Unidad', value: 'unit' },
    ]);
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('button');
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();
    await expect.poll(() => document.activeElement?.getAttribute('role')).toBe('option');
    expect(document.activeElement?.textContent).toContain('Unidad');
    (document.activeElement as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(document.activeElement).toBe(trigger);
  });
});
