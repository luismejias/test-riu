import { ElementRef } from '@angular/core';
import { MockService } from 'ng-mocks';
import { ChangeToUppercaseDirective } from './change-to-uppercase.directive';

describe('ChangeToUppercaseDirective', () => {
  let nativeElement: ElementRef;
  let directive: ChangeToUppercaseDirective;
  beforeEach(() => {
    nativeElement = MockService(ElementRef,{
      nativeElement: {
        style: {
          textTransform: 'uppercase'
        }
      }
    });
    directive = new ChangeToUppercaseDirective(nativeElement);
  })
  it('should create an instance', () => {    
    expect(directive).toBeTruthy();
  });
});
