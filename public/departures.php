<?php
  header('Content-Type: text/csv');
  echo file_get_contents('http://developer.mbta.com/lib/gtrtfs/Departures.csv');
?>
