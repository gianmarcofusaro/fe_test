import React from 'react';
import '../App.css';
import { DaysTypes } from '../enums/mapDayToNumber';
import { photoshootsRowComposer } from '../helpers/rowComposer';
import DataTableCell from './DataTableCell';
import DataTableRow from './DataTableRow';
export default class DataTable extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = { 
      table: [],
      rows: this.props.rows,
      cols: this.props.cols,
      detail: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rows !== this.props.rows) {
      const rows = this.props.rows;
      this._onRowsCreate(rows);
    }
  } 

  componentWillMount() {
    this._onColsCreate();
  }

  _onColsCreate = () => {
    const cols = this.state.cols;
    const table = this.state.table;
    
    table.push(cols);
    this.setState({ table: table })
  }

  _onRowsCreate = (rows) => {
    if(rows) {
      const table = this.state.table;
      let auxTypesArr = [];
      let row = []

      rows.map( (item) => {
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


  _onTableCompose = () => {
    const table = this.state.table;
    return (
      <React.Fragment>
        {table.map((item, index) => (
          <DataTableRow key={index} header={index === 0 ? true : false} clickHandler={this.handleClick}>
            {item.map((v, i) => (
              <DataTableCell key={i} content={v} day={i} />
            ))}
          </DataTableRow>
        ))}
      </React.Fragment>
    );
  }


  //TODO: ...progress
  // check for duplicates within IDArray -> if duplicates merge it and return arr = [id, counter]
  // map the new array -> create rows -> render
  handleClick = (event) => {
    const dayOfWeek = event.target.attributes.getNamedItem('data-day').value;
    const rows = this.props.rows;
    let idArr = []

    rows.map((item) => {
      if (item.day_of_the_week === DaysTypes[dayOfWeek]) {
        idArr.push(item.client_id)
      }
    })

    // const count = idArr.map((id) => {     
    //   return rows.filter((item) => item.client_id === id).length;
    // })
    alert(JSON.stringify(idArr))
  }

  render() {
    const tableBody = this._onTableCompose();

    return (
      <div>
        <table className="table">
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    );
  }
}