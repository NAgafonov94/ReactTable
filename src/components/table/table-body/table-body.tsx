import * as React from 'react';
import "./table-body.scss";
import {Pagination} from "../../pagination/pagination";

interface ITableBodyProps {
    keysOrder: string[];
    rows: ITableRow[];
    height: number;
    overScan: number;
    onScrollEnd?: () => void
}

interface ITableBodyState {
    page: number;
    countVisibleElements: number;
    scrollPosition: number;
    startIndex: number;
    endIndex: number;
    tbodyHeight: number;
    tfootHeight: number;
}

export class TableBody extends React.PureComponent {
    static TR_HEIGHT = 30;

    public props!: ITableBodyProps;
    public state: ITableBodyState = {
        countVisibleElements: 0,
        scrollPosition: 0,
        startIndex: 0,
        tbodyHeight: 0,
        tfootHeight: 0,
        endIndex: 0,
        page: 1
    };
    private tbodyElement!: HTMLTableSectionElement | null;

    componentDidUpdate(prevProps: Readonly<ITableBodyProps>, prevState: Readonly<ITableBodyState>, snapshot?: any): void {
         if (prevProps.height !== this.props.height || prevState.tfootHeight !== this.state.tfootHeight) {
            this.setState({tbodyHeight: this.props.height - this.state.tfootHeight});
        }

        if (prevState.tbodyHeight !== this.state.tbodyHeight) {
            this.updateCountVisibleElements()
                .then(() => this.updateSegment());
        }

        if (prevState.scrollPosition !== this.state.scrollPosition || prevProps.rows !== this.props.rows) {
            this.updateSegment();
        }

        if (prevState.scrollPosition !== this.state.scrollPosition && (this.state.scrollPosition + this.state.tbodyHeight) === this.tbodyElement?.scrollHeight) {
            this.props.onScrollEnd && this.props.onScrollEnd();
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <>
                <tbody className="table-body"
                       style={{height: this.state.tbodyHeight}}
                       ref={el => this.tbodyElement = el}
                       onScroll={event => this.onScroll(event)}>
                    {
                        this.props.rows.map((row, rowIndex) =>
                            <tr key={rowIndex} style={{height: TableBody.TR_HEIGHT}}>
                                {
                                    this.isShowRow(rowIndex) && this.props.keysOrder.map((key, i) => <td
                                        key={i}>{row[key]}</td>)
                                }
                            </tr>
                        )
                    }
                </tbody>

                <tfoot ref={el => this.setState({ tfootHeight: el?.clientHeight || 0 })}>
                    <Pagination count={Math.ceil(this.props.rows.length / (this.state.countVisibleElements || 1))}
                                page={this.state.page}
                                setPage={(page) => this.setPage(page)} />
                </tfoot>
            </>
        )
    }

    private updateCountVisibleElements(): Promise<ITableBodyState> {
        return new Promise<ITableBodyState>(resolve => this.setState({
            countVisibleElements: this.state.tbodyHeight ? Math.floor(this.state.tbodyHeight / TableBody.TR_HEIGHT) : 0
        }, resolve));
    }

    private onScroll(event: React.UIEvent<HTMLTableSectionElement>) {
        this.setState({ scrollPosition: (event.target as HTMLElement).scrollTop });
    }

    private updateSegment() {
        const { scrollPosition } = this.state;
        const firstVisibleRowIndex = Math.ceil(scrollPosition / TableBody.TR_HEIGHT);
        const lastVisibleRowIndex = Math.floor((scrollPosition + this.state.tbodyHeight) / TableBody.TR_HEIGHT);
        let startIndex = firstVisibleRowIndex - this.props.overScan;
        let endIndex = lastVisibleRowIndex + this.props.overScan;

        startIndex = startIndex > 0 ? startIndex : 0;
        endIndex = endIndex <= this.props.rows.length ? endIndex : this.props.rows.length - 1;

        this.setState({
            startIndex,
            endIndex,
            page: Math.ceil(lastVisibleRowIndex / this.state.countVisibleElements)
        });
    }

    private isShowRow(index: number): boolean {
        return this.state.startIndex <= index && this.state.endIndex >= index;
    }

    private setPage(page: number) {
        this.tbodyElement?.scrollTo({
            top: (page - 1) * this.state.countVisibleElements * TableBody.TR_HEIGHT
        });
    }
}
