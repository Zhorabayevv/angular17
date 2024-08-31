import { Component, Input } from '@angular/core';

import { ButtonType } from 'src/app/shared/interfaces/modal.interface';

@Component({
    selector: 'ui-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    @Input('type') typeProps: ButtonType = 'secondary';
    @Input('icon') iconProps: string = '';
    @Input('label') labelProps: string = '';
    @Input('disabled') disabledProps: boolean = false;

    constructor() {}
}
