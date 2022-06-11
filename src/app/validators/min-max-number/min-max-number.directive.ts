import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[minMaxNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinMaxNumberDirective,
      multi: true,
    },
  ],
})
export class MinMaxNumberDirective implements Validator {
  @Input() min!: number;
  @Input() max!: number;

  validate(control: AbstractControl): ValidationErrors | null {
    if (
      control.value &&
      (control.value > this.max || control.value < this.min)
    ) {
      return { minMaxNumber: true };
    }
    return null;
  }
}
