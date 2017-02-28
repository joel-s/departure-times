import React, { PureComponent } from 'react';
import Papa from 'papaparse';
import './DepartureDisplay.css';


class DepartureDisplay extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      sortBy: null, // rowIdx
      descending: false,
    }
  }

  render() {
    return (
      <div className="DepartureDisplay">
        {this._renderTable()}
      </div>
    )
  }

  _renderTable() {
    if (this.state.data === null) {
      return <div className="loading">Loading...</div>
    }
    return (
      <table>
        <thead>
          <tr>{
            this.props.headers.map((title, idx) => {
              let header = title;
              if (this.state.sortBy === idx) {
                header += this.state.descending ? ' \u2191' : ' \u2193';
              }
              return (
                <th
                  key={idx}
                  onClick={this._sortToggle.bind(this, idx)}
                >
                  {header}
                </th>
              )
            })
          }

          </tr>
        </thead>
        <tbody>{
          this.state.data.map((row, rowIdx) =>
            <tr key={rowIdx}>{
              row.map((cell, idx) => {
                let contents = cell;
                return (
                  <td
                    key={idx}
                    data-row={rowIdx}
                  >
                    {contents}
                  </td>
                )
              })
            }</tr>
          )
        }</tbody>
      </table>
    )
  }

  _sortToggle(column) {
    let newState = null;
    if (this.state.sortBy === column) {
      newState = {descending: !this.state.descending}
    } else {
      newState = {sortBy: column, descending: false}
    }
    let order = newState.descending ? -1 : 1;
    let newData = Array.from(this.state.data)
    newData.sort((a, b) => a[column] > b[column] ? order : -order)
    newState.data = newData
    this.setState(newState)
  }

}

export default DepartureDisplay;
