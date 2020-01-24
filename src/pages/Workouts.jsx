import React from 'react';
import Calendar from '../components/Calendar';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from '../config/theme-dashboard';

function Workouts(props) {
    const classes = useStyles();

    return (
        <Calendar />
    )
}

export default Workouts;