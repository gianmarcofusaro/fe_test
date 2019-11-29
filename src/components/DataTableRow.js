import React from 'react';

export default function DataTableRow(props) {

  const renderHeader = () => {
    return (
      <tr className={'tr-header'}>
        {props.children}
      </tr>
    )
  }

  const renderFooter = () => {
    return (
      <tr className={'tr-footer'}>
        {props.children}
      </tr>
    )
  }

  const renderBody = () => {
    return (
      <tr className={'tr-body'} onClick={props.clickHandler} data-phototype={props.phototype}>
        {props.children}
      </tr>
    )
  }

  const cellMarkup = props.header ? (renderHeader() ) : props.footer ? (renderFooter()) : (renderBody());

  return (cellMarkup);
}
