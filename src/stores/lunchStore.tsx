import React from 'react';
import { makeObservable } from 'mobx';
import {action} from 'mobx';
import {observable} from 'mobx';
import { computed } from 'mobx';

export default class LunchStore {
lunchList: lunch[] = lunchData;


get getTodaysLunch() {
    return this.lunchList.slice().sort((a,b) => b.date.getDate() - a.date.getDate())[0];
};

likeLunch(id: number) {
    const lunchIndex = this.lunchList.findIndex((lunch) => id === lunch.id);
    const likedLunch = this.lunchList[lunchIndex];
    likedLunch.likes +=1;
    this.lunchList[lunchIndex] = likedLunch;
    this.updateRank();
};

dislikeLunch(id: number) {
    const lunchIndex = this.lunchList.findIndex((lunch) => id === lunch.id);
    const dislikedLunch = this.lunchList[lunchIndex];
    dislikedLunch.dislikes +=1;
    this.lunchList[lunchIndex] = dislikedLunch;
    this.updateRank();
};

get getLunchData () {
    return this.lunchList;
};

updateRank = () => {
    const sortedList = this.lunchList.sort((a,b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
    const rankedList: lunch[] = [];
    sortedList.forEach((lunch, index) => {
        lunch.rank = index + 1;
        rankedList.push(lunch);
    });
    this.lunchList = sortedList;
};

constructor () {
    makeObservable(this, {
        lunchList: observable,
        getTodaysLunch: computed,
        likeLunch: action,
        dislikeLunch: action,
        getLunchData: computed,
        updateRank: action,
      })};
}

const lunchData: lunch[] = [
    { id: 1, dish: 'Carbonara', rank: 1, likes: 65, dislikes: 2, date: new Date('June 23, 2021 23:15:30')},
    { id: 2, dish: 'Lasagne', rank: 2, likes: 58, dislikes: 2, date: new Date('June 22, 2021 23:15:30')},
    { id: 3, dish: 'Pasta pølser', rank: 3, likes: 44, dislikes: 3, date: new Date('June 21, 2021 23:15:30')},
    { id: 4, dish: 'Beluga linser på pita', rank: 4, likes: 40, dislikes: 6, date: new Date('June 20, 2021 23:15:30')},
    { id: 5, dish: 'Hotdogs', rank: 5, likes: 35, dislikes: 5, date: new Date('June 19, 2021 23:15:30')},
    { id: 6, dish: 'Pizza', rank: 6, likes: 35, dislikes: 5, date: new Date('June 18, 2021 23:15:30')},
    { id: 7, dish: 'test', rank: 7, likes: 35, dislikes: 5, date: new Date('June 17, 2021 23:15:30')},
    { id: 8, dish: 'test1', rank: 8, likes: 35, dislikes: 5, date: new Date('June 16, 2021 23:15:30')},
    { id: 9, dish: 'test2', rank: 9, likes: 35, dislikes: 5, date: new Date('June 15, 2021 23:15:30')},
    { id: 10, dish: 'test3', rank: 10, likes: 35, dislikes: 5, date: new Date('June 14, 2021 23:15:30')},
  ];

type lunch = {
    id: number,
    dish: string,
    rank: number,
    likes: number,
    dislikes: number,
    date: Date,
};