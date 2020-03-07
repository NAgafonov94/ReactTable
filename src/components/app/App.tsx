import * as React from 'react';
import './App.scss';
import {Table} from "../table/table";

class App extends React.PureComponent {
    columns: ITableColumn[] = [{
      id: 'test',
      label: 'test'
    }, {
      id: 'name',
      label: 'name'
    }];

    rows: ITableRow[] = [{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    },{
        test: 'hello',
        name: 'world'
    }];

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Table columns={this.columns} rows={this.rows} />
        );
    }
}

export default App;
