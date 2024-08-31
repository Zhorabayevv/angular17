import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { IMaskPattern } from 'src/app/shared/interfaces/maskPattern.interface';

@Component({
    selector: 'ui-form-input',
    templateUrl: './formInput.component.html',
    styleUrls: ['./formInput.component.scss'],
})
export class FormInputComponent implements OnInit {
    @Input('placeholder') placeholderProps: string = '';
    @Input('value') valueProps: AbstractControl | null;
    @Input('mask') maskProps: string;
    @Input('patterns') patternProps: IMaskPattern;
    @Input('phoneMask') phoneMaskProps: boolean = false;
    @Input('disabled') disabledProps: boolean = false;
    @Input('required') requiredProps: boolean = false;
    @Input('readonly') readonlyProps: boolean = false;

    public isFocused: boolean = false;

    constructor() {}

    ngOnInit(): void {
        this.initializeValue();
    }

    private initializeValue(): void {
        if (this.phoneMaskProps && !this.valueProps?.value) {
            this.valueProps?.setValue('7 ');
        }

        this.checkValue();
    }

    private checkValue(): void {
        if (
            this.valueProps?.value !== undefined &&
            this.valueProps?.value !== null &&
            this.valueProps?.value !== ''
        ) {
            this.isFocused = true;
        } else {
            this.isFocused = false;
        }
    }

    public onFocus(): void {
        if (this.disabledProps || this.readonlyProps) {
            return;
        }

        this.isFocused = true;
    }

    public onBlur(): void {
        this.isFocused = false;
        const value = this.valueProps?.value;

        if (value) {
            this.isFocused = true;

            if (typeof value === 'string' && this.valueProps) {
                const trimmedValue = value.trim();
                this.valueProps.setValue(trimmedValue);
            }
        }
    }

    public clearValue(): void {
        if (this.phoneMaskProps) {
            this.valueProps?.setValue('7 ');
            this.isFocused = true;
            return;
        }

        this.isFocused = false;
        this.valueProps?.setValue('');
    }
}
