import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ButtonGroup } from '@material-ui/core';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TopTable from './topTable';
import Home from './home';

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
      <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton component={Link} to={"/"} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title} align="justify">
            Rate my lunch
          </Typography>
          <ButtonGroup variant="text" className={classes.navbar} color="primary" aria-label="contained primary button group">
            <Button component={Link} to={"/week"} color="inherit">Week</Button>
            <Button component={Link} to={"/month"} color="inherit">Month</Button>
            <Button component={Link} to={"/year"} color="inherit">Year</Button>
            <Button component={Link} to={"/alltime"} color="inherit">All time</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/week"  component={TopTable}/>
        <Route path="/month"  component={TopTable}/>
        <Route path="/year"  component={TopTable}/>
        <Route path="/alltime"  component={TopTable}/>
    </Switch>
      </Router>
    </div>
  );
}