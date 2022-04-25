import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import { IoTriangleSharp } from 'react-icons/io5';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import flag from "../../../data/Flag/Sweden.png";
import "./Detailpage.css"
import BankTable from '../../banktable/BankTable';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Detailpage = ({ props }) => {

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://185.78.166.45:8000/currency/detail/${id}/`)
            .then(res => {
                setDetailData(res.data.DETAILS)
                setGraphData(res.data.GRAPH)
                setBankData(res.data.BANK)
                setRender(true)
            }
            )
    }, [])
    const [render, setRender] = useState(false)
    const [graphData, setGraphData] = useState()
    const [bankData, setBankData] = useState()
    const [detailData,setDetailData] = useState()

    const [button1, setButton1] = useState(true)
    const [button2, setButton2] = useState(false)
    const [button3, setButton3] = useState(false)
    const [button4, setButton4] = useState(false)

    const clickButton1 = () => {
        setButton1(true)
        setButton2(false)
        setButton3(false)
        setButton4(false)
        //updateChart(7)
    }

    const clickButton2 = () => {
        setButton1(false)
        setButton2(true)
        setButton3(false)
        setButton4(false)
        //updateChart(14)
    }

    const clickButton3 = () => {
        setButton1(false)
        setButton2(false)
        setButton3(true)
        setButton4(false)
        //updateChart(21)
    }

    const clickButton4 = () => {
        setButton1(false)
        setButton2(false)
        setButton3(false)
        setButton4(true)
        //updateChart(30)
    }



    const svgRef = useRef()
    const button1Ref = useRef()
    const button2Ref = useRef()
    const button3Ref = useRef()
    const button4Ref = useRef()

    
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

    useEffect(() => {
        if (render) {
            var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                width = parseInt(d3.select(svgRef.current).style('width'), 10) - margin.left - margin.right,
                height = parseInt(d3.select(svgRef.current).style('height'), 10) - margin.top - margin.bottom + 12

            // parse the date / time
            var parseTime = d3.timeParse("%d-%b-%y");
            var bisectDate = d3.bisector(function (d) { return d.date; }).left;
            var dateFormatter = d3.timeFormat("%d-%b-%y");
            var formatValue = d3.format(",");

            function sortByDateAscending(a, b) {
                // Dates will be cast to numbers automagically:
                return a.date - b.date;
            }


            // set the ranges
            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);



            // define the line
            var valueline = d3.line()
                .x(function (d) { return x(d.date); })
                .y(function (d) { return y(d.price); });



            var svg = d3.select(svgRef.current).append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background", "#d3d3d3")
                .style("overflow", "visible")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            function make_x_gridlines() {
                return d3.axisBottom(x)
                    .ticks(5)
            }

            // gridlines in y axis function
            function make_y_gridlines() {
                return d3.axisLeft(y)
                    .ticks(5)
            }
            //console.log(graphData)
            var res = graphData.map(function (d, i) {
                return {
                    date: parseTime(d.date),
                    price: +d.price
                }
            });


            res = res.sort(sortByDateAscending)
            var filterdata = res.filter((a) => {
                let date = new Date(a.date)
                let startdate = addDate(new Date(),-1,"months");
                return (date >= startdate)
              })



            // Scale the range of the data
            x.domain(d3.extent(filterdata, function (d) { return d.date; }));
            y.domain([0, d3.max(filterdata, function (d) { return d.price; })]);

            // add the X gridlines
            var x_gridline = svg.append("g")
                .attr("class", "grid")
                .attr("transform", "translate(0," + height + ")")
                .call(make_x_gridlines()
                    .tickSize(-height)
                    .tickFormat("")
                )

            // add the Y gridlines
            var y_gridline = svg.append("g")
                .attr("class", "grid")
                .call(make_y_gridlines()
                    .tickSize(-width)
                    .tickFormat("")
                )
                .call(g => g.append("text")
                    .attr("x", -10)
                    .attr("y", -10)
                    .attr("fill", "currentColor")
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Price"))

            // add the valueline path.
            var line = svg.append("path")
                .data([filterdata])
                .attr("class", "line")
                .attr("d", valueline);

            // add the X Axis
            var x_axis = svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // add the Y Axis
            var y_axis = svg.append("g")
                .call(d3.axisLeft(y));

            //tooltip
            var focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none")

            focus.append("circle")
                .attr("r", 5);

            var board = focus.append("rect")
                .attr("class", "tooltip")
                .attr("width", 100)
                .attr("height", 50)
                .attr("x", 10)
                .attr("y", -22)
                .attr("rx", 4)
                .attr("ry", 4)

            var board_date = focus.append("text")
                .attr("class", "tooltip-date")
                .attr("x", 18)
                .attr("y", -2);

            var board_test_price = focus.append("text")
                .attr("x", 18)
                .attr("y", 18)
                .text("Price:");

            var board_price = focus.append("text")
                .attr("class", "tooltip-likes")
                .attr("x", 60)
                .attr("y", 18);

            var hidden_board = svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function () { focus.style("display", null); })
                .on("mouseout", function () { focus.style("display", "none"); })
                .on("mousemove", mousemove);

            d3.select(button1Ref.current)
                .on("click", function () {
                    filterdata = res.filter((a) => {
                        let date = new Date(a.date)
                        let startdate = addDate(new Date(),-1,"months");
                        return (date >= startdate)
                      })
                    updateChart(filterdata)

                })
            d3.select(button2Ref.current)
                .on("click", function () {
                    filterdata = res.filter((a) => {
                        let date = new Date(a.date)
                        let startdate = addDate(new Date(),-3,"months");
                        return (date >= startdate)
                      })
                    updateChart(filterdata)

                })
            d3.select(button3Ref.current)
                .on("click", function () {
                    filterdata = res.filter((a) => {
                        let date = new Date(a.date)
                        let startdate = addDate(new Date(),-6,"months");
                        return (date >= startdate)
                      })
                    updateChart(filterdata)

                })
            d3.select(button4Ref.current)
                .on("click", function () {
                    filterdata = res.filter((a) => {
                        let date = new Date(a.date)
                        let startdate = addDate(new Date(),-12,"months");
                        return (date >= startdate)
                      })
                    updateChart(filterdata)

                })

            function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(res, x0, 1),
                    d0 = res[i - 1],
                    d1 = res[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                if (d3.mouse(this)[0] > 330) {
                    board.attr("x", -110)
                    board_date.attr("x",-102)
                    board_test_price.attr("x",-102)
                    board_price.attr("x",-60)
                }
                else {
                    board.attr("x", 10)
                    board_date.attr("x",18)
                    board_test_price.attr("x",18)
                    board_price.attr("x",60)
                }
                focus.attr("transform", `translate(${x(d.date)},${y(d.price)})`);
                focus.select(".tooltip-date").text(dateFormatter(d.date));
                focus.select(".tooltip-likes").text(formatValue(d.price));
            }

            function updateChart(filterdata) {
                x.domain(d3.extent(filterdata, function (d) { return d.date; }));
                y.domain([0, d3.max(filterdata, function (d) { return d.price; })]);
                x_gridline.transition().duration(750).call(make_x_gridlines()
                    .tickSize(-height)
                    .tickFormat("")
                )

                y_gridline.transition().duration(750).call(make_y_gridlines()
                    .tickSize(-width)
                    .tickFormat("")
                )

                line.datum(filterdata).transition().duration(750).attr('d', valueline)

                x_axis.transition().duration(750).call(d3.axisBottom(x));

                y_axis.transition().duration(750).call(d3.axisLeft(y));
            }

            function resizeChart() {
                width = parseInt(d3.select(svgRef.current).style('width'), 10) - margin.left - margin.right
                height = parseInt(d3.select(svgRef.current).style('height'), 10) - margin.top - margin.bottom + 12
                svg.attr("width", width).attr("hight", height)
                x = d3.scaleTime().range([0, width]);
                y = d3.scaleLinear().range([height, 0]);
                hidden_board.attr("width", width).attr("height", height)
                updateChart(filterdata)

            }

            window.addEventListener('resize', resizeChart)
        }




    }, [render])





    function Generaterightwrapper() {
        if (props.status === "up")
            return <div className="detail-right-wrapper" style={{ color: "#00FF00" }}>
                <div className="detail-upper-wrapper">
                    <div className="detail-icon-wrapper" style={{ transform: "translate(0px,4px)" }}>
                        <IoTriangleSharp />
                    </div>
                    <h1>
                        {props.price}฿
                    </h1>
                </div>
                <div className="detail-down-wrapper">
                    <p>+{props.change}(+{props.percentage})</p>
                </div>
            </div>
        if (props.status === "down")
            return <div className="detail-right-wrapper" style={{ color: "#FF0000" }}>
                <div className="detail-upper-wrapper">
                    <div className="detail-icon-wrapper" style={{ transform: "rotate(180deg) translate(0px,5px)" }}>
                        <IoTriangleSharp />
                    </div>
                    <h1>
                        {props.price}฿
                    </h1>
                </div>
                <div className="detail-down-wrapper">
                    <p>-{props.change}(+{props.percentage})</p>
                </div>
            </div>
        if (props.status === "equal")
            return <div className="detail-right-wrapper" style={{ color: "#F1F100" }}>
                <div className="detail-upper-wrapper">
                    <div className="detail-icon-wrapper" style={{ transform: "rotate(180deg) translate(0px,5px)" }}>
                        <VscTriangleLeft />
                        <VscTriangleRight />
                    </div>
                    <h1>
                        {props.price}฿
                    </h1>
                </div>
                <div className="detail-down-wrapper">
                    <p>+{props.change}(+{props.percentage})</p>
                </div>
            </div>
    }

    return (
        <>
            <div className="detail-image-wrapper">
                <div className="detail-box">
                    <div>
                        <h1>
                            United States of America
                        </h1>
                    </div>
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
            </div>
            <div className="box-wrapper">
                <div className="top-currency-wrapper">
                    <div className="detail-left-wrapper">
                        <div className="detail-img-wrapper">
                            <img src={flag} alt="No flag found" />
                        </div>
                        <div className="detail-currency-wrapper">
                            <h1>{props.currency}</h1>
                            <p>{props.description}</p>
                        </div>
                    </div>
                    <Generaterightwrapper />
                </div>
                <div className="price-box">
                    <div className="detail-open">
                        <div className="detail-inside">
                            <h3>
                                Open
                            </h3>
                            <p>
                                32.00
                            </p>
                        </div>
                        <div className="border-detail-pricebox"></div>
                    </div>
                    <div className="detail-high">
                        <div className="detail-inside">
                            <h3>
                                High
                            </h3>
                            <p>
                                32.00
                            </p>
                        </div>
                        <div className="border-detail-pricebox"></div>
                    </div>
                    <div className="detail-low">
                        <div className="detail-inside">
                            <h3>
                                Low
                            </h3>
                            <p>
                                32.00
                            </p>
                        </div>
                    </div>
                </div>
                <div className="graph-box">
                    {render ? <div className="detail-graph-wrapper"><svg ref={svgRef} id="graph"></svg></div> : <h1>Graph Loading</h1>}
                    <div className="detail-button-wrapper">
                        <div ref={button1Ref} onClick={clickButton1} style={{ background: button1 ? "#0073CF" : "white", color: button1 ? "white" : "black", border: button1 ? "none" : "solid 1px" }} className="detail-button">1M</div>
                        <div ref={button2Ref} onClick={clickButton2} style={{ background: button2 ? "#0073CF" : "white", color: button2 ? "white" : "black", border: button2 ? "none" : "solid 1px" }} className="detail-button">3M</div>
                        <div ref={button3Ref} onClick={clickButton3} style={{ background: button3 ? "#0073CF" : "white", color: button3 ? "white" : "black", border: button3 ? "none" : "solid 1px" }} className="detail-button">6M</div>
                        <div ref={button4Ref} onClick={clickButton4} style={{ background: button4 ? "#0073CF" : "white", color: button4 ? "white" : "black", border: button4 ? "none" : "solid 1px" }} className="detail-button">1Y</div>
                    </div>
                </div>
                {render ? <BankTable props = {bankData}/> : <h1>Table Loading</h1>}
            </div>
        </>
    )
}

export default Detailpage