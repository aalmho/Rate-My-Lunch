import React from 'react';
import LunchCard from './todaysLunch';
import Grid from '@material-ui/core/Grid';
import LunchTable from './lunchList';
import LunchStore from '../stores/lunchStore';
import { makeStyles } from '@material-ui/core';
import TableStore from '../stores/tableStore';

function Home() {

const useStyles = makeStyles({
    lunchTable: {
      marginLeft: 20,
      marginRight: 20,
      height: 400,
    }
  });

    const classes = useStyles();

    const lunchStore = new LunchStore();
    const tableStore = new TableStore();

    return(
        <div>
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

export default Home;