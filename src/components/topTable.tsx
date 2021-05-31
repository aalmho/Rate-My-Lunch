import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { TableFooter, Typography } from '@material-ui/core';
import LunchStore from '../stores/lunchStore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination';
import TableStore from '../stores/tableStore';
import { lunch } from '../types/lunch';
import { observer } from "mobx-react-lite";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

function TopTable() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const useStyles = makeStyles({
        lunchTable: {
          marginLeft: 20,
          marginRight: 20,
          height: 400,
        }, title: {
            flexGrow: 1,
          },
      });
    
    const classes = useStyles();

    const location = useLocation().pathname.substr(1).trim();

    const lunchStore = new LunchStore();

    const sysDate = Date();
    const sysDay: number = +sysDate.substr(8,2).trim();

    const getMillisecondsFromNumberOfDays = (numberOfDays: number) => {
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
        return numberOfDays * oneDayInMilliseconds;
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const todayInMilliseconds = Date.now();
    const weekInMilliseconds: number = getMillisecondsFromNumberOfDays(7);
    const monthInMilliseconds: number = getMillisecondsFromNumberOfDays(sysDay);
    const yearInMilliseconds: number = getMillisecondsFromNumberOfDays(360);

    const bestOfWeek: lunch[] = lunchStore.lunchList.filter((lunch) => lunch.date.getTime() > (todayInMilliseconds - weekInMilliseconds));
    const bestOfMonth: lunch[] = lunchStore.lunchList.filter((lunch) => lunch.date.getTime() > (todayInMilliseconds - monthInMilliseconds));
    const bestOfYear: lunch[] = lunchStore.lunchList.filter((lunch) => lunch.date.getTime() > (todayInMilliseconds - yearInMilliseconds));
    const allTimeBest: lunch[] = lunchStore.lunchList;

    let list: lunch[] = [];

    if(location === 'week') {
        list = bestOfWeek;
    } else if(location === 'month') {
        list = bestOfMonth;
    } else if(location === 'year') {
        list = bestOfYear;
    } else {
        list = allTimeBest;
    }
    
    return (
        <Grid container wrap ="nowrap" justify="center" direction='column'>
            <Grid item>
                <Typography variant="h2" className={classes.title} align="center">
                {location}
                </Typography>
            </Grid>
            <Grid item className={classes.lunchTable}>
        <Paper>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Dish</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Dislikes</TableCell>
                <TableCell>Total difference</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort((a, b) => a.rank - b.rank).map((lunch) => (
                <TableRow key={lunch.id}>
                  <TableCell width={200}>{lunch.rank} </TableCell>
                  <TableCell width={200}>{lunch.dish}</TableCell>
                  <TableCell width={200}>{lunch.likes}</TableCell>
                  <TableCell width={200}>{lunch.dislikes}</TableCell>
                  <TableCell width={200}>{lunch.likes - lunch.dislikes}</TableCell>
                  <TableCell width={200}>{lunch.date.toDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          </TableFooter>
          </Table>
        </TableContainer>
        </Paper>
        </Grid>
        </Grid>
      );
}

export default observer(TopTable);