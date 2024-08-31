import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ui-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnChanges {
    @Input('value') valueProps: string = '';
    @Input('label') labelProps: string = '';
    @Input('background') backgroundProps: string = '#fff';
    @Input('isSearch') isSearchProps: boolean = false;

    @Output('valueChange') valueChangeEvent: EventEmitter<string> = new EventEmitter<string>();

    public isFocused: boolean = false;

    constructor() {}

    ngOnInit(): void {
        this.initializeValue();
    }

    ngOnChanges(): void {
        this.checkValue();
    }

    private initializeValue(): void {
        this.checkValue();
    }

    public onInputChange(value: string): void {
        this.valueChangeEvent.emit(value);
    }

    private checkValue(): void {
        if (this.valueProps !== undefined && this.valueProps !== null && this.valueProps !== '') {
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

        if (this.valueProps) {
            this.isFocused = true;

            if (typeof this.valueProps === 'string') {
                this.valueProps.trim();
            }
        }
    }
}
