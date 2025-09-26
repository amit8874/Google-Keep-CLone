import React, { useEffect, useState } from 'react'
import '../../assets/styles/searchBar.css';
import {useDispatch} from "react-redux";
import { updateSearchQuery } from '../../Redux/HomeSlice';

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect (()=> {

    dispatch(updateSearchQuery(search));
  },[search, dispatch]);

  const handleInputOnChange = (e) =>{
    setSearch (e.target.value);
  }

  const handleReset = ()=>{
    setSearch("");
  }

  return (
    <div className='searchBarParentContainer'>
        <div className='searchBarIconContainer'>
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <input 
          type="text"  
          className='searchBarInputContainer'
          placeholder='Search...'
          value={search}
          onChange={handleInputOnChange}
        />
        {search?.length?(
            <div className='searchBarIconContainer' onClick={handleReset}>
            <i class="fa-solid fa-xmark"></i>
          </div>
        ):( 
          ""
        )}  
    </div>
  )
}

export default SearchBar