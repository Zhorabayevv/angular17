import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-header-filter',
    templateUrl: './headerFilter.component.html',
    styleUrls: ['./headerFilter.component.scss'],
})
export class HeaderFilterComponent {
    @Input('title') titleProps: string;
    @Input('badge') badgeProps: string;

    constructor() {}
}
