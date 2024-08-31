import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IShortEntity } from 'src/app/shared/interfaces/shortEntity.interface';

@Component({
    selector: 'ui-tab-filter',
    templateUrl: './tabFilter.component.html',
    styleUrls: ['./tabFilter.component.scss'],
})
export class TabFilterComponent implements OnInit {
    @Input('tabs') tabsProps: IShortEntity[] = [];

    @Output('selectedTabCode') selectedTabCodeEvent: EventEmitter<string> =
        new EventEmitter<string>();

    public selectedTabCode: string | undefined;

    constructor() {}

    ngOnInit(): void {
        this.selectedTabCode = this.tabsProps[0].code;
    }

    public selectTab(tabCode: string | undefined): void {
        this.selectedTabCode = tabCode;

        this.selectedTabCodeEvent.emit(tabCode);
    }
}
