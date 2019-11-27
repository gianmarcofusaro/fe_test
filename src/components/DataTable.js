import React from 'react';
import '../App.css';
import { DaysTypes } from '../enums/mapDayToNumber';
import { photoshootsRowComposer } from '../helpers/rowComposer';
import DataTableCell from './DataTableCell';
import DataTableRow from './DataTableRow';
import './TableStyles.css';
export default class DataTable extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = { 
      rows: this.props.rows,
      cols: this.props.cols,
      table: [],
      detailTable: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rows !== this.props.rows) {
      const rows = this.props.rows;
      this._onPshootColsCreate();
      this._onPshootRowsCreate(rows);
    }
  } 

  _onPshootColsCreate = () => {
    const cols = this.state.cols;
    const table = this.state.table;
    
    table.push(cols);
    this.setState({ table: table })
  }

  _onPshootRowsCreate = (rows) => {
    if(rows) {
      const table = this.state.table;
      let auxTypesArr = [];
      let row = []
      if (table.length) {
        rows.map((item) => {
          if (!auxTypesArr.includes(item.type)) {
            row = Array(8).fill(0)
            auxTypesArr.push(item.type);
            table.push(row)
            row[0] = item.type;
          }
          const testExpr = item.day_of_the_week;
          photoshootsRowComposer(testExpr, row)
        })
        // footer
        row = Array(8).fill(0)
        const body = [...table]
        body.shift();
        body.map((item, index) => {
          item.map((el, i) => {
            i === 0 ? row[0] = 'Total' : row[i] = row[i] + el
          })
        })
        table.push(row)

        console.log(row)
        this.setState({ table: table })
      }

    }
  }

  _onDetailTableCreate = (event) => {
    const dayOfWeek = event.target.attributes.getNamedItem('data-day').value;
    const rows = this.props.rows;
    const table = []
    let row = []


    // TODO: must check for duplicates clients
    rows.map((item, i) => {
      if (item.day_of_the_week === DaysTypes[dayOfWeek]) {
        row = Array(8).fill(0)
        table.push(row);
        row[0] = item.client_id;
        row[dayOfWeek] = row[dayOfWeek] + 1;
      }
    })

    this.setState({ detailTable: table })
  }

  _onPshootTheadCompose = () => {
    const table = this.state.table;
    const arr = [...table];
    const tHeadArr = arr.shift()

    if (tHeadArr) {
      return (
        <thead>
          <DataTableRow key={'thead'} header={true} footer={false}>
            {tHeadArr.map((v, i) => (
              <DataTableCell key={i} content={v} day={i} />
            ))}
          </DataTableRow>
        </thead>
      )
    }
  }

  _onPshootTBodyCompose = () => {
    const table = this.state.table;
    let  tBodyArr = [...table];
    tBodyArr = tBodyArr.slice(1, -1);

      return (
        <tbody>
          {tBodyArr.map((item, index) => (
            <DataTableRow key={index} header={false} footer={false} clickHandler={this._onDetailTableCreate}>
              {item.map((v, i) => (
                <DataTableCell key={i} content={v} day={i} />
              ))}
            </DataTableRow>
          ))}
        </tbody>
      )
  }

  _onPshootTfootCompose = () => {
    const table = this.state.table;
    const arr = [...table];
    const tFootArr = arr.pop()

    if (tFootArr) {
      return (
        <tfoot>
          <DataTableRow key={'tFoot'} header={false} footer={true}>
            {tFootArr.map((v, i) => (
              <DataTableCell key={i} content={v} day={i} />
            ))}
          </DataTableRow>
        </tfoot>
      )
    }
  }

  _onDetailTableCompose = () => {
    const table = this.state.detailTable;
    return (
      <table className='table_detail'>
      <tbody>
        {table.map((item, index) => (
          <DataTableRow key={index} header={false} footer={false}>
            {item.map((v, i) => (
              <DataTableCell key={i} content={v} day={i} />
            ))}
          </DataTableRow>
        ))}
      </tbody>
      </table>
    )
  }

  render() {
    return (
      <div>
        <table className="table_photoshoot">
          {this._onPshootTheadCompose()}
          {this._onPshootTBodyCompose()}
          {this._onPshootTfootCompose()}
          
        </table>
        {this._onDetailTableCompose()}
      </div>
      
    );
  }
}