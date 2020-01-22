import React from 'react';
import * as moment from 'moment';
import './calendar.css';
import 'moment/locale/en-gb';
import 'moment/locale/nl';

class Calendar extends React.Component {
    constructor() {
        super();

        this.state = {
            dateObject: moment(),
            locale: 'nl',
        }
    }

    weekdays = moment.weekdays();

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject).startOf("month").format("d");
        return firstDay;
    }
    daysInMonth = () => this.state.dateObject.daysInMonth();
    currentDay = () => this.state.dateObject.format("D");

    render() {

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td>{""}</td>
            )
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let currentDay;
            if (this.currentDay() == d) currentDay = "today";
            daysInMonth.push(
                <td key={d} className={currentDay}>{d}</td>
            );
        }

        let totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells)
            }
        })

        return (
            <table className="calendar">
                <thead>
                    <tr>
                        {
                            this.weekdays.map(day => (
                                <th key={day} className="week-day">
                                    {day}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((day, i) => <tr key={i}>{day}</tr>)
                    }
                </tbody>
            </table>
        )
    }
}

export default Calendar;