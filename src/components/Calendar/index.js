import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import moment from 'moment';
import Chart from '../Chart';

import './calendar.css';
import 'moment/locale/en-gb';
import 'moment/locale/nl';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import EditActivity from '../EditActivity';
import AddActivity from '../AddActivity';
import ActivityList from '../ActivityList';


function Calendar(props) {

    const {firebase, authUser} = props;

    let defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
    };

    const [dateObject, setdateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    const [months, setMonths] = useState([]);

    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");
    const currentMonthNum = () => dateObject.month();
    const actualMonth = () => moment().format("MMMM");
    const allMonths = moment.months();

    const toggleMonthSelect = () => {
        setShowMonthTable(!showMonthTable);
    }

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let dateObject2 = Object.assign({}, dateObject);
        dateObject2 = moment(dateObject).set("month", monthNo);
        setdateObject(dateObject2);
        setMonths([]);
        setShowMonthTable(false);
    }

    const firstDayOfMonth = () => {
        let dateObject2 = dateObject;
        let firstDay = moment(dateObject2).startOf("month").format("d");
        return firstDay;
    }

    // Update the clicked day
    const setSelectedDay = (day) => {
        setSelected({
                day,
                month: currentMonthNum()
        });
        retrieveData();
    };

    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    // Retrieve data from firebase
    const retrieveData = () => {
        
        let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

        let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
        ref.orderByChild("date").equalTo(queryDate).on("value", snapshot => {
            let data = snapshot.val();
            setActivities(data);
            setLoading(false);
            setEditing(false);
        });

        // Update active days
        retrieveActiveDays();
    };

    // Get array of days with activities
    const [activeDays, setActiveDays] = useState([]);

    // Also store them for in the chart
    let defaultChartData = {
        activeDays: []
    }
    const [chartData, setChartData] = useState(defaultChartData);

    const retrieveActiveDays = () => {
        let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
        ref.on("value", snapshot => {
            let data = snapshot.val();
            const values = Object.values(data);
            // Store all active day/month combinations in array for calendar
            const arr = values.map(obj => obj.date.slice(0,4));
            setActiveDays(arr);
            // Store all active days in array for chart
            const chartArr = values.map(obj => parseInt(obj.date.slice(0,2)));
            setChartData({...chartData, activeDays: chartArr });
        });
    }

    // Retrieve firebase data every time selectedDay changes
    useEffect(() => {
        retrieveData();
    }, [selectedDay])

    // Edit activity
    const [editing, setEditing] = useState(false);
    const [activity, setActivity] = useState(null);
    const [activityKey, setActivityKey] = useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState(null);

    const editActivity = (activity, i) => {
        setActivityKey(Object.keys(activities)[i]);
        setEditing(true);
        setActivity(activity);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                    <CalendarHead
                        allMonths={allMonths}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        setMonth={setMonth}
                        months={months}
                        showMonthTable={showMonthTable}
                        toggleMonthSelect={toggleMonthSelect}
                    />
                    <CalendarBody 
                        firstDayOfMonth={firstDayOfMonth}
                        daysInMonth={daysInMonth}
                        currentDay={currentDay}
                        currentMonth={currentMonth}
                        currentMonthNum={currentMonthNum}
                        actualMonth={actualMonth}
                        setSelectedDay={setSelectedDay}
                        selectedDay={selectedDay}
                        weekdays={moment.weekdays()} 
                        activeDays={activeDays}
                    />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
                <Paper className="paper">
                    { editing
                        ?
                            <>
                                <h3>Edit activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <EditActivity 
                                    activity={activity}
                                    activityKey={activityKey}
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setEditing={setEditing}
                                    setOpenAlert={setOpenAlert}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                        :
                            <>
                                <h3>Add activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <AddActivity 
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setOpenAlert={setOpenAlert}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                    }
                </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
                <Paper className="paper">
                <h3>Activities on {selectedDay.day}-{selectedDay.month + 1}</h3>
                <ActivityList
                    loading={loading}
                    activities={activities}
                    authUser={props.authUser}
                    editActivity={editActivity}
                    setOpenAlert={setOpenAlert}
                    setSnackbarMsg={setSnackbarMsg}
                    setEditing={setEditing}
                />
                </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
                <Paper className="paper">
                    <h3>Statistics for {currentMonth()}</h3>
                    <Chart 
                        month={currentMonthNum()}
                        daysInMonth={daysInMonth()}
                        chartData={chartData}
                    />
                </Paper>
            </Grid>


            <Snackbar 
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                open={openAlert} 
                message={snackbarMsg}
            />
        </Grid>
    )
};

export default withFirebase(Calendar);