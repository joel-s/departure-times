import React, { PureComponent } from 'react';
import Papa from 'papaparse';
import DepartureState from './DepartureState';
import './DepartureDisplay.css';

/**
 * A React component that displays departure information.
 *
 * This class is fairly simple: it attempts to download the departures CSV file
 * using papaparse (from http://papaparse.com/). It keeps downloading new CSV
 * data every POLL_INTERVAL milliseconds. (It downloads the data via a
 * super-simple PHP proxy script to prevent cross-origin request errors.) On
 * each successful download, it uses the CSV data to create a new immutable
 * DepartureState object, and calls setState to trigger updating of the UI.
 *
 * See DepartureState for the complete rendering code.
 */
class DepartureDisplay extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      dstate: null  // null or DepartureState object
    };

    this.POLL_INTERVAL = 10 * 1000;  // 10 seconds

    // Start polling at (approximately) set intervals.
    this.pollDepartureData();
    setInterval(() => this.pollDepartureData(), this.POLL_INTERVAL);
  }

  /** Attempt to download departure data */
  pollDepartureData() {
    Papa.parse(this.getCsvUrl(), {
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
        {this._renderData()}
      </div>
    )
  }

  _renderData() {
    if (this.state.dstate === null) {
      return <div className="loading">Waiting for response...</div>
    } else {
      return this.state.dstate.render();
    }
  }

}

export default DepartureDisplay;
