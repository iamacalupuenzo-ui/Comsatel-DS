import { Component, signal } from '@angular/core';
import { Header, type HeaderNavItem } from 'comsatel-ds';
import { DemoShell } from '../../shared/docs/demo-shell';
const NAV: HeaderNavItem[] = [{ id: 'inicio', label: 'Inicio', active: true }, { id: 'operaciones', label: 'Operaciones' }, { id: 'reportes', label: 'Reportes' }];
@Component({ selector: 'app-header-page', imports: [Header, DemoShell], templateUrl: './header-page.html', styleUrl: './header-page.css' })
export class HeaderPage {
 protected readonly nav = NAV; protected readonly result = signal('Aún no se ejecutó una acción.');
 protected report(action:string):void { this.result.set(`Acción ejecutada: ${action}.`); }
}
