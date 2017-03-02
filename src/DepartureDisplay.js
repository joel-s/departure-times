import React, { PureComponent } from 'react';
import Papa from 'papaparse';
import DepartureState from './DepartureState';
import './DepartureDisplay.css';


class DepartureDisplay extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {dstate: null};  // null or DepartureState object

    this.POLL_INTERVAL = 10 * 1000;  // 10 seconds

    // Start polling at (approximately) set intervals.
    this.pollDisplayData();
    setInterval(() => this.pollDisplayData(), this.POLL_INTERVAL);
  }

  pollDisplayData() {
    Papa.parse("sample-departures.csv", {
      delimiter: ",",
      header: true,
      download: true,
    	complete: results => {
        var newState = this.convertCsvToState(results);
    		this.setState({dstate: newState});
    	}
    });
  }

  getCsvUrl() {
    if (window.location.hostname === "localhost") {
      return "sample-departures.csv";
    } else {
      return "departures.php";
    }
  }

  convertCsvToState(results) {
    if (results.errors) {
      results.errors.forEach(error => {
        if (error.code !== "TooFewFields") {
          console.error(error)
        }
      });
    }
    if (results.data) {
      var data = results.data.filter(item => item.TimeStamp !== "");
      return new DepartureState(data);
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
    if (this.state.dstate === null) {
      return <div className="loading">Waiting for response...</div>
    } else {
      return this.state.dstate.renderTable();
    }
  }

}

export default DepartureDisplay;
