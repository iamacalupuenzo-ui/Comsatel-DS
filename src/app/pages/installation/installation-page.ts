import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from '@iamacalupuenzo-ui/comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

@Component({
  selector: 'app-installation-page',
  templateUrl: './installation-page.html',
  styleUrl: './installation-page.css',
  imports: [Banner, CodeBlock, RouterLink],
})
export class InstallationPage {}
