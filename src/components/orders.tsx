import React, {FC} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Navbar from './navbar';

const useStyles = makeStyles((theme) => ({
    root: {
    },
  }));

const Orders:FC = ()=>{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Navbar title='Ratatouille'/>
            </Grid>
        </div>
    )
}

export default Orders;