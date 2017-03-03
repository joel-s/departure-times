# departure-times

Show live departure information for North and South Station (MBTA only).


## Code in this repository

This React app was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).

Some CSS in `src/DepartureDisplay.css` was leveraged from the [*React: Up and Running* accompanying files repository](https://github.com/stoyan/reactbook). All other code was either initially part of the create-react-app bootstrap or entirely written by Joel Sullivan.


## Design

The main JavaScript files are `src/DepartureDisplay.js` and `src/DepartureState.js`.

The `DepartureDisplay` class implements the "\<DepartureDisplay\>" react component. It is fairly simple: it attempts to download the departures CSV file using `papaparse` (from http://papaparse.com/). It keeps downloading new CSV data every 10 seconds. (It downloads the data via a super-simple PHP proxy script to prevent cross-origin request errors.) On each successful download, it uses the CSV data to create a new `DepartureState` object, and calls `setState` to trigger updating of the UI.

The `DepartureState` class does all of the data extraction and rendering work. It's designed to be easily testable, whereas testing `DepartureDisplay` would require more work. (Testability was one of the reasons for having this be a separate class.)

The file `src/App.js` is a modified remnant of the create-react-app boilerplate. It is simply used to display the "Departures" heading and could easily be folded into `public/index.html`, although that would require migrating the CSS.
