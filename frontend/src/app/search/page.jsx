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

const abook = {
    name: "Linear Algebra and Calculus"
};


 function Search() {    
    useEffect(() => {
        if(!checkLogin()){
            return <Login />
        }
    
    }, [])
    if(!checkLogin()){
        return <Login />
    }
    const [searchInput, setSearchInput] = useState('');
    var popularSearches = ['Data Structure', 'Java', 'DBMS', 'Flat', 'Compiler Design', 'LSD'];
    
    return (
        <div className='main-extra'>
            <SidePanel className='sidepanel' />
            <div className='page'>
                <h1>Discover New Books</h1>
                <div className='search-div'>
                    <input type="search" className='input-search' placeholder='Search titles or authors' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    <FontAwesomeIcon icon={faSearch} className='search-icon' size='2x' />
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
                    <Book {...abook} />
                </div>
            </div>
        </div>
    )
}

export default Search