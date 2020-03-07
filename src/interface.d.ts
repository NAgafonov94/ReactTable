interface ITableColumn {
    id: string;
    label: string;
}

interface ITableRow {
    [key: string]: string | number;
}
