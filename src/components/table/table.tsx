import * as React from 'react';
import {TableBody} from "./table-body/table-body";
import './table.scss';

interface ITableProps {
    columns: ITableColumn[];
    rows: ITableRow[];
    height?: number;
    overScan?: number;
    onLoadNextData?: () => void;
}

interface ITableState {
    theadHeight: number;
}

export class Table extends React.PureComponent {
    static DEFAULT_TABLE_HEIGHT = 300;
    static DEFAULT_TABLE_OVER_SCAN = 10;

    props!: ITableProps;
    state: ITableState = {
        theadHeight: 0
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <table className="table">
                <thead className="table__thead" ref={el => this.setState({ theadHeight: el?.clientHeight })}>
                    <tr>
                        <th style={{width: 30}}>
                            &nbsp;
                        </th>

                        {this.props.columns.map(column => <th style={{width: column.width}} key={column.id}>{column.label}</th>)}
                    </tr>
                </thead>

                <TableBody columns={this.props.columns}
                           rows={this.props.rows}
                           height={this.getTableBodyHeight()}
                           overScan={this.props.overScan || Table.DEFAULT_TABLE_OVER_SCAN}
                           onScrollEnd={() => this.props.onLoadNextData && this.props.onLoadNextData()} />
            </table>
        )
    }

    private getTableBodyHeight(): number {
        let height = 0;
        const tableHeight = this.props.height || Table.DEFAULT_TABLE_HEIGHT;
        const headHeight = this.state.theadHeight;

        height = tableHeight ? tableHeight : height;
        height = headHeight ? height - headHeight : height;

        return height;
    }
}
