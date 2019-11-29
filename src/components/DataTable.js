import React from 'react';
import { DaysTypes } from '../enums/mapDayToNumber';
import { photoshootsRowFiller } from '../helpers/rowComposer';
import DataTableCell from './DataTableCell';
import DataTableRow from './DataTableRow';
import './TableStyles.css';
import { keygen } from '../helpers/keyGenerator';
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

  // waiting for props from async API call
  componentDidUpdate(prevProps) {
    if (prevProps.rows !== this.props.rows) {
      const rows = this.props.rows;
      this._onPshootColsCreate();
      this._onPshootRowsCreate(rows);
    }
  }

  // on create cols within table, will be a matrix
  _onPshootColsCreate = () => {
    const cols = this.state.cols;
    const table = this.state.table;
    table.push(cols);
    this.setState({ table: table })
  }

  // create rows within table, create matrix
  _onPshootRowsCreate = (rows) => {
    if (rows) {
      const table = this.state.table;
      let auxTypesArr = [];
      let row = [];

      
      rows.map((item) => {
        // create auxiliar matrix with photo types (rows)
        if (!auxTypesArr.includes(item.type)) {
          row = Array(8).fill(0);
          auxTypesArr.push(item.type);
          row[0] = item.type;
          table.push(row)
        } else {
          // find the right row where to put stuff
          table.map(el => {
            el.includes(item.type) ? row = el : row = row
          })
        }
        const testExpr = item.day_of_the_week;
        // find the right cell to put stuff
        photoshootsRowFiller(testExpr, row)
      })

      // add last array of item, will be table footer
      row = Array(8).fill(0)
      const body = [...table]
      body.shift();
      body.map((item, index) => {
        item.map((el, i) => {
          i === 0 ? row[0] = 'Total' : row[i] = row[i] + el
        })
      })

      table.push(row)
      this.setState({ table: table })
    }
  }

  _onDetailTableCreate = (event) => {
    // retrive the name of photo type from DOM attribute
    const photoType = event.target.parentElement.attributes.getNamedItem('data-phototype').value;
    const rows = this.props.rows;
    let table = [];
    let typesTable = [];
    let row = [];
    // filter data by photoType and return the right objects
    typesTable = rows.filter(obj => {
      return obj.type === photoType
    })

    typesTable.map((item, i) => {
      const rowIndex = DaysTypes[item.day_of_the_week];
      row = Array(8).fill(0);
      row[0] = `Client: ${item.client_id}`;
      row[rowIndex] = row[rowIndex] + 1;
      table.push(row);
    }) 
    
    this.setState({ detailTable: table})  
  }

  // create a function to compose rows and save some bit
  // I'm usign a keygen() helper because my data are not good to be used as unique key
  _DataTableRowComposer = (arr, header, footer) => {
    return(
      <DataTableRow header={header} footer={footer}>
        {arr.map((v, i) => (
          <DataTableCell key={keygen()} content={v} day={i} />
        ))}
      </DataTableRow>
    )
  }

  _onPshootTheadCompose = () => {
    const table = this.state.table;
    const arr = [...table]; // copy the entire matrix
    const tHeadArr = arr.shift(); // return first array 

    if (tHeadArr) return ( 
      <thead>
        {this._DataTableRowComposer(tHeadArr, true, false)}
      </thead> 
    )
  }

  _onPshootTBodyCompose = () => {
    const table = this.state.table;
    const arr = [...table];  // copy the entire matrix
    const tBodyArr = arr.slice(1, -1);  // return the matrix whithout first and last arrays

    return (
      <tbody>
        {tBodyArr.map((item, index) => (
          <DataTableRow key={keygen()} header={false} footer={false} phototype={item[0]} clickHandler={this._onDetailTableCreate}>
            {item.map((v, i) => (
              <DataTableCell key={keygen()} content={v} day={i} />
            ))}
          </DataTableRow>
        ))}
      </tbody>
    )
  }

  _onPshootTfootCompose = () => {
    const table = this.state.table;
    const arr = [...table]; // copy the entire matrix
    const tFootArr = arr.pop(); // return last arrays
    if (tFootArr) return ( 
      <tfoot>
        {this._DataTableRowComposer(tFootArr, false, true)}
      </tfoot> 
    )
  }

  _onDetailTableCompose = () => {
    const table = this.state.detailTable;

    if (table.length) {
      return (
        <table className={'table_detail'}>
          <tbody>
            {table.map((item, index) => (
              <DataTableRow key={index} header={false} footer={false}>
                {item.map((v, i) => (
                  <DataTableCell key={keygen()} content={v} day={i} />
                ))}
              </DataTableRow>
            ))}
          </tbody>
        </table>
      )
    }
  }

  render() {
    return (
      <div className={'table_container'}>
        <table className={'table_photoshoot'}>
          {this._onPshootTheadCompose()}
          {this._onPshootTBodyCompose()}
          {this._onPshootTfootCompose()}
        </table>
        {this._onDetailTableCompose()}
      </div>
    );
  }
}