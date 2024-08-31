import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IShortEntity } from 'src/app/shared/interfaces/shortEntity.interface';

@Component({
    standalone: true,
    selector: 'app-suppliers',
    templateUrl: './suppliers.component.html',
    styleUrl: './suppliers.component.scss',
    imports: [CommonModule, TranslateModule, RouterModule],
})
export class SuppliersComponent implements OnInit {
    public urlTabs: IShortEntity[] = [
        { name: 'Список поставщиков', code: 'list' },
        { name: 'Журнал действий', code: 'action-log' },
    ];
    public selectedTab: string | undefined = 'list';

    constructor() {}

    ngOnInit(): void {}

    public onTabChange(tab: IShortEntity): void {
        this.selectedTab = tab.code;
    }
}
