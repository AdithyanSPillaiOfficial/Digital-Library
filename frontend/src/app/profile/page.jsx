"use client";
import React, { useEffect, useState } from 'react'
import './page.css'
import SidePanel from '../components/sidepanel/page'
import avatar from '../assets/avatar.jpg'
import Image from 'next/image';


function Profile() {

    const [profile, setProfile] = useState({
        image: avatar,
        name : 'User Not Loged In',
        semester : null,
        department: null,
    });

    useEffect(() => {
      if(localStorage.getItem('isLogedIn')){
        setProfile(JSON.parse(sessionStorage.getItem('user')));
      }
      else {
        window.location = '/login'
      }
    
      
    }, [])
    

    return (

        <div className='main'>

            <SidePanel />
            <div className='profile-content'>
                <h1>Profile</h1>
                <div className='profilediv'>
                    <div className='profilepicdiv'>
                        <Image src={profile.image} width={190} height={190} className='profilepic'></Image>
                    </div>
                    <div className='profiledetails'>
                        <h1>{profile.name}</h1>
                        <p className='profdetails'>Department : {profile.department}</p>
                        <p className='profdetails'>Semester : {profile.semester}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile