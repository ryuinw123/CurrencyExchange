import React, { forwardRef, useState } from 'react'
import {  AiOutlineClose } from 'react-icons/ai';
import { MdOutlineExpandMore } from 'react-icons/md'
import data from '../../data/Currency/mock_currency.json'
import SCB from "../../data/Bank/SCB.png"
import "./BestSearch.css"

const BestSearch = forwardRef((props,ref) => {
    const [filteredData, setFilteredData] = useState(data);
    const [wordEntered, setWordEntered] = useState("");
    const [searchBar,setSearchBar] = useState(false)

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

    const setWord =(e,value) => {
        e.preventDefault();
        setWordEntered(value.currency);
        setSearchBar(false)

    }
    return (
        <div className="best-search">
            <div className="best-searchInputs">
                <div className="best-img-wrapper">
                    <div className="best-search-img">
                        <img src={SCB} alt="" className="b-img" />
                    </div>
                </div>
                <input ref={ref} onClick = {searchClick} onChange = {searchClick} type="text" placeholder={"set"} value={wordEntered} onChange={handleFilter} />
                <div className="best-searchIcon">
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