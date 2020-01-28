import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import _ from 'lodash';
import './chart.css';

function Chart(props) {

    const canvas = useRef(null);

    useEffect(() => {
         drawBarChart(props);
    });

    const drawBarChart = props => {

        const { chartData, months, daysInMonth } = props;

        const { activeDays } = chartData;

        const activeDaysData = _.countBy(activeDays);

        console.log(activeDays)

        const activeDaysAmount = Object.values(activeDaysData);

        const height = 300;
        const width = 300;

        // Clear previous chart
        canvas.current.innerHTML = "";

        const svg = d3.select(canvas.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
            .domain(d3.extent(activeDaysData, function(d) { return d[0]; }))
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(activeDaysData, function(d) { return +d.value; })])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Set points for each day per activity
        
        // Add the line
        svg.append("path")
            .datum(activeDaysData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )

    }

    return <div className="chart" ref={canvas}></div>
}

export default Chart;