"use client";
import React, { useState } from 'react'
import './page.css'
import loginimage from './loginimage.png'
import Image from "next/image";
import TextField from '@mui/material/TextField';
import { serverAddress } from '../api';
import { handleSubmit } from './auth';
import Cookies from 'js-cookie';

function Login() {

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');


    return (
        <div className='maindiv'>
            <div className='loginformdiv'>
                <div>
                    <h1 className='title'>Login</h1>
                    <p>Enter Username</p>
                    {/* <input type="text" placeholder='Enter username' onChange={(e)=> setUname(e.target.value)}/> */}
                    <div className="login-input-row">
                        <TextField
                            onChange={(e) => setUname(e.target.value)}
                            InputProps={{
                                sx: {
                                    borderRadius: '35px',
                                    padding: '1px 5px',
                                    backgroundColor: 'white'
                                },
                            }}
                            className='login-input'
                            required
                            label='Username'
                            type='text' />
                    </div>
                    <br /><br />
                    <p>Enter Password</p>
                    {/* <input type="passsword" placeholder='Enter password' onChange={(e)=> setPass(e.target.value)}/> */}
                    <div className="login-input-row">
                        <TextField
                            onChange={(e) => setPass(e.target.value)}
                            InputProps={{
                                sx: {
                                    borderRadius: '35px',
                                    padding: '1px 5px',
                                    backgroundColor: 'white'
                                },
                            }}
                            className='login-input'
                            required
                            label='Password'
                            type='password' />
                    </div>
                    <br /><br /><br /><br />
                    <button className='submitbtn' onClick={async () => {
                        const responce = await handleSubmit(uname, pass);
                        if (responce != false && responce != 'error') {
                            localStorage.setItem('isLogedIn', true);
                            //localStorage.setItem('sessionId', status);

                            //temp adjustment
                            //const userCookie = { "name": "Adithyan S Pillai", "department": "Computer Science and Engineering", "semester": "S6", "image": "https://avatars.githubusercontent.com/u/130700552?v=4", "role" : "student" };
                            Cookies.set('user',JSON.stringify({...responce.userdetails}), { expires : 1 });
                            document.location = './search'
                        }
                        else {
                            alert('Login Failed');
                            console.log(status);
                        }

                    }}>Login</button>
                </div>
                <div>
                    <Image src={loginimage} alt='login image' className='image'></Image>
                </div>

            </div>
        </div>
    )
}

export default Login