import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { IShortEntity } from 'src/app/shared/interfaces/shortEntity.interface';

@Component({
    selector: 'ui-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
    @Input('value') valueProps: AbstractControl | null;
    @Input('label') labelProps: string = '';

    public testList: IShortEntity[] = [
        {
            code: '1',
            name: 'Алатауский',
        },
        {
            code: '2',
            name: 'Алмалинский',
        },
        {
            code: '3',
            name: 'Ауэзовский',
        },
        {
            code: '4',
            name: 'Бостандыкский',
        },
        {
            code: '5',
            name: 'Жетысуский',
        },
        {
            code: '6',
            name: 'Медеуский',
        },
        {
            code: '7',
            name: 'Наурызбайский',
        },
        {
            code: '8',
            name: 'Турксибский',
        },
        {
            code: '9',
            name: 'Жетысуский',
        },
        {
            code: '10',
            name: 'Алмалинский',
        },
    ];
    public selectedValue: IShortEntity | null;
    public isOpen: boolean = false;
    public isTouched: boolean = false;

    constructor() {}

    public toggleSelect(): void {
        this.isOpen = !this.isOpen;
    }

    public selectedItem(item: any): void {
        this.valueProps?.setValue(item.code);
        this.selectedValue = item;
        this.isTouched = true;
        this.isOpen = false;
    }

    public onClickOutside(): void {
        this.isOpen = false;
    }

    public clearValue(): void {
        this.valueProps?.setValue('');
        this.selectedValue = null;
    }
}
