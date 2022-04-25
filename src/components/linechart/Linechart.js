import React, { useEffect, useRef } from 'react'
import data from "./mocklinedata.json"
import "./Linechart.css"
import * as d3 from 'd3';

const Linechart = (props) => {
    /*const { data, width, height } = props;*/
    const svgRef = useRef()
    useEffect(() => {
        drawChart();
    }, [data])
    function drawChart() {
        var glines
        var mouseG
        var tooltip

        var parseDate = d3.timeParse("%Y-%m")
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

        var margin = { top: 80, right: 200, bottom: 40, left: 80 }
        var width = 1400 - margin.left - margin.right
        var height = 500 - margin.top - margin.bottom

        var lineOpacity = 1
        var lineStroke = "2px"

        var axisPad = 6 // axis formatting
        var R = 6 //legend marker

        var category = ["Category A", "Category B", "Category C", "Category D", "Category E"]
        // since Category B and E are really close to each other, assign them diverging colors
        var color = d3.scaleOrdinal()
            .domain(category)
            .range(["#2D4057", "#7C8DA4", "#B7433D", "#2E7576", "#EE811D"])
        
        var res = data.map((d, i) => {
            return {
                date: parseDate(d.month),
                bidding_no: +d.bidding_no,
                vehicle_class: d.vehicle_class,
                premium: +d.premium
            }
        })

        var xScale = d3.scaleTime()
          .domain(d3.extent(res, d=>d.date))
          .range([0, width])

        function roundToNearest10K(x) {
          return Math.round(x / 10000) * 10000
        }

        var yScale = d3.scaleLinear()
          .domain([0, roundToNearest10K(d3.max(res, d => d.premium))])
          .range([height, 0]);

        var svg = d3.select(svgRef.current).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // CREATE AXES // 
        // render axis first before lines so that lines will overlay the horizontal ticks
        var xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(1)).tickSizeOuter(axisPad*2).tickSizeInner(axisPad*2)
        var yAxis = d3.axisLeft(yScale).ticks(10, "s").tickSize(-width) //horizontal ticks across svg width

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
          .call(g => {
            var years = xScale.ticks(d3.timeYear.every(1))
            var xshift = (width/(years.length))/2 
            g.selectAll("text").attr("transform", `translate(${xshift}, 0)`) //shift tick labels to middle of interval
              .style("text-anchor", "middle")
              .attr("y", axisPad)
              .attr('fill', '#A9A9A9')

            g.selectAll("line")
              .attr('stroke', '#A9A9A9')
  
            g.select(".domain")
              .attr('stroke', '#A9A9A9')

          })

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .call(g => {
            g.selectAll("text")
            .style("text-anchor", "middle")
            .attr("x", -axisPad*2)
            .attr('fill', '#A9A9A9')

            g.selectAll("line")
              .attr('stroke', '#A9A9A9')
              .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
              .attr('opacity', 0.3)

            g.select(".domain").remove()

           })
          .append('text')
            .attr('x', 50)
            .attr("y", -10)
            .attr("fill", "#A9A9A9")
            .text("Singapore Dollars")


        // CREATE LEGEND // 
        var svgLegend = svg.append('g')
            .attr('class', 'gLegend')
            .attr("transform", "translate(" + (width + 20) + "," + 0 + ")")

        var legend = svgLegend.selectAll('.legend')
          .data(category)
          .enter().append('g')
            .attr("class", "legend")
            .attr("transform", function (d, i) {return "translate(0," + i * 20 + ")"})

        legend.append("circle")
            .attr("class", "legend-node")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", R)
            .style("fill", d=>color(d))

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", R*2)
            .attr("y", R/2)
            .style("fill", "#A9A9A9")
            .style("font-size", 12)
            .text(d=>d)

        // line generator 
        var line = d3.line()
          .x(d => xScale(d.date))
          .y(d => yScale(d.premium))

        renderChart(1) // inital chart render (set default to Bidding Exercise 1 data)

        // Update chart when radio button is selected
       /* d3.selectAll(("input[name='bidding_no']")).on('change', function(){
          updateChart(this.value)
        })

        function updateChart(bidding_no) {

          var resNew = res.filter(d=>d.bidding_no == parseInt(bidding_no))

          var res_nested = d3.nest()
            .key(d=>d.vehicle_class)
            .entries(resNew)

          glines.select('.line') //select line path within line-group (which represents a vehicle category), then bind new data 
            .data(res_nested)
            .transition().duration(750)
            .attr('d', function(d) {
              return line(d.values)
            })

          mouseG.selectAll('.mouse-per-line')
            .data(res_nested)

          mouseG.on('mousemove', function () { 
              var mouse = d3.mouse(this)
              updateTooltipContent(mouse, res_nested)
            })
        }*/

        function renderChart(bidding_no) {

          var resNew = res.filter(d=>d.bidding_no == parseInt(bidding_no))

          var res_nested = d3.nest() // necessary to nest data so that keys represent each vehicle category
            .key(d=>d.vehicle_class)
            .entries(resNew)
          console.log(res_nested)
          console.log(resNew)

          // APPEND MULTIPLE LINES //
          var lines = svg.append('g')
            .attr('class', 'lines')

          glines = lines.selectAll('.line-group')
            .data(res_nested).enter()
            .append('g')
            .attr('class', 'line-group')

          glines  
            .append('path')
              .attr('class', 'line')  
              .attr('d', d => line(d.values))
              .style('stroke', (d, i) => color(i))
              .style('fill', 'none')
              .style('opacity', lineOpacity)
              .style('stroke-width', lineStroke)
          
          // APPEND CIRCLE MARKERS //
          var gcircle = lines.selectAll("circle-group")
            .data(res_nested).enter()
            .append("g")
            .attr('class', 'circle-group')

          //gcircle.selectAll("circle")
            //.data(d => d.values).enter()
            //.append("g")
            //.attr("class", "circle")  
            //.append("circle")
            //.attr("cx", d => xScale(d.date))
            //.attr("cy", d => yScale(d.premium))
            //.attr("r", 2)
          
          // CREATE HOVER TOOLTIP WITH VERTICAL LINE //
          tooltip = d3.select(svgRef.current).append("div")
            .attr('id', 'tooltip')
            .style('position', 'absolute')
            .style("background-color", "#D3D3D3")
            .style('padding', 6)
            .style('display', 'none')

          mouseG = svg.append("g")
           // .attr("class", "mouse-over-effects");

          mouseG.append("path") // create vertical line to follow mouse
            .attr("class", "mouse-line")
            .style("stroke", "#A9A9A9")
            .style("stroke-width", lineStroke)
            .style("opacity", "0");

          var lines = document.getElementsByClassName('line');

          var mousePerLine = mouseG.selectAll('.mouse-per-line')
            .data(res_nested)
            .enter()
            .append("g")
            .attr("class", "mouse-per-line");

          mousePerLine.append("circle")
            .attr("r", 4)
            .style("stroke", function (d) {
              return color(d.key)
            })
            .style("fill", "none")
            .style("stroke-width", lineStroke)
            .style("opacity", "0");

          mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
            .attr('width', width) 
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseout', function () { // on mouse out hide line, circles and text
              d3.select(".mouse-line")
                .style("opacity", "0");
              d3.selectAll(".mouse-per-line circle")
                .style("opacity", "0");
              d3.selectAll(".mouse-per-line text")
                .style("opacity", "0");
              d3.selectAll("#tooltip")
                .style('display', 'none')

            })
            .on('mouseover', function () { // on mouse in show line, circles and text
              d3.select(".mouse-line")
                .style("opacity", "1");
              d3.selectAll(".mouse-per-line circle")
                .style("opacity", "1");
              d3.selectAll("#tooltip")
                .style('display', 'block')
            })
            .on('mousemove', function () { // update tooltip content, line, circles and text when mouse moves
              var mouse = d3.mouse(this)

              d3.selectAll(".mouse-per-line")
                .attr("transform", function (d, i) {
                  var xDate = xScale.invert(mouse[0]) // use 'invert' to get date corresponding to distance from mouse position relative to svg
                  var bisect = d3.bisector(function (d) { return d.date; }).left // retrieve row index of date on parsed csv
                  var idx = bisect(d.values, xDate);

                  d3.select(".mouse-line")
                    .attr("d", function () {
                      var data = "M" + xScale(d.values[idx].date) + "," + (height);
                      data += " " + xScale(d.values[idx].date) + "," + 0;
                      return data;
                    });
                  return "translate(" + xScale(d.values[idx].date) + "," + yScale(d.values[idx].premium) + ")";

                });

              updateTooltipContent(mouse, res_nested)

            })

          }

      function updateTooltipContent(mouse, res_nested) {

        var sortingObj = []
        res_nested.map(d => {
          var xDate = xScale.invert(mouse[0])
          var bisect = d3.bisector(function (d) { return d.date; }).left
          var idx = bisect(d.values, xDate)
          sortingObj.push({key: d.values[idx].vehicle_class, premium: d.values[idx].premium, bidding_no: d.values[idx].bidding_no, year: d.values[idx].date.getFullYear(), month: monthNames[d.values[idx].date.getMonth()]})
        })

        sortingObj.sort(function(x, y){
           return d3.descending(x.premium, y.premium);
        })

        var sortingArr = sortingObj.map(d=> d.key)

        var res_nested1 = res_nested.slice().sort(function(a, b){
          return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key) // rank vehicle category based on price of premium
        })

        tooltip.html(sortingObj[0].month + "-" + sortingObj[0].year + " (Bidding No:" + sortingObj[0].bidding_no + ')')
          .style('display', 'block')
          .style('left', `${d3.event.pageX-600}px`)
          .style('top', `${d3.event.pageY -1500}px`)
          .style('font-size', 11.5)
          .selectAll()
          .data(res_nested1).enter() // for each vehicle category, list out name and price of premium
          .append('div')
          .style('color', d => {
            return color(d.key)
          })
          .style('font-size', 10)
          .html(d => {
            var xDate = xScale.invert(mouse[0])
            var bisect = d3.bisector(function (d) { return d.date; }).left
            var idx = bisect(d.values, xDate)
            console.log(d3.event.pageX)
            console.log(d3.event.pageY)
            console.log(d.key.substring(0, 3) + " " + d.key.slice(-1) + ": $" + d.values[idx].premium.toString())
            return d.key.substring(0, 3) + " " + d.key.slice(-1) + ": $" + d.values[idx].premium.toString()
          })
      }

        //console.log((data))
    }
    return (
        <div className="linechart-wrapper"><div ref={svgRef} className = "linechart">Linechart</div></div>
    )
}

export default Linechart