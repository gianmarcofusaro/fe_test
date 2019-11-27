import * as React from 'react';

export default function Cell(props) {

  const cellMarkup = props.header ? (
    <td className="cell cell-header">
      {props.content}
    </td>
  ) : (
      <td className={props.content === 0 && 'empty' + '_cell'} data-day={props.day}>
        {props.content}
      </td>
    );

  return (cellMarkup);
}