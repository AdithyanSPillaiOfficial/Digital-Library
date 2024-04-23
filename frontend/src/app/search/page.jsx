"use client";

import React, { useState, useEffect } from 'react'
import './page.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SidePanel from '../components/sidepanel/page';
import Book from '../components/book/book';
import Image from 'next/image';

import bookthumb from '../assets/bookthumb.png'
import checkLogin from '../components/checklogin/checkLogin';
import Login from '../login/page';
import { searchHandler } from './search';

const abook = {
    name: "Linear Algebra and Calculus"
};

function Search() {

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    var popularSearches = ['Data Structure', 'Java', 'DBMS', 'Flat', 'Compiler Design', 'LSD'];

    if(!checkLogin()){
        return (
          <h1>Please Login</h1>
        )
      }

    async function handleSearch() {
        const resdata =await searchHandler(searchInput);
        console.log(resdata);
        if (resdata != false && resdata != 'error') {
            setResultCount(resdata.rescount);
            setSearchResults(resdata.results)

        }
        else {
            alert('Search Failed');
            console.log('search failed');
        }
    }

    return (
        <div className='main-extra'>
            <SidePanel className='sidepanel' />
            <div className='page'>
                <h1>Discover New Books</h1>
                <div className='search-div'>
                    <input type="search" className='input-search' placeholder='Search titles or authors' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    <FontAwesomeIcon icon={faSearch} className='search-icon' size='2x' onClick={handleSearch}/>
                </div>
                <div className='horizontal-line' />
                <h3>Popular searches</h3>
                <div className='popular-searches'>
                    {
                        popularSearches.map((element, index) => (
                            <div key={index} className='popular-searches-pebble' onClick={() => { setSearchInput(element) }}>
                                <p>{element}</p>
                            </div>
                        ))
                    }

                </div>
                <div className="horizontal-line" />
                <div className='results'>
                    <p className='resultnum'>Results Found {resultCount}</p>
                    {
                        searchResults.map((result, index)=>(
                            <Book {...result}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Search;