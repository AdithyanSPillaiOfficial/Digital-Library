"use client";
import React, { useEffect, useState } from 'react'
import SidePanel from './components/sidepanel/page'
import Cookies from 'js-cookie';
import './homepage.css';
import './page.module.css'
import BookSmall from './components/booksmall/book';
import { fetchRecent } from './components/booksmall/getrecent';
import { fetchSaved } from './saved/getsaved';
var limitflag = 0;

function Home() {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [recentBooks, setRecentBooks] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);

    useEffect(() => {
        var newuser;
        if (newuser = Cookies.get('user')) {
            const userObj = JSON.parse(newuser)
            console.log(userObj);
            if (userObj) {
                setIsLogedIn(true);
                setProfile(userObj);
            }
            else {
                window.location = '/'
            }
        }
        else {
            window.location = '/login'
        }


    }, [])

    if (!isLogedIn) {
        return (
            <div></div>
        )
    }




    async function getRecent() {
        if (Cookies.get('user')) {
            const profile = JSON.parse(Cookies.get('user'));
            const userid = profile.user_id;

            const responce = await fetchRecent(userid);
            setRecentBooks(responce);

        }
        else {
            window.location = '/login'
        }
    }

    async function getSaved() {
        if (Cookies.get('user')) {
            const profile = JSON.parse(Cookies.get('user'));
            const userid = profile.user_id;

            const responce = await fetchSaved(userid);
            setSavedBooks(responce);

        }
        else {
            window.location = '/login'
        }
    }

    if (limitflag == false) {
        getRecent();
        getSaved();
        limitflag = true;
    }


    return (
        <div className='main-extra'>
            <SidePanel />
            <div className="page">
                <h1>👋 Welcome {profile.name.split(' ')[0]}</h1>
                <div className="horizontal-line"></div>
                <h2>Recents</h2>
                <div className='recentbooks hide-scrollbar'>
                    {
                        recentBooks.map((book, index) => (
                            <BookSmall key={index} {...book} />
                        ))
                    }
                </div>

                <h2>Saved</h2>
                <div className='recentbooks hide-scrollbar'>
                    {
                        savedBooks.map((book, index) => (
                            <BookSmall key={index} {...book} />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default Home