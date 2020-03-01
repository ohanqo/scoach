import {
    axisBottom,
    axisLeft,
    curveCardinal,
    easeQuadInOut,
    line,
    randomUniform,
    range,
    scaleLinear,
    select,
} from "d3";
import React, { useEffect, useRef, useState } from "react";

const Overview: React.FC = () => {
    const [data, setData] = useState([
        { date: new Date(2007, 3, 24), value: 93.24 },
        { date: new Date(2007, 3, 25), value: 95.35 },
        { date: new Date(2007, 3, 26), value: 98.84 },
        { date: new Date(2007, 3, 27), value: 99.92 },
        { date: new Date(2007, 3, 30), value: 99.8 },
        { date: new Date(2007, 4, 1), value: 99.47 },
    ]);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        // const svg = select(svgRef.current);
        // const xScale = scaleLinear()
        //     .domain([0, data.length - 1])
        //     .range([0, 300]);

        // const yScale = scaleLinear()
        //     .domain([0, 150])
        //     .range([150, 0]);

        // const xAxis = axisBottom(xScale)
        //     .ticks(data.length)
        //     .tickFormat(index => (index as any) + 1);
        // svg.select(".x-axis")
        //     .style("transform", "translateY(150px)")
        //     .call(xAxis as any);

        // const yAxis = axisRight(yScale);
        // svg.select(".y-axis")
        //     .style("transform", "translateX(300px)")
        //     .call(yAxis as any);

        // generates the "d" attribute of a path element
        // const myLine = line()
        //     .x((value, index) => value[0])
        //     .y((value, index) => value[1])
        //     .curve(curveCardinal);

        // renders path element, and attaches
        // the "d" attribute from line generator above
        // svg.selectAll(".line")
        //     .data([data])
        //     .join("path")
        //     .attr("class", "line")
        //     .attr("d", myLine as any)
        //     .attr("fill", "none")
        //     .attr("stroke", "#394b97");

        const chartWrapper = document.querySelector("#chart")!;
        const style = getComputedStyle(chartWrapper);
        const chartWidthAndPadding = parseInt(
            style.getPropertyValue("width"),
            10,
        );
        const chartPadding = parseInt(
            style.getPropertyValue("padding-right"),
            10,
        );
        const chartWidth = chartWidthAndPadding - chartPadding * 2;

        var margin = { top: 30, right: 30, bottom: 30, left: 30 },
            width = chartWidth - margin.left - margin.right, // Use the window's width
            height = window.innerHeight / 2 - margin.top - margin.bottom; // Use the window's height

        // The number of datapoints
        var n = 21;

        // 5. X scale will use the index of our data
        var xScale = scaleLinear()
            .domain([0, n - 1]) // input
            .range([0, width]); // output

        // 6. Y scale will use the randomly generate number
        var yScale = scaleLinear()
            .domain([0, 1]) // input
            .range([height, 0]); // output

        // 7. d3's line generator
        var myLine = line()
            .x(function(d, i) {
                return xScale(i);
            }) // set the x values for the line generator
            .y(function(d) {
                return yScale((d as any).y);
            }) // set the y values for the line generator
            .curve(curveCardinal); // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        var dataset = range(n).map(function(d) {
            return { "y": randomUniform(1)() };
        });

        // 1. Add the SVG to the page and employ #2
        var svg = select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")",
            );

        // 3. Call the x axis in a group tag
        svg.append("g")
            .attr("class", "text-gray-600 text-md")
            .attr("transform", "translate(0," + height + ")")
            .call(
                axisBottom(xScale)
                    .tickSize(0)
                    .tickFormat(d => {
                        console.log(d);
                        return (d as any) % 4 === 0 ? (d as any) : null;
                    }),
            )
            .call(g => g.select(".domain").remove());
        // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
            .attr("class", "text-gray-600 text-md")
            .call(axisLeft(yScale).tickSize(width + margin.left + margin.right))
            .call(g => g.select(".domain").remove())
            .call(g =>
                g
                    .selectAll(".tick line")
                    .attr("stroke-opacity", 0.3)
                    .attr("stroke-dasharray", "5, 5")
                    .attr("x2", width + margin.left - margin.right),
            )
            .call(g =>
                g
                    .selectAll(".tick text")
                    .attr("x", 0)
                    .attr("dy", 0),
            ); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator
        const path = svg
            .append("path")
            .datum(dataset) // 10. Binds data to the line
            .attr("fill", "none")
            .attr("stroke", "#394b97")
            .attr("stroke-width", 3)
            .attr("d", myLine as any);
        // .attr("class", "line") // Assign a class for styling

        const pathLength = path.node()?.getTotalLength();

        if (pathLength) {
            path.attr("stroke-dasharray", pathLength + " " + pathLength)
                .attr("stroke-dashoffset", pathLength)
                .transition()
                .duration(3000)
                .ease(easeQuadInOut)
                .attr("stroke-dashoffset", 0);
        }

        // 12. Appends a circle for each datapoint
        svg.selectAll(".dot")
            .data(dataset)
            .enter()
            .append("circle") // Uses the enter().append() method
            .attr("fill", "#496ffb")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .attr("cx", function(d, i) {
                return xScale(i);
            })
            .attr("cy", function(d) {
                return yScale(d.y);
            })
            .attr("r", 5);
    }, [data]);

    return (
        <main className="p-4">
            <div
                id="chart"
                className="rounded bg-secondary-400 px-6 py-4 overflow-hidden sm:w-2/3"
            >
                <h2 className="font-medium text-gray-400 my-2 ml-4">
                    Weight evolution
                </h2>
                <svg ref={svgRef}></svg>
            </div>
        </main>
    );
};

export default Overview;
