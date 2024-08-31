import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'ui-password-input',
    templateUrl: './passwordInput.component.html',
    styleUrls: ['./passwordInput.component.scss'],
})
export class PasswordInputComponent implements OnInit {
    @Input('placeholder') placeholderProps: string = '';
    @Input('value') valueProps: AbstractControl | null;

    public isFocused: boolean = false;
    public isPasswordVisible: boolean = false;
    public inputType: string = 'password';

    constructor() {}

    ngOnInit(): void {
        this.initializeValue();
    }

    private initializeValue(): void {
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
        this.isFocused = false;
        this.valueProps?.setValue('');
    }

    public toggleShowPassword(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.inputType = this.isPasswordVisible ? 'text' : 'password';
    }
}
