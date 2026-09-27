import { TestBed } from '@angular/core/testing';
import { ActionCard } from '@iamacalupuenzo-ui/comsatel-ds';

describe('ActionCard: controles independientes', () => {
  it('solicita selección sin ejecutar la acción ni mutar valores controlados', async () => {
    const fixture = TestBed.createComponent(ActionCard);
    fixture.componentRef.setInput('title', 'Operación');
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('showToggle', true);
    await fixture.whenStable();
    const selections: boolean[] = [];
    let actions = 0;
    fixture.componentInstance.selectedChange.subscribe(value => selections.push(value));
    fixture.componentInstance.buttonClick.subscribe(() => actions++);
    fixture.nativeElement.querySelector('button[aria-label="Seleccionar, Operación"]').click();
    await fixture.whenStable();
    expect(selections).toEqual([true]);
    expect(actions).toBe(0);
    expect(fixture.componentInstance.selected()).toBe(false);
    expect(fixture.componentInstance.toggleChecked).toBe(false);
    fixture.componentRef.setInput('selected', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('button[aria-pressed="true"]')).not.toBeNull();
  });

  it('deshabilita cada control sin ocultar su contenido', async () => {
    const fixture = TestBed.createComponent(ActionCard);
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('showToggle', true);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    const controls = [...fixture.nativeElement.querySelectorAll('button,input')] as HTMLInputElement[];
    expect(controls.length).toBe(3);
    expect(controls.every(control => control.disabled)).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('No disponible');
  });
});
