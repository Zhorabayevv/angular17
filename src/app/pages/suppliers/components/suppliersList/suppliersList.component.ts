import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IShortEntity } from 'src/app/shared/interfaces/shortEntity.interface';
import { ITableRow } from 'src/app/shared/interfaces/table.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-suppliers-list',
    templateUrl: './suppliersList.component.html',
    styleUrls: ['./suppliersList.component.scss'],
    imports: [CommonModule, TranslateModule, RouterModule, SharedModule],
})
export class SuppliersListComponent implements OnInit {
    public tabs: IShortEntity[] = [
        {
            code: 'all',
            name: 'Все',
        },
        {
            code: 'active',
            name: 'Активные',
        },
        {
            code: 'inactive',
            name: 'Неактивные',
        },
        {
            code: 'archived',
            name: 'Архивные',
        },
    ];
    public tableRows: ITableRow[] = [
        {
            key: 'id',
            label: 'ID',
            width: '60',
            filterType: 'input',
        },
        {
            key: 'name',
            label: 'Название',
            width: '260',
            filterType: 'input',
            textType: 'bold',
        },
        {
            key: 'description',
            label: 'Описание',
            width: '200',
            filterType: 'input',
        },
        {
            key: 'phone',
            label: 'Телефон',
            width: '170',
            filterType: 'input',
        },
        {
            key: 'email',
            label: 'Электронный адрес',
            width: '215',
            filterType: 'input',
        },
        {
            key: 'isActive',
            label: 'Активность',
            width: '155',
            filterType: 'toggler',
        },
    ];
    public tableRowsData: any[] = [
        {
            id: 1,
            name: 'Test 1',
            description:
                'Test 1 description Test 1 description Test 1 description Test 1 description Test 1 description',
            phone: '77878589966',
            email: 'belov.vladimir@gmail.com',
            isActive: true,
        },
        {
            id: 2,
            name: 'Test 2',
            description: 'Test 2 description',
            phone: '78985652332',
            email: 'sofi_brabrabra@gmail.com',
            isActive: false,
        },
        {
            id: 3,
            name: 'Test 3',
            description: 'Test 3 description',
            phone: '77477477878',
            email: 'evelina_ang06@gmail.com',
            isActive: true,
        },
        {
            id: 4,
            name: 'Test 4',
            description: 'Test 4 description',
            phone: '78884949449',
            email: 'elizabet_gg@gmail.com',
            isActive: false,
        },
        {
            id: 11,
            name: 'Test 1',
            description:
                'Test 1 description Test 1 description Test 1 description Test 1 description Test 1 description',
            phone: '75556662233',
            email: 'maya_pol5557@gmail.com',
            isActive: true,
        },
        {
            id: 21,
            name: 'Test 2',
            description: 'Test 2 description',
            phone: '77075552332',
            email: 'polianna_kkk17@gmail.com',
            isActive: false,
        },
    ];
    public loading: boolean = false;

    constructor(private _alertService: AlertService) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.loading = true;
        }, 1000);
    }

    public selectedTab(tabCode: string): void {
        this._alertService.success('Title', tabCode);
    }

    public changedFilters(value: any): void {
        // this._alertService.warning('Title', value);
    }

    public selectedRows(value: any[]): void {}
}
