import { Directive } from '@angular/core';

@Directive({
  selector: '[appChangeToUppercase]',
  standalone: true
})
export class ChangeToUppercaseDirective {

  constructor() { }

}
