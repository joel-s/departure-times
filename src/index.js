import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DepartureDisplay from './DepartureDisplay';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

var headers = [
  "Time", "Destination", "Train#", "Track#", "Status"
];

var initialData = [
  ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"],
  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
  ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"],
  ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
  ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];

ReactDOM.render(
  <DepartureDisplay headers={headers} initialData={initialData}/>,
  document.getElementById('departure-display')
);
