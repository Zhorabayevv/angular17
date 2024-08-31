import { AbstractControl } from '@angular/forms';
import { IMaskPattern } from './maskPattern.interface';

interface IButton {
    name: string;
    type: ButtonType;
}

export type ButtonType = 'primary' | 'secondary' | 'danger' | '';

export interface IConfirmModal {
    title: string;
    img: string;
    text: string;
    button: IButton;
    dontAsk: boolean;
    closeIcon?: boolean;
}

export interface IFormModal {
    type: 'input' | 'select' | 'checkbox' | 'radio';
    formControlName?: string;

    properties: {
        placeholder?: string;
        label?: string;
        value?: AbstractControl | null;

        mask?: string;
        patterns?: IMaskPattern;

        disabled?: boolean;
        required?: boolean;
        readonly?: boolean;

        isSearch?: boolean;
        isChecked?: boolean;
        isActiveAll?: boolean;
    };
}

export interface IModal {
    title: string;
    button: IButton;
    closeIcon: boolean;
    form: IFormModal[];
}

export interface IDynamicElements {
    component: any;
    properties?: {
        placeholder?: string;
        value?: AbstractControl | null;
    };
}
