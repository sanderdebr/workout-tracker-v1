import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

function Chart(props) {

    //const { data } = props;
    const data = [ 2, 4, 2, 6, 8 ]
    const canvas = useRef(null);

    useEffect(() => {
         drawBarChart();
    }, []);

    const drawBarChart = data => {
        const canvasHeight = 200;
        const scale = 20;
        const svgCanvas = d3.select(canvas.current)
            .append("svg")
            .attr("width", '100%')
            .attr("height", canvasHeight)
            .style("border", "1px solid black");
    }

    return <div ref={canvas}></div>
}

export default Chart;