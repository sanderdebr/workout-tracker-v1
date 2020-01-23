import React from 'react';
import './calendar.css';
import * as moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CalendarHead = props => {

    props.allMonths.map(month => {
        props.months.push(
            <TableCell 
                className="month-cell" 
                style={{textAlign: "center"}}
                key={month}
                onClick={e => props.setMonth(month)}
            >
                <span>{month}</span>
            </TableCell>
        )
    });

    let rows = [];
    let cells = [];

    props.months.forEach((row, i) => {
        if (i % 3 !== 0 || i == 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
    });
    rows.push(cells);

    let monthList = rows.map((month, i) => <TableRow>{month}</TableRow>);

    return (
        <TableContainer component={Paper} className="month-selector">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="4">{props.currentMonth()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="4">Select a month</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {monthList}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default CalendarHead;