import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InputGroup } from './input-group';
import { InputGroupInput } from './input-group-input';
import { InputGroupClear } from './input-group-clear';

@Component({
  imports: [InputGroup, InputGroupInput, InputGroupClear],
  template: `<cs-input-group [active]="!!value"><cs-input-group-input aria-label="Buscar" [value]="value" (valueChange)="value = $event" /><cs-input-group-clear label="Limpiar búsqueda" (cleared)="onCleared()" /></cs-input-group>`,
})
class Host {
  value = 'VHC-001';
  cleared = 0;
  onCleared(): void { this.cleared++; }
}

describe('InputGroupClear', () => {
  it('limpia el valor controlado, emite el evento y devuelve el foco', async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Limpiar búsqueda');
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('');
    expect(fixture.componentInstance.cleared).toBe(1);
    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
  });
});
