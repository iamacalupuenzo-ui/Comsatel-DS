import { Component } from '@angular/core';
import { CodeBlock } from '../../shared/docs/code-block';

@Component({
  selector: 'app-tokens-explained-page',
  templateUrl: './tokens-explained-page.html',
  styleUrl: './tokens-explained-page.css',
  imports: [CodeBlock],
})
export class TokensExplainedPage {}
