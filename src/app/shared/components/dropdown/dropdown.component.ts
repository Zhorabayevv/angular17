import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
    @Input('withHeader') public withHeaderProps: boolean = false;
    @Input('isOpen') public isOpenProps: boolean = false;
    @Input('title') public titleProps: string;
    @Input('icon') public iconProps: string = 'xmark-large';

    constructor() {}

    public closeDropdown(): void {
        this.isOpenProps = false;
    }
}
