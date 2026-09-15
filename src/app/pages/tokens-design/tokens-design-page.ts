import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from 'comsatel-ds';

@Component({
  selector: 'app-tokens-design-page',
  templateUrl: './tokens-design-page.html',
  styleUrl: './tokens-design-page.css',
  imports: [Banner, RouterLink],
})
export class TokensDesignPage {}
