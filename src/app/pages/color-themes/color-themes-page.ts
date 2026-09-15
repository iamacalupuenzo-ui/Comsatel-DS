import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from '@iamacalupuenzo-ui/comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

interface ThemeSwatchEntry {
  token: string;
  light: string;
  dark: string;
  usage: string;
}

const SWATCHES: ThemeSwatchEntry[] = [
  { token: '--color-background-base', light: '#ffffff', dark: '#0c0e16', usage: 'Fondo de página' },
  { token: '--elevation-surface-default', light: '#ffffff', dark: '#111827', usage: 'Superficie de una tarjeta o panel' },
  { token: '--color-text-base-boldest', light: '#101828', dark: '#f9fafb', usage: 'Título de mayor jerarquía' },
  { token: '--color-border-default', light: '#d0d5dd', dark: '#344054', usage: 'Borde de campos y contenedores' },
  { token: '--color-background-brand-default', light: '#1b4079', dark: '#4981d7', usage: 'Fondo de la acción primaria' },
];

const USAGE_CODE = `<!-- Cualquier ancestro activa el tema para todo lo que contiene -->
<html data-theme="dark">
  ...
</html>`;

const DEMO_SHELL_CODE = `<!-- Patrón real, demo-shell.html -->
<div class="demo-shell__canvas" [attr.data-theme]="mode()">
  <ng-content></ng-content>
</div>`;

@Component({
  selector: 'app-color-themes-page',
  templateUrl: './color-themes-page.html',
  styleUrl: './color-themes-page.css',
  imports: [Banner, CodeBlock, RouterLink],
})
export class ColorThemesPage {
  protected readonly swatches = SWATCHES;
  protected readonly usageCode = USAGE_CODE;
  protected readonly demoShellCode = DEMO_SHELL_CODE;
}
