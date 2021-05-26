import React from 'react';
import { makeObservable } from 'mobx';
import {action} from 'mobx';
import {observable} from 'mobx';
import LunchStore from './lunchStore';

export default class TableStore {
tablePage: number = 0;
numberOfRows: number = 5;

setPageForTodaysLunch() {
    const store = new LunchStore();
    this.tablePage = Math.floor(store.getTodaysLunch.rank/this.numberOfRows);
  };

changePage = (newPage: number) => {
    this.tablePage = newPage;
};

constructor () {
    makeObservable(this, {
        tablePage: observable,
        setPageForTodaysLunch: action,
        changePage: action,
      })};
}