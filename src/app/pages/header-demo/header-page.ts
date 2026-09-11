import { Component, signal } from '@angular/core';
import { Header } from 'comsatel-ds';
import { DemoShell } from '../../shared/docs/demo-shell';
@Component({ selector: 'app-header-page', imports: [Header, DemoShell], templateUrl: './header-page.html', styleUrl: './header-page.css' })
export class HeaderPage {
 protected readonly result = signal('Aún no se ejecutó una acción.');
 protected report(action:string):void { this.result.set(`Acción ejecutada: ${action}.`); }
}
