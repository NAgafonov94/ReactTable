import * as React from "react";

interface IPaginationProps {
    count: number;
    page: number;
    setPage: (page: number) => void;
}

export class Pagination extends React.PureComponent {
    public props!: IPaginationProps;

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const pages = new Array(this.props.count || 1).fill(null).map((_, i) => i + 1);

        return (
            <tr>
                <td>
                    Prev,
                    {pages.map(page => page === this.props.page
                        ? <strong>{page},</strong>
                        : <span onClick={() => this.props.setPage(page)}>{page},</span>
                    )}
                    Next
                </td>
            </tr>
        );
    }
}
