import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import LunchStore from '../stores/lunchStore';
import { observer } from "mobx-react-lite";

interface IProps {
  store: LunchStore;
}

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    margin: 20
  },
  title: {
    fontSize: 14,
  },
});

function LunchCard({store}: IProps) {
  const classes = useStyles();

  const [isClicked, setIsClicked] = useState(false);

  const todaysLunch = store.getTodaysLunch;

  const likeLunch = (id: number) => {
    if(!isClicked) {
      store.likeLunch(id);
    }
      setIsClicked(true);
  };

  const dislikeLunch = (id: number) => {
    if(!isClicked){
      store.dislikeLunch(id);
    }
    setIsClicked(true);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Todays lunch
        </Typography>
        <Typography variant="h5" component="h2">
          {todaysLunch.dish }
        </Typography>
        <Typography variant="body2" component="p">
          comment
        </Typography>
      </CardContent>
      <CardActions>
          <Grid container wrap="nowrap" spacing={2} justify="center">
              <Grid item>
                <IconButton onClick={()=> likeLunch(todaysLunch.id)}>
                    <FavoriteIcon/>
                    {todaysLunch.likes}
                </IconButton>
              </Grid>
              <Grid item>
                  <IconButton onClick={() => dislikeLunch(todaysLunch.id)}>
                    <ThumbDownIcon/>
                    {todaysLunch.dislikes}
                  </IconButton>
              </Grid>
            </Grid>
      </CardActions>
    </Card>
  );
};

export default observer(LunchCard);