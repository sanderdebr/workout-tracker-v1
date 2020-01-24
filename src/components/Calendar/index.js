import React from 'react';
import moment from 'moment';
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
            showMonthTable: false,
            selectedDay: {
                day: 22,
                month: 1
            },
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
    currentMonthNum = () => this.state.dateObject.month();
    actualMonth = () => moment().format("MMMM");
    currentYear = () => this.state.dateObject.format("YYYY")

    setMonth = month => {
        let monthNo = this.state.allMonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
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
            <>
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
            </>
        )
    }
}

export default Calendar;