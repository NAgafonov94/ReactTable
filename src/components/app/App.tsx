import * as React from 'react';
import './App.scss';
import {Table} from "../table/table";
import {connect} from "react-redux";
import {loadDataThunk} from "../../actions/data/thunk";
import {RootState} from "MyTypes";
import {bindActionCreators, Dispatch} from "redux";

interface IAppProps {
    data: IData[];
    loadData: () => void;
}

class App extends React.PureComponent {
    public props!: IAppProps;
    private columns: ITableColumn[] = [{
        id: 'updateData',
        label: 'Update data',
        width: 100
    }, {
        id: 'message',
        label: 'Message'
    }];

    componentDidMount(): void {
        this.props.loadData();
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Table columns={this.columns}
                   rows={this.props.data}
                   onLoadNextData={() => this.props.loadData()}
                   height={600}/>
        );
    }
}

export default connect((state: RootState) => ({
        data: state.dataReducer
    }), (dispatch: Dispatch) =>
        bindActionCreators({loadData: loadDataThunk}, dispatch)
)(App);
