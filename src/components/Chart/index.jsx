import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import _ from 'lodash';

function Chart(props) {

    const canvas = useRef(null);

    useEffect(() => {
         drawBarChart(props);
    });

    const drawBarChart = props => {

        const { chartData, months, daysInMonth } = props;

        const { activeDays } = chartData;

        const activeDaysAmount = Object.values(_.countBy(activeDays));

        const height = 200;
        const width = '100%';

        // Clear previous chart
        canvas.current.innerHTML = "";

        // Append SVG 
        const svg = d3.select(canvas.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create scale
        let scale = d3.scaleLinear()
            .domain([0, daysInMonth])
            .range([0, canvas.current.offsetWidth - 100]);

        // Add scales to axis
        const x_axis = d3.axisBottom()
            .scale(scale);

        svg.append("g")
           .attr("transform", "translate(35, 120)")
           .call(x_axis);

        // Set y axis min = 0 and max = maximum day activities

        scale = d3.scaleLinear()
                    .domain([d3.min(activeDaysAmount), d3.max(activeDaysAmount)])
                    .range([height/2, 0]);

        const y_axis = d3.axisLeft()
                    .scale(scale);

        svg.append("g")
           .attr("transform", "translate(30, 10)")
           .call(y_axis);


        // Set points for each day per activity
    }

    return <div ref={canvas}></div>
}

export default Chart;