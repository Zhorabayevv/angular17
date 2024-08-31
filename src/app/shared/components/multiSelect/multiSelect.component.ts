import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'ui-multi-select',
    templateUrl: './multiSelect.component.html',
    styleUrls: ['./multiSelect.component.scss'],
})
export class MultiSelectComponent {
    @Input('value') valueProps: AbstractControl | null;
    @Input('label') labelProps: string = '';
    @Input('isActiveAll') isActiveAllProps: boolean = false;

    public testList: any[] = [
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
    public selectedValues: any[] = [];

    public isOpen: boolean = false;
    public isTouched: boolean = false;

    public isSelectedAll: boolean = false;

    constructor() {}

    public get selectedValuesNames(): string {
        return this.selectedValues?.map((item) => item.name).join(', ');
    }

    public toggleSelect(): void {
        this.isOpen = !this.isOpen;
    }

    public selectedItem(item: any): void {
        if (this.isSelected(item)) {
            this.isSelectedAll = false;
            this.selectedValues = this.selectedValues.filter((value) => value.code !== item.code);
            this.valueProps?.setValue(this.selectedValues);
            return;
        }

        this.selectedValues.push(item);
        this.valueProps?.setValue(this.selectedValues);

        if (this.selectedValues.length === this.testList.length) {
            this.isSelectedAll = true;
        }

        this.isTouched = true;
    }

    public selectAll(): void {
        this.isSelectedAll = !this.isSelectedAll;

        if (!this.isSelectedAll) {
            this.selectedValues = [];
            this.valueProps?.setValue('');
        } else {
            this.selectedValues = [...this.testList];
            this.valueProps?.setValue(this.selectedValues.map((value) => value.code).join(', '));
        }
    }

    public onClickOutside(): void {
        this.isOpen = false;
    }

    public clearValue(): void {
        this.valueProps?.setValue('');
        this.selectedValues = [];
    }

    public isSelected(item: any): boolean {
        return this.selectedValues.some((value) => value.code === item.code);
    }
}
