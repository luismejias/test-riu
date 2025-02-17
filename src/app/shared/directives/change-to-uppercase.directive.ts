import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeToUppercase]',
  standalone: true
})
export class ChangeToUppercaseDirective {
  constructor(public elementRef: ElementRef) { }
  @HostListener('input', ['$event']) onInput(event: { target: { value: string; }; }) {    
    this.elementRef.nativeElement.value = event.target.value.toUpperCase();
  }

}
