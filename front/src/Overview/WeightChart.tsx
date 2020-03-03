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
import React, { useEffect, useRef } from "react";
import Report from "../Report/Report";

const WeightChart: React.FC<{ data: Report[] }> = ({ data = [] }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (data.length > 1) {
            if (svgRef.current) {
                svgRef.current.innerHTML = "";
            }

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
                width = chartWidth - margin.left - margin.right,
                height = window.innerHeight / 2 - margin.top - margin.bottom;

            var xScale = scaleTime()
                .domain([
                    (data[0] as any).date,
                    (data[data.length - 1] as any).date,
                ])
                .range([0, width]);

            var yScale = scaleLinear()
                .domain([45, 120])
                .range([height, 0]);

            var myLine = line()
                .x(function(d, i) {
                    return xScale((d as any).date);
                })
                .y(function(d) {
                    return yScale((d as any).weight);
                })
                .curve(curveCardinal);

            var svg = select(svgRef.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr(
                    "transform",
                    "translate(" + margin.left + "," + margin.top + ")",
                );

            svg.append("g")
                .attr("class", "text-gray-600 text-md")
                .attr("transform", "translate(0," + height + ")")
                .call(axisBottom(xScale).tickSize(0))
                .call(g => g.select(".domain").remove());

            svg.append("g")
                .attr("class", "text-gray-600 text-md")
                .call(
                    axisLeft(yScale)
                        .tickSize(width + margin.left + margin.right)
                        .tickFormat(function(
                            domainValue: number | { valueOf(): number },
                            _: number,
                        ): string {
                            if (domainValue === 120) {
                                return `${domainValue} kg`;
                            }
                            return `${domainValue}`;
                        }),
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
                );

            const path = svg
                .append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "#394b97")
                .attr("stroke-width", 3)
                .attr("d", myLine as any);

            const pathLength = path.node()?.getTotalLength();

            if (pathLength) {
                path.attr("stroke-dasharray", pathLength + " " + pathLength)
                    .attr("stroke-dashoffset", pathLength)
                    .transition()
                    .duration(3000)
                    .ease(easeQuadInOut)
                    .attr("stroke-dashoffset", 0);
            }

            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
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
        <div
            id="chart"
            className="rounded bg-secondary-400 px-6 py-4 overflow-hidden w-full sm:w-2/3 mb-4 sm:mb-0 sm:mr-4"
        >
            <h2 className="font-medium text-gray-200 capitalize my-2 ml-4 text-xl">
                Weight evolution
            </h2>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default WeightChart;
