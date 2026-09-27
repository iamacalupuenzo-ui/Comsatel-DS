import { TestBed } from '@angular/core/testing';
import { FleetUnitList, type FleetUnit } from '@iamacalupuenzo-ui/comsatel-ds';

const units: FleetUnit[] = [
  { id: 'a', name: 'Unidad A', status: 'active', statusLabel: 'Activa', lastSeen: 'Ahora', speed: '0', battery: '90%', location: 'Lima' },
  { id: 'b', name: 'Unidad B', status: 'offline', statusLabel: 'Sin señal', lastSeen: 'Ayer', speed: '0', battery: '20%', location: 'Callao', disabled: true },
];

describe('FleetUnitList: estados independientes', () => {
  it('solicita selección sin mutar el valor controlado ni la expansión', async () => {
    const fixture = TestBed.createComponent(FleetUnitList);
    fixture.componentRef.setInput('units', units);
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('defaultExpandedIds', ['a']);
    await fixture.whenStable();
    const changes: (string | null)[] = [];
    fixture.componentInstance.selectedIdChange.subscribe(value => changes.push(value));
    const button = fixture.nativeElement.querySelector('button[aria-label="Seleccionar, Unidad A"]') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    expect(changes).toEqual(['a']);
    expect(fixture.componentInstance.selectedId()).toBeNull();
    expect(fixture.nativeElement.querySelector('cs-accordion')).toBeNull();
    fixture.componentRef.setInput('selectedId', 'a');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('button[aria-label="Seleccionar, Unidad A"]').getAttribute('aria-pressed')).toBe('true');
  });

  it('ordena fijados sin mutar unidades y conserva controles deshabilitados', async () => {
    const fixture = TestBed.createComponent(FleetUnitList);
    fixture.componentRef.setInput('units', units);
    fixture.componentRef.setInput('pinnedIds', ['b']);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[data-unit-id]').dataset.unitId).toBe('b');
    expect(units.map(unit => unit.id)).toEqual(['a', 'b']);
    expect(fixture.nativeElement.querySelector('[data-unit-id="b"] button').disabled).toBe(true);
  });
});
