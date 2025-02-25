import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeToUppercase]',
  standalone: true,
})
export class ChangeToUppercaseDirective {
  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.elementRef.nativeElement;
    const uppercasedValue = input.value.toUpperCase();

    if (input.value !== uppercasedValue) {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      input.value = uppercasedValue;
      input.setSelectionRange(start, end);

      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
