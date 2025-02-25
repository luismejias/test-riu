import { ChangeToUppercaseDirective } from './change-to-uppercase.directive';
import { Component, ElementRef } from '@angular/core';
import { render, screen, fireEvent } from '@testing-library/angular';

@Component({
  template: `<input type="text" appChangeToUppercase />`,
  standalone: true,
  imports: [ChangeToUppercaseDirective],
})
class TestComponent {}

describe('ChangeToUppercaseDirective', () => {
  beforeEach(async () => {
    await render(TestComponent);
  });

  it('should create an instance', () => {
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const elementRef = new ElementRef(inputElement);
    const directive = new ChangeToUppercaseDirective(elementRef);
    expect(directive).toBeTruthy();
  });

  it('should transform input value to uppercase', async () => {
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'hello' } });
    expect(input.value).toBe('HELLO');
  });

  it('should not trigger infinite loop', () => {
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const spy = jest.spyOn(input, 'value', 'set');

    fireEvent.input(input, { target: { value: 'hello' } });

    expect(spy).toHaveBeenCalledTimes(1);
});

  it('should maintain cursor position', async () => {
    const input = screen.getByRole('textbox') as HTMLInputElement;
    input.value = 'hello';
    input.setSelectionRange(2, 2);

    fireEvent.input(input, { target: { value: 'hello' } });

    expect(input.selectionStart).toBe(2);
    expect(input.selectionEnd).toBe(2);
  });
});
