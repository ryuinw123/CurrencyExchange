import React, { useContext, useState } from 'react'
import {AiOutlineSearch , AiOutlineClose}  from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context';
import "./Searchbar.css"

const Searchbar = ({placeholder , data}) => {
   const [filteredData,setFilteredData] = useState([]);
   const [wordEntered , setWordEntered] = useState("");
   const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode
   const handleFilter = (event) => {
       const searchWord = event.target.value
       setWordEntered(searchWord)
       const newFilter = data.filter((value) => {
           return value.currency.toLowerCase().includes(searchWord.toLowerCase());
       })
       if (searchWord === "") {
           setFilteredData([])
       }
       else {
           setFilteredData(newFilter);
       }
   }

   const clearInput = () => {
       setFilteredData([]);
       setWordEntered("");
   }
   return (
    <div className = "search">
        <div className = "searchInputs">
            <input type = "text" placeholder = {placeholder} value = {wordEntered} onChange = {handleFilter} style = {{background : darkMode && "#424242" , color : darkMode && "white" }}/>
            <div className = "searchIcon" style = {{background : darkMode && "#424242"}}>
                {wordEntered.length === 0 ? <AiOutlineSearch /> : <AiOutlineClose id = "clearBtn" onClick = {clearInput}/>}
            </div>
        </div>
        {filteredData.length !== 0 && (
        <div className = "dataResult">
            {filteredData.map((value,key) => {
                return <Link to = {`/currency/detail/${value.currency}`} onClick={clearInput} className = "dataItem">
                    <p>{value.currency}</p>
                    </Link>
            })}
        </div>
        )}
    </div>
  )
}

export default Searchbar