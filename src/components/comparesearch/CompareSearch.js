import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineExpandMore } from 'react-icons/md'
import data from '../../data/Currency/mock_currency_compare.json'
import "./CompareSearch.css"
import * as d3 from 'd3';
import { ThemeContext } from '../../context';

const CompareSearch = forwardRef((props, ref) => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const [filteredData, setFilteredData] = useState(data);
    const [wordEntered, setWordEntered] = useState("");
    const [searchBar, setSearchBar] = useState(false)
    useEffect(() => {
        if (props.props.status) {
            setWordEntered("USD")
        }
    },[])

    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = data.filter((value) => {
            return value.currency.toLowerCase().includes(searchWord.toLowerCase());
        })
        if (searchWord === "") {
            setFilteredData(data)
        }
        else {
            setFilteredData(newFilter);
        }
    }

    const searchClick = () => {
        setSearchBar(true)
    }

    const clearInput = () => {
        setFilteredData(data);
        setSearchBar(false)
    }

    const setWord = (e, value) => {
        e.preventDefault();
        setWordEntered(value.currency);
        setSearchBar(false)
        setTimeout(() => {
            //$(ref.current).trigger("change");
            d3.select(ref.current).dispatch("change")
          }, 0);
    }
    return (
        <div className="compare-search">
            <div className="compare-searchInputs">
                <div className="compare-img-wrapper" style = {{background : darkMode && "#424242"}}>
                    <div className="compare-search-img">
                        
                    </div>
                </div>
                <input style = {{background : darkMode && "#424242" , color : darkMode && "white"}} onClick={searchClick} onChange={searchClick} ref={ref} type="text" placeholder={"set"} value={wordEntered} onChange={handleFilter} />
                <div className="compare-searchIcon" style = {{background : darkMode && "#424242"}}>
                    <div className="compare-searchIcon-wrapper"></div>
                    {searchBar == true ? <AiOutlineClose onClick={clearInput} /> : <MdOutlineExpandMore onClick={searchClick} />}
                </div>
            </div>
            {(searchBar == true) && (
                <div className="compare-dataResult">
                    {filteredData.map((value, key) => {
                        return <a onClick={(e) => {
                            setWord(e, value);
                        }} className="compare-dataItem">
                            <p>{value.currency}</p>
                        </a>
                    })}
                </div>
            )}
        </div>
    )
})

export default CompareSearch