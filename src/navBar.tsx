import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ButtonGroup } from '@material-ui/core';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navbar: {
        float: 'left',
    }
  }),
);

function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Rate my lunch
          </Typography>
          <ButtonGroup variant="text" className={classes.navbar} color="primary" aria-label="contained primary button group">
            <Button color="inherit">Week</Button>
            <Button color="inherit">Month</Button>
            <Button color="inherit">Year</Button>
            <Button color="inherit">All time</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}