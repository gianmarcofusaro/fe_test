import * as React from 'react';

export default function DataTableRow(props) {

  const cellMarkup = props.header ? (
    <tr className="tr-header">
      {props.children}
    </tr>
  ) : (
      <tr className="tr" onClick={props.clickHandler}>
        {props.children}
      </tr>
    );

  return (cellMarkup);
}