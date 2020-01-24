import React from 'react';
import Calendar from '../components/Calendar';

import useStyles from '../config/theme-dashboard';

function Workouts(props) {
    const classes = useStyles();

    return (
        <Calendar authUser={props.authUser} />
    )
}

export default Workouts;