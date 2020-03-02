import {
    axisBottom,
    axisLeft,
    curveCardinal,
    easeQuadInOut,
    line,
    scaleLinear,
    scaleTime,
    select,
} from "d3";
import React, { useEffect, useRef, useState } from "react";
import { AUTH_HTTP, httpWrapper } from "../shared/http";

const Overview: React.FC = () => {
    const [data, setData] = useState([]);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        httpWrapper(async () => {
            const response = await AUTH_HTTP.get("/reports");
            response.data.forEach(
                (d: any) => (d.date = new Date(d.date * 1000)),
            );
            setData(response.data);
        });
    }, []);

    useEffect(() => {
        if (data.length > 1) {
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

            // 5. X scale will use the index of our data;
            var xScale = scaleTime()
                .domain([
                    (data[0] as any).date,
                    (data[data.length - 1] as any).date,
                ]) // input
                .range([0, width]); // output

            // 6. Y scale will use the randomly generate number
            var yScale = scaleLinear()
                .domain([45, 120]) // input
                .range([height, 0]); // output

            // 7. d3's line generator
            var myLine = line()
                .x(function(d, i) {
                    console.log((d as any).date);
                    return xScale((d as any).date);
                }) // set the x values for the line generator
                .y(function(d) {
                    console.log((d as any).weight);
                    return yScale((d as any).weight);
                }) // set the y values for the line generator
                .curve(curveCardinal); // apply smoothing to the line

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
                .call(axisBottom(xScale).tickSize(0))
                .call(g => g.select(".domain").remove());
            // Create an axis component with d3.axisBottom

            // 4. Call the y axis in a group tag
            svg.append("g")
                .attr("class", "text-gray-600 text-md")
                .call(
                    axisLeft(yScale).tickSize(
                        width + margin.left + margin.right,
                    ),
                )
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
                .datum(data) // 10. Binds data to the line
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
                .data(data)
                .enter()
                .append("circle") // Uses the enter().append() method
                .attr("fill", "#496ffb")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1)
                .attr("cx", function(d, i) {
                    return xScale((d as any).date);
                })
                .attr("cy", function(d) {
                    return yScale((d as any).weight);
                })
                .attr("r", 5);
        }
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
