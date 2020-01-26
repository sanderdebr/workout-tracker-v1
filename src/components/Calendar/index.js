import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import moment from 'moment';
import './calendar.css';
import 'moment/locale/en-gb';
import 'moment/locale/nl';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import AddActivity from '../AddActivity';
import ActivityList from '../ActivityList';

function Calendar(props) {

    let defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
    };

    const [dateObject, setdateObject] = useState(moment());
    const [allMonths, setAllMonths] = useState(moment.months());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    const [months, setMonths] = useState([]);

    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");
    const currentMonthNum = () => dateObject.month();
    const actualMonth = () => moment().format("MMMM");

    const toggleMonthSelect = () => {
        setShowMonthTable(!showMonthTable);
    }

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let dateObject2 = Object.assign({}, dateObject);
        dateObject2 = moment(dateObject).set("month", monthNo);
        setdateObject(dateObject2);
        setMonths([]);
        toggleMonthSelect();
    }

    const firstDayOfMonth = () => {
        let dateObject2 = dateObject;
        let firstDay = moment(dateObject2).startOf("month").format("d");
        return firstDay;
    }

    const setSelectedDay = (day) => {
        setSelected({
                day,
                month: currentMonthNum()
        });
        retrieveData();
    };

    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        retrieveData();
    }, [selectedDay])

    const retrieveData = () => {
        const {firebase, authUser} = props;
        
        let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

        let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
        const listener = ref.orderByChild("date").equalTo(queryDate).on("value", snapshot => {
            let data = snapshot.val();
            setActivities(data);
            setLoading(false);
        });
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
                    />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
                <Paper className="paper">
                    <h3>Add activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                    <AddActivity 
                        selectedDay={selectedDay} 
                        authUser={props.authUser}
                    />
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper className="paper">
                <h2>Activities for {selectedDay.day}-{selectedDay.month + 1}</h2>
                <ActivityList
                    loading={loading}
                    activities={activities}
                />
                </Paper>
            </Grid>

        </Grid>
    )
};

export default withFirebase(Calendar);