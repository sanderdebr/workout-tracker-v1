import React from 'react';
import moment from 'moment';
import './calendar.css';
import 'moment/locale/en-gb';
import 'moment/locale/nl';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import AddActivity from '../AddActivity';

class Calendar extends React.Component {
    constructor() {
        super();

        this.state = {
            dateObject: moment(),
            allMonths: moment.months(),
            showMonthTable: false,
            selectedDay: {
                day: moment().format("D"),
                month: moment().month()
            },
            months: [],
        }
    }

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject).startOf("month").format("d");
        return firstDay;
    }
    
    daysInMonth = () => this.state.dateObject.daysInMonth();
    currentDay = () => this.state.dateObject.format("D");
    currentMonth = () => this.state.dateObject.format("MMMM");
    currentMonthNum = () => this.state.dateObject.month();
    actualMonth = () => moment().format("MMMM");
    currentYear = () => this.state.dateObject.format("YYYY")

    setMonth = month => {
        let monthNo = this.state.allMonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        console.log(dateObject);
        this.setState({
            dateObject,
            months: []
        })
        this.toggleMonthSelect();
    }

    toggleMonthSelect = () => {
        this.setState({ showMonthTable: !this.state.showMonthTable })
    }

    setSelectedDay = (day) => {
        this.setState({
            selectedDay: {
                day,
                month: this.currentMonthNum()
            }
        });
    }

    render() {

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                        <CalendarHead
                            allMonths={this.state.allMonths}
                            currentMonth={this.currentMonth}
                            currentYear={this.currentYear}
                            setMonth={this.setMonth}
                            months={this.state.months}
                            showMonthTable={this.state.showMonthTable}
                            toggleMonthSelect={this.toggleMonthSelect}
                        />
                        <CalendarBody 
                            firstDayOfMonth={this.firstDayOfMonth}
                            daysInMonth={this.daysInMonth}
                            currentDay={this.currentDay}
                            currentMonth={this.currentMonth}
                            currentMonthNum={this.currentMonthNum}
                            actualMonth={this.actualMonth}
                            setSelectedDay={this.setSelectedDay}
                            selectedDay={this.state.selectedDay}
                            weekdays={moment.weekdays()} 
                        />
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper className="paper">
                        <h3>Add activity on {this.state.selectedDay.day}-{this.state.selectedDay.month + 1} </h3>
                        <AddActivity selectedDay={this.state.selectedDay} />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className="paper">
                    <h2>Activities for {this.state.selectedDay.day}-{this.state.selectedDay.month + 1}</h2>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default Calendar;