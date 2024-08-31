import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'ui-validation-error',
    templateUrl: './validationError.component.html',
    styleUrls: ['./validationError.component.scss'],
})
export class ValidationText {
    @Input('validatedErrors') validatedErrorsProps: ValidationErrors | null;
    @Input('isTouched') isTouchedProps: boolean | undefined = false;

    constructor() {}

    public getPattern(pattern: string): string {
        return pattern.split('[')[1].split(']')[0];
    }
}
