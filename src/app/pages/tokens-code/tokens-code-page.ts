import { Component } from '@angular/core';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

@Component({
  selector: 'app-tokens-code-page',
  templateUrl: './tokens-code-page.html',
  styleUrl: './tokens-code-page.css',
  imports: [CodeBlock, Icon],
})
export class TokensCodePage {}
