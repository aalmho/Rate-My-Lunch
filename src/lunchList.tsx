import React, { useEffect } from 'react';
import { TableFooter } from '@material-ui/core';
import LunchStore from './stores/lunchStore';
import { observer } from "mobx-react-lite";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination';
import TableStore from './stores/tableStore';

interface IProps {
  lunchStore: LunchStore;
  tableStore: TableStore;
}

function LunchTable({lunchStore, tableStore}: IProps) {

  useEffect(() => {
    tableStore.setPageForTodaysLunch();
    tableStore.changePage(Math.ceil((lunchStore.getTodaysLunch.rank / tableStore.numberOfRows) - 1 ))
  }, [lunchStore.getTodaysLunch.rank]);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    tableStore.changePage(newPage);
  };

  return (
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
            {lunchStore.lunchList.slice(tableStore.tablePage * tableStore.numberOfRows, tableStore.tablePage * tableStore.numberOfRows + tableStore.numberOfRows).sort((a, b) => a.rank - b.rank).map((lunch) => (
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
        rowsPerPageOptions={[]}
        count={lunchStore.lunchList.length}
        rowsPerPage={tableStore.numberOfRows}
        page={tableStore.tablePage}
        onChangePage={handleChangePage}
      />
      </TableFooter>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default observer(LunchTable);