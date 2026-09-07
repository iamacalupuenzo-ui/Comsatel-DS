import { Component } from '@angular/core';

// Puerto 1:1 de InputGroup en input-group.tsx. El grupo es dueño del
// borde/anillo de foco/estado inválido — usa :has() para reaccionar al
// tamaño, foco e invalidez del <input> interno sin JS adicional, igual que
// React resuelve lo mismo con clases has-[...]. cs-input-group-input es
// SIEMPRE el hijo con foco/tamaño real; el propio <input> (cs-input) usado
// suelto no participa de este mecanismo.
@Component({
  selector: 'cs-input-group',
  templateUrl: './input-group.html',
  styleUrl: './input-group.css',
})
export class InputGroup {}
