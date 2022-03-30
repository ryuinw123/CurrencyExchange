import React, { useState } from 'react'
import {AiOutlineSearch , AiOutlineClose}  from 'react-icons/ai';
import "./Searchbar.css"

const Searchbar = ({placeholder , data}) => {
   const [filteredData,setFilteredData] = useState([]);
   const [wordEntered , setWordEntered] = useState("");
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
            <input type = "text" placeholder = {placeholder} value = {wordEntered} onChange = {handleFilter}/>
            <div className = "searchIcon">
                {wordEntered.length === 0 ? <AiOutlineSearch /> : <AiOutlineClose id = "clearBtn" onClick = {clearInput}/>}
            </div>
        </div>
        {filteredData.length !== 0 && (
        <div className = "dataResult">
            {filteredData.map((value,key) => {
                return <a className = "dataItem">
                    <p>{value.currency}</p>
                    </a>
            })}
        </div>
        )}
    </div>
  )
}

export default Searchbar