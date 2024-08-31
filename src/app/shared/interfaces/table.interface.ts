export interface ITableRow {
    key: string;
    label: string;
    width: string;
    filterType: string;
    textType?: string;
}

export interface ITableFilter {
    key: string;
    value: any;
}
