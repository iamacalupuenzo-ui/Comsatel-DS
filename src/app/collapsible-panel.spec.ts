import { By } from '@angular/platform-browser';
import { InputDropdown } from '@iamacalupuenzo-ui/comsatel-ds';
import { TestBed } from '@angular/core/testing';
import { CollapsiblePanelExample } from './pages/motion-demo/collapsible-panel-example';

describe('Patrón de panel plegable', () => {
  it('conserva el input montado y su consulta al contraer; limpiar no abre', async () => {
    const fixture = TestBed.createComponent(CollapsiblePanelExample);
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('#panel-search') as HTMLInputElement;
    input.value = 'Unidad 1';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    fixture.nativeElement.querySelector('#panel-toggle').click();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#panel-search')).toBe(input);
    expect(input.value).toBe('Unidad 1');
    expect(fixture.nativeElement.querySelector('#panel-body').getAttribute('aria-hidden')).toBe('true');
    fixture.nativeElement.querySelector('[aria-label="Limpiar búsqueda"]').click();
    await fixture.whenStable();
    expect(input.value).toBe('');
    expect(fixture.nativeElement.querySelector('#panel-toggle').getAttribute('aria-expanded')).toBe('false');
  });

  it('Tab no abre; Enter en el campo vuelve a abrir', async () => {
    const fixture = TestBed.createComponent(CollapsiblePanelExample);
    await fixture.whenStable();
    fixture.nativeElement.querySelector('#panel-toggle').click();
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('#panel-search');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#panel-toggle').getAttribute('aria-expanded')).toBe('false');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#panel-toggle').getAttribute('aria-expanded')).toBe('true');
  });
  it('combina los dos filtros visibles y conserva sus valores al contraer', async () => {
    const fixture = TestBed.createComponent(CollapsiblePanelExample);
    await fixture.whenStable();
    const filters = fixture.debugElement.queryAll(By.directive(InputDropdown));
    expect(filters.length).toBe(2);
    expect(filters.every(filter => filter.componentInstance.size === 'sm')).toBe(true);
    filters[0].componentInstance.valueChange.emit('active');
    filters[1].componentInstance.valueChange.emit('norte');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('4 unidades');
    fixture.nativeElement.querySelector('#panel-toggle').click();
    await fixture.whenStable();
    fixture.nativeElement.querySelector('#panel-toggle').click();
    await fixture.whenStable();
    expect(filters[0].componentInstance.value).toBe('active');
    expect(filters[1].componentInstance.value).toBe('norte');
  });
});
