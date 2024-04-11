"use client";
import React, { useEffect, useState } from 'react'
import './page.css'
import SidePanel from '../components/sidepanel/page'
import avatar from '../assets/avatar.jpg'
import Image from 'next/image';
import checkLogin from '../components/checklogin/checkLogin';
import Cookies from 'js-cookie';


function Profile() {

    const logsta = checkLogin();
    console.log(logsta)
    
    useEffect(() => {
        if( window != undefined && logsta == false){
            window.location = '/login';
            return (
                null
            )
        }
    }, [])
    

    const [profile, setProfile] = useState({
        image: avatar,
        name : 'User Not Loged In',
        semester : null,
        department: null,
    });

    useEffect(() => {
      if(Cookies.get('user') || profile == null){
        setProfile(JSON.parse(Cookies.get('user')));
      }
      else {
        window.location = '/login'
      }
    
      
    }, [])
    

    return (

        <div className='main-extra'>

            <SidePanel />
            <div className='profile-content'>
                <h1>Profile</h1>
                <div className='profilediv'>
                    <div className='profilepicdiv'>
                        <Image src={profile.profilepic} width={190} height={190} className='profilepic'></Image>
                    </div>
                    <div className='profiledetails'>
                        <h1>{profile.name}</h1>
                        <p className='profdetails'>Department : {profile.department}</p>
                        <p className='profdetails'>Year : {profile.year}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile