import React from 'react';
import './calendar.css';
import nextId from "react-id-generator";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CalendarBody = props => {

    let blanks = [];
    for (let i = 0; i < props.firstDayOfMonth(); i++) {
        blanks.push(
            <TableCell key={nextId()}>{""}</TableCell>
        )
    }

    let daysInMonth = [];
    for (let d = 1; d <= props.daysInMonth(); d++) {
        let currentDay = "", selectedDay= "";
        if (props.currentDay() == d &&
            props.currentMonth() == props.actualMonth()) {
            currentDay = "today";
        }
        if (props.selectedDay.day == d &&
            props.currentMonthNum() == props.selectedDay.month ) {
            selectedDay = "selected-day";
        }

        daysInMonth.push(
            <TableCell 
                key={d} 
                className={`week-day ${currentDay} ${selectedDay}`}
                onClick={() => props.setSelectedDay(d)}
            >{d}</TableCell>
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
        <TableContainer component={Paper}>
            <Table className="calendar">
                <TableHead>
                    <TableRow>
                        {
                            props.weekdays.map((day, i) => (
                                <TableCell key={i}>
                                    {day}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((day, i) => 
                            <TableRow 
                                key={i}
                            >
                                {day}
                            </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CalendarBody;