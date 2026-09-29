import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InputGroup } from './input-group';
import { InputGroupAddon } from './input-group-addon';
import { InputGroupInput } from './input-group-input';
import { InputGroupClear } from '@iamacalupuenzo-ui/comsatel-ds/input';

@Component({
  imports: [InputGroup, InputGroupInput, InputGroupClear],
  template: `<cs-input-group [active]="!!value"><cs-input-group-input aria-label="Buscar" [value]="value" (valueChange)="value = $event" /><cs-input-group-clear label="Limpiar búsqueda" (cleared)="onCleared()" /></cs-input-group>`,
})
class Host {
  value = 'VHC-001';
  cleared = 0;
  onCleared(): void { this.cleared++; }
}

@Component({
  imports: [InputGroup, InputGroupAddon, InputGroupInput, InputGroupClear],
  template: `<cs-input-group><cs-input-group-input aria-label="Buscar" [value]="value" (valueChange)="value = $event" /><cs-input-group-addon align="inline-end"><cs-input-group-clear label="Limpiar búsqueda" (cleared)="onCleared()" /></cs-input-group-addon></cs-input-group>`,
})
class HostInAddon {
  value = 'VHC-002';
  cleared = 0;
  onCleared(): void { this.cleared++; }
}

@Component({
  imports: [InputGroup, InputGroupInput, InputGroupClear],
  template: `<cs-input-group><cs-input-group-input aria-label="Buscar" [value]="value()" /><cs-input-group-clear /></cs-input-group>`,
})
class HostControlled {
  value = signal('VHC-001');
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
    expect(fixture.nativeElement.querySelector('button')).toBeNull();

    input.value = 'VHC-003';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('VHC-003');
    expect(input.value).toBe('VHC-003');
    expect(fixture.nativeElement.querySelector('button')).not.toBeNull();
  });

  it('encuentra el input cuando la acción está dentro de un addon', async () => {
    await TestBed.configureTestingModule({ imports: [HostInAddon] }).compileComponents();
    const fixture = TestBed.createComponent(HostInAddon);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('');
    expect(fixture.componentInstance.cleared).toBe(1);
    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('no muestra la acción de limpieza si el campo comienza vacío', async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.value = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('oculta la acción si el valor controlado se vacía desde fuera', async () => {
    await TestBed.configureTestingModule({ imports: [HostControlled] }).compileComponents();
    const fixture = TestBed.createComponent(HostControlled);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).not.toBeNull();
    fixture.componentInstance.value.set('');
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('input') as HTMLInputElement).value).toBe('');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });
});
