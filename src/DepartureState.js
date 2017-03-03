import React from 'react';

/**
 * Immutable object used to save and format departure state information.
 */
class DepartureState {

  constructor(data) {
    this.headers = ["Time", "Destination", "Train#", "Track#", "Status"];
    this.northData = data.filter(item => item.Origin === "North Station");
    this.southData = data.filter(item => item.Origin === "South Station");
  }

  render() {
    return (
      <div>
        <h3>North Station</h3>
        {this._renderTable(this.northData)}
        <h3>South Station</h3>
        {this._renderTable(this.southData)}
      </div>
    );
  }

  _renderTable(data) {
    return (
      <table>
        <thead>
          {this._renderHeaderRow()}
        </thead>
        <tbody>
          {data.map((row) => this._renderRow(row))}
        </tbody>
      </table>
    )
  }

  _renderHeaderRow() {
    return (
      <tr key="header">
        {this.headers.map(name => <th key={name}>{name}</th>)}
      </tr>
    );
  }

  _renderRow(row) {
    return (
      <tr key={row.Trip}>
        <td key="Time" className="time">
          {this._formatTime(row.ScheduledTime)}
        </td>
        <td key="Destination">{row.Destination}</td>
        <td key="Train">{row.Trip}</td>
        <td key="Track">{row.Track}</td>
        <td key="Status">{row.Status}</td>
      </tr>
    );
  }

  _formatTime(time) {
    var d = new Date(time * 1000);  // convert to milliseconds
    var s = d.toLocaleTimeString();
    var splitArray = s.split(":00 ");  // get rid of seconds
    return splitArray[0] + " " + splitArray[1];
  }
};

export default DepartureState;
