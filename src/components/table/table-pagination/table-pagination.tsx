import * as React from "react";
import './table-pagination.scss';

interface IPaginationProps {
    count: number;
    page: number;
    setPage: (page: number) => void;
}

export class TablePagination extends React.PureComponent {
    public props!: IPaginationProps;

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const pages = this.getArrayPages();

        return (
            <tr className="table-pagination">
                <td className="table-pagination__td">
                    <span className={`table-pagination__button ${this.props.page - 1 === 0 ? 'table-pagination__button_disable' : ''}`}
                          onClick={() => this.props.setPage(this.props.page - 1)}>Prev</span>

                    {pages.map((page, i) =>
                        <span className={`table-pagination__button ${page === this.props.page ? 'table-pagination__button_active' : ''}`}
                              key={i}
                              onClick={() => !isNaN(+page) && this.props.setPage(+page)}>
                            {page}
                        </span>
                    )}

                    <span className={`table-pagination__button ${this.props.page === this.props.count ? 'table-pagination__button_disable' : ''}`}
                          onClick={() => this.props.setPage(this.props.page + 1)}>Next</span>
                </td>
            </tr>
        );
    }

    private getArrayPages(): Array<number | string> {
        const count = this.props.count || 1;
        const {page} = this.props;

        if (count < 5) {
            return new Array(count < 5 ? count : 5)
                .fill(null)
                .map((_, i) => i + 1);
        }

        const pages: Array<number | string> = [page];

        if (page - 2 > 1) {
            pages.unshift('...');
            pages.unshift(1);
        } else {
            pages.shift();
            pages.unshift(1,2,3);
        }

        if (page + 2 < count) {
            pages.push('...');
            pages.push(count);
        } else {
            pages.pop();
            pages.push(count - 2, count - 1, count);
        }

        return pages;
    }
}
