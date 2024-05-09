"use client";
import React, { useEffect, useState } from 'react'
import './page.css'
import SidePanel from '../components/sidepanel/page'
import avatar from '../assets/avatar.jpg'
import Image from 'next/image';
import checkLogin from '../components/checklogin/checkLogin';
import Cookies from 'js-cookie';
import { serverAddress } from '../api';


function Profile() {

    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');


    const logsta = checkLogin();
    console.log(logsta)

    useEffect(() => {
        if (window != undefined && logsta == false) {
            window.location = '/login';
            return (
                null
            )
        }
    }, [])


    const [profile, setProfile] = useState({
        image: avatar,
        name: 'User Not Loged In',
        semester: null,
        department: null,
    });

    useEffect(() => {
        if (Cookies.get('user') || profile == null) {
            setProfile(JSON.parse(Cookies.get('user')));
        }
        else {
            window.location = '/login'
        }


    }, [])

    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (password == repassword) {
            const sendObj = {
                sessionid : profile.sessionid,
                password : password
            };

            try {
                
                const responce = await fetch(serverAddress + '/changepassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(sendObj)
                });
        
                if (responce.ok) {
                    const data = await responce.json();
                    //console.log(data);
                    console.log('Data Fetched');
                    if (data.status === 'sucess') {
                        //return true;
                        alert("Password Changed Sucessfully")
                    } else {
                        //return false;
                        alert("Error Occured")
                    }
                }
            } catch (error) {
                alert("Something Went Wrong");
                return 'error : ' + error;
                
            }


        }
        else {
            alert("Password Mismatch");
        }
    }


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
                <div className='formdiv'>
                    <div className='formbox'>
                        <p className='formhead'>Change Password</p>
                        <form onSubmit={handleChangePassword} className='form' >

                            <div className='formbody'>

                                <div>
                                    <p className='inputlabel'>New Password</p>
                                    <input type="password" placeholder='New Password' className='inputdiv' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <p className='inputlabel'>Re Enter New Password</p>
                                    <input type="password" placeholder='Re Enter New Password' className='inputdiv' value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                                </div>

                            </div>


                            <div className='btndiv'>
                                <button type='reset' className='cancelbtn' onClick={() => window.location.reload()}>Cancel</button>
                                <button type='submit' className='uploadbtn'>Submit</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile