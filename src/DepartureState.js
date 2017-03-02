import React from 'react';

class DepartureState {

  constructor(data) {
    this.headers = ["Origin", "Time", "Destination", "Train#", "Track#", "Status"];
    this.data = data;
  }

  renderTable() {
    return (
      <table>
        <thead>
          {this._renderHeaderRow()}
        </thead>
        <tbody>
          {this.data.map((row) => this._renderRow(row))}
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
      <tr key={this._getRowKey(row)}>
        <td key="Origin">{row.Origin}</td>
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

  _getRowKey(row) {
    return row.Destination + row.ScheduledTime;
  }

  _formatTime(time) {
    var t = (+time) * 1000;  // convert to milliseconds
    var d = new Date(t);
    var s = d.toLocaleTimeString();
    var splitArray = s.split(":00 ");
    return splitArray[0] + " " + splitArray[1];
  }
};

export default DepartureState;
