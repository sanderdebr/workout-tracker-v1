import React from 'react';
import * as moment from 'moment';
import './calendar.css';
import 'moment/locale/en-gb';
import 'moment/locale/nl';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';

class Calendar extends React.Component {
    constructor() {
        super();

        this.state = {
            dateObject: moment(),
            allMonths: moment.months(),
            months: [],
            locale: 'nl',
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

    setMonth = month => {
        let monthNo = this.state.allMonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        this.setState({
            dateObject,
            months: []
        })
    }
   
    render() {

        return (
            <>
                <CalendarHead
                    allMonths={this.state.allMonths}
                    currentMonth={this.currentMonth}
                    setMonth={this.setMonth}
                    months={this.state.months}
                />
                <CalendarBody 
                    firstDayOfMonth={this.firstDayOfMonth}
                    daysInMonth={this.daysInMonth}
                    currentDay={this.currentDay}
                    weekdays={moment.weekdays()} 
                />
            </>
        )
    }
}

export default Calendar;