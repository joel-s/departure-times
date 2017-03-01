import React, { PureComponent } from 'react';
import Papa from 'papaparse';
import DepartureState from './DepartureState';
import './DepartureDisplay.css';


class DepartureDisplay extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      sortBy: null, // rowIdx
      descending: false,
    }

    this.POLL_INTERVAL = 1000;  // milliseconds

    // Start polling at (approximately) set intervals.
    this.pollDisplatData();
    setInterval(() => this.pollDisplayData(), this.POLL_INTERVAL);
  }

  pollDisplayData() {
    Papa.parse("http://developer.mbta.com/lib/gtrtfs/Departures.csv", {
      delimiter: ",",
      header: true,
      dynamicTyping: true,
      download: true,
    	complete: results => {
        var newState = this.convertCsvToState(results);
    		this.setState(newState);
    	}
    });
  }

  convertCsvToState(results) {
    if (results.errors) {
      results.errors.forEach(error => console.error(error));
    }
    if (results.data) {
      return new DepartureState(results.data);
    } else {
      return null;
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

}

export default DepartureDisplay;
