import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiBarChartAlt2 } from 'react-icons/bi'
import CompareSearch from '../../comparesearch/CompareSearch'
import * as d3 from 'd3';
import './Compare.css';
import axios from "axios";
import background from "../../../data/Background/currency.jpg"
import { ThemeContext } from '../../../context';

const Compare = () => {
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode
  const svgRef = useRef()
  const [dataLoad, setDataLoad] = useState(false)
  const [data, setData] = useState()
  const [chart, setChart] = useState()
  const [update, setUpdate] = useState()
  const [dataMa, setDataMa] = useState()
  const [dataMb, setDataMb] = useState()
  const [dataMc, setDataMc] = useState()
  const [dataMd, setDataMd] = useState()
  const [dataMe, setDataMe] = useState()
  const [startDate,setStartDate] = useState(1)
  useEffect(() => {
    axios.post(`http://185.78.166.45:8000/compare/`, {
      category: "A",
      currency: "USD"
    })
      .then(res => {
        setData(res.data)
        setDataMa(res.data)
        setDataLoad(true)
      }
      )

  }, [])
  useEffect(() => {
    if (dataLoad) {
      setChart(drawChart())
    }

  }, [dataLoad])
  useEffect(() => {
    try {
      if (update) {
        //console.log("data from useEffect = ",data)
        chart.updateChart(data,startDate)
      }
    }
    catch (err) {
      //console.log("first")
    }
    setUpdate(false)
  }, [update])
  useEffect(() => {
    let mockdata = dataMa
    if (dataMb) {
      mockdata = mockdata.concat(dataMb)
    }
    if (dataMc) {
      mockdata = mockdata.concat(dataMc)
    }
    if (dataMd) {
      mockdata = mockdata.concat(dataMd)
    }
    if (dataMe) {
      mockdata = mockdata.concat(dataMe)
    }
    setData(mockdata)
    setUpdate(true)
  }, [dataMa, dataMb, dataMc, dataMd, dataMe])
  function drawChart() {
    var glines
    var mouseG
    var tooltip

    var parseDate = d3.timeParse("%d-%b-%y")
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = parseInt(d3.select(svgRef.current).style('width'), 10) - margin.left - margin.right,
      height = parseInt(d3.select(svgRef.current).style('height'), 10) - margin.top - margin.bottom + 12

    var lineOpacity = 1
    var lineStroke = "2px"

    var axisPad = 6 // axis formatting

    var category = ["Category A", "Category B", "Category C", "Category D", "Category E"]
    // since Category B and E are really close to each other, assign them diverging colors
    var color = d3.scaleOrdinal()
      .domain(category)
      .range(["#E53935", "#8E24AA", "#1E88E5", "#43A047", "#FFB300"])

    var res = data.map((d, i) => {
      return {
        date: parseDate(d.date),
        currency_class: d.currency_class,
        price: +d.price
      }
    })
    function sortByDateAscending(a, b) {
      // Dates will be cast to numbers automagically:
      return a.date - b.date;
    }

    res.sort(sortByDateAscending)

    //console.log(res)
    var xScale = d3.scaleTime()
      .domain(d3.extent(res, d => d.date))
      .range([0, width])

    function roundToNearest1K(x) {
      return Math.round(x / 10000) * 10000
    }

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(res, d => d.price)])
      .range([height, 0]);

    var svg = d3.select(svgRef.current).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("overflow", "visible")
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // CREATE AXES // 
    // render axis first before lines so that lines will overlay the horizontal ticks
    var xAxis = d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)).tickSizeOuter(axisPad * 2).tickSizeInner(axisPad * 2)
    var yAxis = d3.axisLeft(yScale).ticks(10, "s").tickSize(-width) //horizontal ticks across svg width

    var xAxisLine = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .call(g => {
        var years = xScale.ticks(d3.timeMonth.every(1))
        var xshift = (width / (years.length)) / 2
        g.selectAll("text").attr("transform", `translate(${xshift}, 0)`) //shift tick labels to middle of interval
          .style("text-anchor", "middle")
          .attr("y", axisPad)
          .attr('fill', '#A9A9A9')

        g.selectAll("line")
          .attr('stroke', '#A9A9A9')

        g.select(".domain")
          .attr('stroke', '#A9A9A9')

      })

    var yAxisLine = svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .call(g => {
        g.selectAll("text")
          .style("text-anchor", "middle")
          .attr("x", -axisPad * 2)
          .attr('fill', '#A9A9A9')

        g.selectAll("line")
          .attr('stroke', '#A9A9A9')
          .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
          .attr('opacity', 0.3)

        g.select(".domain").remove()

      })
    var ytext = svg.append('text')
      .attr('x', 50)
      .attr("y", 0)
      .attr("fill", "#A9A9A9")
      .text("Bath")



    // line generator 
    var line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.price))


      var res_nested = d3.nest() // necessary to nest data so that keys represent each vehicle category
      .key(d => d.currency_class)
      .entries(res)
    // console.log(res_nested)
    //console.log(res_nested)

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
    //.attr("cy", d => yScale(d.price))
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

    var hiddenBlock = mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
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
            return "translate(" + xScale(d.values[idx].date) + "," + yScale(d.values[idx].price) + ")";

          });

        updateTooltipContent(mouse, res_nested)

      }) // inital chart render (set default to Bidding Exercise 1 data)


    function updateChart(data,setDate) {
      
      var mdata = data.filter((a) => {
        let date = new Date(a.date)
        let startdate = addDate(new Date(),-setDate,"months");
        return (date >= startdate)
      })

      res = mdata.map((d, i) => {
        return {
          date: parseDate(d.date),
          currency_class: d.currency_class,
          price: +d.price
        }
      })

      //console.log(res)
      function sortByDateAscending(a, b) {
        // Dates will be cast to numbers automagically:
        return a.date - b.date;
      }

      res.sort(sortByDateAscending)

      xScale.domain(d3.extent(res,d => d.date))
      yScale.domain([0,d3.max(res,d => d.price)])
      xAxis = d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)).tickSizeOuter(axisPad * 2).tickSizeInner(axisPad * 2)
      yAxis = d3.axisLeft(yScale).ticks(10, "s").tickSize(-width) //horizontal ticks across svg width


      
      xAxisLine.transition().duration(750)
      .call(xAxis)
      .call(g => {
        var years = xScale.ticks(d3.timeMonth.every(1))
        var xshift = (width / (years.length)) / 2
        g.selectAll("text").attr("transform", `translate(${xshift}, 0)`) //shift tick labels to middle of interval
          .style("text-anchor", "middle")
          .attr("y", axisPad)
          .attr('fill', '#A9A9A9')

        g.selectAll("line")
          .attr('stroke', '#A9A9A9')

        g.select(".domain")
          .attr('stroke', '#A9A9A9')

      })

      yAxisLine.transition().duration(750)
      .call(yAxis)
      .call(g => {
        g.selectAll("text")
          .style("text-anchor", "middle")
          .attr("x", -axisPad * 2)
          .attr('fill', '#A9A9A9')

        g.selectAll("line")
          .attr('stroke', '#A9A9A9')
          .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
          .attr('opacity', 0.3)

        g.select(".domain").remove()
      })

      var res_nested = d3.nest()
        .key(d => d.currency_class)
        .entries(res)
      //console.log(res_nested)
      d3.select(svgRef.current).selectAll(".lines").remove()

      var lines = svg.append('g')
        .attr('class', 'lines')

      glines = lines.selectAll('.line-group')
        .data(res_nested).enter()
        .append('g')
        .attr('class', 'line-group')
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


      mouseG.selectAll('.mouse-per-line')
        .data(res_nested)

      mouseG.on('mousemove', function () {
        var mouse = d3.mouse(this)
        updateTooltipContent(mouse, res_nested)
      })
    }

    function resizeChart() {
      width = parseInt(d3.select(svgRef.current).style('width'), 10) - margin.left - margin.right
      hiddenBlock.attr("width",width)
      svg.attr("width", width)
      xScale = d3.scaleTime().range([0,width])
      setUpdate(true)
    }


    function updateTooltipContent(mouse, res_nested) {

      var sortingObj = []
      res_nested.map(d => {
        var xDate = xScale.invert(mouse[0])
        var bisect = d3.bisector(function (d) { return d.date; }).left
        var idx = bisect(d.values, xDate)
        sortingObj.push({ key: d.values[idx].currency_class, price: d.values[idx].price, year: d.values[idx].date.getFullYear(), month: monthNames[d.values[idx].date.getMonth()], date: d.values[idx].date })
      })

      sortingObj.sort(function (x, y) {
        return d3.descending(x.price, y.price);
      })

      var sortingArr = sortingObj.map(d => d.key)

      var res_nested1 = res_nested.slice().sort(function (a, b) {
        return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key) // rank vehicle category based on price of premium
      })
      tooltip.html(sortingObj[0].month + "-" + sortingObj[0].year)
        .style('display', 'block')
        .style('left', `${mouse[0] + 80}px`)
        .style('top', `${mouse[1] + 30}px`)
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
          //console.log(d.key.substring(0, 3) + " " + d.key.slice(-1) + ": $" + d.values[idx].premium.toString())
          return d.key.substring(0, 3) + " " + d.key.slice(-1) + ": $" + d.values[idx].price.toString()
        })
    }

    var event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });


    d3.select(input1.current)
      .on("change", function () {
          axios.post(`http://185.78.166.45:8000/compare/`, {
            category: "A",
            currency: input1.current.value
          })
            .then(res => {
              setDataMa(res.data)
            })
      })
    d3.select(input2.current)
      .on("change", function () {
          axios.post(`http://185.78.166.45:8000/compare/`, {
            category: "B",
            currency: input2.current.value
          })
            .then(res => {
              setDataMb(res.data)
            })
      })
    d3.select(input3.current)
      .on("change", function () {
          axios.post(`http://185.78.166.45:8000/compare/`, {
            category: "C",
            currency: input3.current.value
          })
            .then(res => {
              setDataMc(res.data)
            })
      })
    d3.select(input4.current)
      .on("change", function () {
          axios.post(`http://185.78.166.45:8000/compare/`, {
            category: "D",
            currency: input4.current.value
          })
            .then(res => {
              setDataMd(res.data)
            })
      })
    d3.select(input5.current)
      .on("change", function () {
          axios.post(`http://185.78.166.45:8000/compare/`, {
            category: "E",
            currency: input5.current.value
          })
            .then(res => {
              setDataMe(res.data)
            })
      })
    window.addEventListener('resize', resizeChart)
    return { updateChart }
  }


  function addDate(dt, amount, dateType) {
    switch (dateType) {
      case 'days':
        return dt.setDate(dt.getDate() + amount) && dt;
      case 'weeks':
        return dt.setDate(dt.getDate() + (7 * amount)) && dt;
      case 'months':
        return dt.setMonth(dt.getMonth() + amount) && dt;
      case 'years':
        return dt.setFullYear( dt.getFullYear() + amount) && dt;
    }
  }





  const [button1, setButton1] = useState(false)
  const [button2, setButton2] = useState(false)
  const [button3, setButton3] = useState(false)
  const [button4, setButton4] = useState(true)

  const clickButton1 = () => {
    setStartDate(1)
    setButton1(true)
    setButton2(false)
    setButton3(false)
    setButton4(false)
    setUpdate(true)
  }

  const clickButton2 = () => {
    setStartDate(3)
    setButton1(false)
    setButton2(true)
    setButton3(false)
    setButton4(false)
    setUpdate(true)
  }

  const clickButton3 = () => {
    setStartDate(6)
    setButton1(false)
    setButton2(false)
    setButton3(true)
    setButton4(false)
    setUpdate(true)
  }

  const clickButton4 = () => {
    setStartDate(12)
    setButton1(false)
    setButton2(false)
    setButton3(false)
    setButton4(true)
    setUpdate(true)
  }



  const button1Ref = useRef()
  const button2Ref = useRef()
  const button3Ref = useRef()
  const button4Ref = useRef()
  const input1 = useRef()
  const input2 = useRef()
  const input3 = useRef()
  const input4 = useRef()
  const input5 = useRef()
  return (
    <>
      <div className="compare-image-wrapper" style = {{backgroundImage : darkMode && `linear-gradient(180deg, rgba(18, 18, 18, 0) 33.82%, #121212 83%), url(${background})`}}>
        <div className="compare-box" style = {{background : darkMode && "rgba(33, 33, 33, 0.75)"}}>
          <div className="compare-text">
            <div className="icon-wrapper"><BiBarChartAlt2 /></div>
            <h1>
              Compare<br />
            </h1>
          </div>
          <p>Compare currencies.</p>
          <div className="top-left"></div>
          <div className="top-right"></div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
        </div>
      </div>
      <div className="compare-body">
        <div className="compare-currency" style = {{background : darkMode && "#424242"}}>
          <div className="currency-color-wrapper">
            <div className="currency-color">
              <div className="circle-color" style={{ background: "#E53935" }}></div>
              <p>Currency No.1</p>
            </div>
            <CompareSearch ref={input1} props={{ status: true }} />
          </div>
          <div className="currency-color-wrapper">
            <div className="currency-color">
              <div className="circle-color" style={{ background: "#8E24AA" }}></div>
              <p>Currency No.2</p>
            </div>
            <CompareSearch ref={input2} props={{ status: false }} />
          </div>
          <div className="currency-color-wrapper">
            <div className="currency-color">
              <div className="circle-color" style={{ background: "#1E88E5" }}></div>
              <p>Currency No.3</p>
            </div>
            <CompareSearch ref={input3} props={{ status: false }} />
          </div>
          <div className="currency-color-wrapper">
            <div className="currency-color">
              <div className="circle-color" style={{ background: "#43A047" }}></div>
              <p>Currency No.4</p>
            </div>
            <CompareSearch ref={input4} props={{ status: false }} />
          </div>
          <div className="currency-color-wrapper">
            <div className="currency-color">
              <div className="circle-color" style={{ background: "#FFB300" }}></div>
              <p>Currency No.5</p>
            </div>
            <CompareSearch ref={input5} props={{ status: false }} />
          </div>
        </div>
        <div className="compare-graph">
          <div className="compare-graph-wrapper" style = {{background : darkMode && "#424242"}}><div id="multi-graph" ref={svgRef} div/></div>
          <div className="compare-button-wrapper" style = {{background : darkMode && "#424242"}}>
            <div ref={button1Ref} onClick={clickButton1} style={{ background: button1 ? "#0073CF" : "white", color: button1 ? "white" : "black", border: button1 ? "none" : "solid 1px" }} className="compare-button">1M</div>
            <div ref={button2Ref} onClick={clickButton2} style={{ background: button2 ? "#0073CF" : "white", color: button2 ? "white" : "black", border: button2 ? "none" : "solid 1px" }} className="compare-button">3M</div>
            <div ref={button3Ref} onClick={clickButton3} style={{ background: button3 ? "#0073CF" : "white", color: button3 ? "white" : "black", border: button3 ? "none" : "solid 1px" }} className="compare-button">6M</div>
            <div ref={button4Ref} onClick={clickButton4} style={{ background: button4 ? "#0073CF" : "white", color: button4 ? "white" : "black", border: button4 ? "none" : "solid 1px" }} className="compare-button">1Y</div>
          </div>
        </div>
      </div>
      <div className="expand"></div>
    </>
  )
}

export default Compare