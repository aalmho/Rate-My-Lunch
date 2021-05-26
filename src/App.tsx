import React from 'react';
import './App.css';
import LunchCard from './todaysLunch';
import Grid from '@material-ui/core/Grid';
import LunchTable from './lunchList';
import LunchStore from './stores/lunchStore';
import NavBar from './navBar';
import { makeStyles } from '@material-ui/core';
import TableStore from './stores/tableStore';

const useStyles = makeStyles({
  lunchTable: {
    marginLeft: 20,
    marginRight: 20,
    height: 400,
  }
});

function App() {
  const classes = useStyles();

  const lunchStore = new LunchStore();
  const tableStore = new TableStore();

  return (
    <div className="App">
      <NavBar/>
      <Grid container wrap ="nowrap" justify="center" direction='column'>
        <Grid item>
          <LunchCard store={lunchStore}/>
        </Grid>
        <Grid item className={classes.lunchTable}>
          <LunchTable lunchStore={lunchStore} tableStore={tableStore}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
