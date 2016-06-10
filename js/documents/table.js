import React, { Component, PropTypes } from 'react';

export default class Table extends Component {
  static propTypes = {
    cols: PropTypes.array,
    data: PropTypes.array,
    decorator: PropTypes.func,
    filterCallback: PropTypes.func
  };

  static defaultProps = {
    decorator: () => '',
    filterCallback: () => true
  };

  renderCols(row){
    return this.props.cols.map((col, i) => {
      return <td key = {i}>{col.format(row[col.id], row)}</td>
    });
  }

  renderRows(){
    var prevRow = null;
    return this.props.data.map((row, i) =>{
      if(!this.props.filterCallback(row)) return;
      let className = this.props.decorator(prevRow, row);
      prevRow = row;
      return <tr key ={i} className = {className} >{this.renderCols(row)}</tr>
    });
  }

  render() {
    return (
      <table >
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}
