import React from 'react';
import './App.css';
import LunchCard from './components/todaysLunch';
import Grid from '@material-ui/core/Grid';
import LunchTable from './components/lunchList';
import LunchStore from './stores/lunchStore';
import NavBar from './components/navBar';
import Home from './components/home';
import { makeStyles } from '@material-ui/core';
import TableStore from './stores/tableStore';

function App() {
  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
