import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class SharedService {
    private updateCounter: number = 0;

    constructor(private _http: HttpClient) {}

    public setValidatorsAndValidity(
        control: FormGroup,
        controlName: string,
        validators: ValidatorFn | ValidatorFn[] | null,
    ) {
        const formControl = control.get(controlName);

        if (formControl) {
            formControl.setValidators(validators);
            formControl.updateValueAndValidity();
        } else {
            throw new Error(`Control ${controlName} not found`);
        }
    }

    public clearValidators(control: FormGroup, controlName: string) {
        const formControl = control.get(controlName);

        if (formControl) {
            formControl.clearValidators();
            formControl.updateValueAndValidity();
        } else {
            throw new Error(`Control ${controlName} not found`);
        }
    }

    public confirmPasswordValidator(
        passwordKey: string,
        form: AbstractControl,
    ): (control: AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            const passwordControl = form.get(passwordKey);
            const confirmPasswordControl = control;

            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            passwordControl.valueChanges
                // .pipe(debounceTime(300))
                .subscribe(() => {
                    if (this.updateCounter === 0) {
                        confirmPasswordControl.updateValueAndValidity();
                        this.updateCounter++;

                        setTimeout(() => {
                            this.updateCounter = 0;
                        }, 100);
                    }
                });

            const newPassword = passwordControl.value;
            const confirmPassword = confirmPasswordControl.value;

            if (newPassword !== confirmPassword) {
                return { confirmPasswordMismatch: true };
            } else {
                return null;
            }
        };
    }
}
