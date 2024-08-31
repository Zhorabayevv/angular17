import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { ITableFilter, ITableRow } from 'src/app/shared/interfaces/table.interface';

@Component({
    selector: 'ui-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy, OnChanges {
    @Input('tableName') tableNameProps: string;
    @Input('tableRowsData') tableRowsDataProps: any[] = [];
    @Input('tableRows') tableRowsProps: ITableRow[] = [];
    @Input('withSelectRow') withSelectRowProps: boolean = false;
    @Input('withActions') withActionsProps: boolean = true;

    @Output('changedFilters') changedFiltersEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output('selectedRows') selectedRowsEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

    private filter$$: Subject<ITableFilter> = new Subject<ITableFilter>();
    private unsubscribe$$: Subject<void> = new Subject<void>();
    private selectedRows$$: Subject<any[]> = new Subject<any[]>();

    public filteredTableRowsData: any[];
    public filters: { [key: string]: any } = {};
    public isShowFilter: any[] = [];
    public isSelectedAllRows: boolean = false;
    public selectedRowsData: any[] = [];

    constructor(private _translateService: TranslateService) {}

    ngOnInit(): void {
        this.initializeValues();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tableRowsDataProps && !changes.tableRowsDataProps.firstChange) {
            this.initializeValues();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }

    private initializeValues(): void {
        this.filteredTableRowsData = [...this.tableRowsDataProps];

        this.filter$$
            .pipe(debounceTime(500), takeUntil(this.unsubscribe$$))
            .subscribe(({ key, value }) => {
                value === null || value === undefined
                    ? delete this.filters[key]
                    : (this.filters[key] = value);

                this.changedFiltersEvent.emit(this.filters);
            });

        this.selectedRows$$.pipe(takeUntil(this.unsubscribe$$)).subscribe((selectedRows) => {
            this.selectedRowsEvent.emit(selectedRows);
        });
    }

    public selectedRowData(id: number): boolean {
        return this.selectedRowsData.find((row) => row.id === id) !== undefined;
    }

    public onFilter(key: string, value: any): void {
        this.filter$$.next({ key, value });
    }

    public toggleFilter(index: number): void {
        event?.stopPropagation();
        this.isShowFilter[index] = !this.isShowFilter[index];
        this.isShowFilter = this.isShowFilter.map((_, i) =>
            i === index ? this.isShowFilter[index] : false,
        );
    }

    public clearFilter(index: number, key: string): void {
        this.isShowFilter[index] = false;

        this.filter$$.next({ key, value: null });
    }

    public closeFilter(index: number): void {
        this.isShowFilter[index] = false;
    }

    public selectedAllRows(): void {
        this.isSelectedAllRows = !this.isSelectedAllRows;

        this.selectedRowsData = this.isSelectedAllRows ? [...this.filteredTableRowsData] : [];

        this.selectedRows$$.next(this.selectedRowsData);
    }

    public selectRow(row: any): void {
        const rowIndex = this.selectedRowsData.findIndex(
            (selectedRow) => selectedRow.id === row.id,
        );

        if (rowIndex > -1) {
            this.selectedRowsData.splice(rowIndex, 1);
            this.isSelectedAllRows = false;
        } else {
            this.selectedRowsData.push(row);
            this.isSelectedAllRows =
                this.selectedRowsData.length === this.filteredTableRowsData.length;
        }

        this.selectedRows$$.next(this.selectedRowsData);
    }

    public isActiveText(value: boolean): string {
        return value
            ? this._translateService.instant('is_active')
            : this._translateService.instant('is_not_active');
    }
}
