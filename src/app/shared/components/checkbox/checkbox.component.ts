import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ui-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
    @Input('label') labelProps: string;
    @Input('isChecked') isCheckedProps: boolean = false;
    @Input('activeMinus') activeMinusProps: boolean = false;

    @Output('checkboxToggle') checkboxToggleEvent = new EventEmitter<boolean>();

    constructor() {}

    onToggle(): void {
        this.isCheckedProps = !this.isCheckedProps;

        this.checkboxToggleEvent.emit(this.isCheckedProps);
    }
}
