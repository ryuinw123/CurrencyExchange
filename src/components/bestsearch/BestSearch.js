import React, { forwardRef, useContext, useEffect, useState } from 'react'
import {  AiOutlineClose } from 'react-icons/ai';
import { MdOutlineExpandMore } from 'react-icons/md'
import data from '../../data/Currency/mock_currency_all.json'
import "./BestSearch.css"
import { ThemeContext } from '../../context';

const BestSearch = forwardRef((props,ref) => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const [filteredData, setFilteredData] = useState(data);
    const [wordEntered, setWordEntered] = useState("");
    const [searchBar,setSearchBar] = useState(false)


    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = props.props.filter((value) => {
            return value.currency.toLowerCase().includes(searchWord.toLowerCase());
        })
        if (searchWord === "") {
            setFilteredData(props.props)
        }
        else {
            setFilteredData(newFilter);
        }
    }

    const searchClick = () => {
        setSearchBar(true)
    }

    const clearInput = () => {
        setFilteredData(props.props);
        setSearchBar(false)
    }

    const setWord =(e,value) => {
        e.preventDefault();
        setWordEntered(value.currency);
        setSearchBar(false)

    }
    return (
        <div className="best-search">
            <div className="best-searchInputs">
                <div className="best-img-wrapper" style = {{background : darkMode && "#424242"}}>
                    <div className="best-search-img">
                    </div>
                </div>
                <input style = {{background : darkMode && "#424242"}} ref={ref} onClick = {searchClick} onChange = {searchClick} type="text" placeholder={"set"} value={wordEntered} onChange={handleFilter} />
                <div className="best-searchIcon" style = {{background : darkMode && "#424242"}}>
                    <div className="best-searchIcon-wrapper"></div>
                    {searchBar == true ?  <AiOutlineClose onClick={clearInput} /> : <MdOutlineExpandMore onClick = {searchClick}/>}
                </div>
            </div>
            {(searchBar == true) && (
                <div className="best-dataResult">
                    {filteredData.map((value, key) => {
                        return <a onClick={(e) => setWord(e,value)} className="best-dataItem">
                            <p>{value.currency}</p>
                        </a>
                    })}
                </div>
            )}
        </div>
    )
})

export default BestSearch