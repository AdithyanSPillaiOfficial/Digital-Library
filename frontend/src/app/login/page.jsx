"use client";
import React, { useState } from 'react'
import './page.css'
import loginimage from './loginimage.png'
import Image from "next/image";


function Login() {

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className='maindiv'>
            <div className='loginformdiv'>
                <div>
                    <h1 className='title'>Login</h1>
                    <p>Enter Username</p>
                    <input type="text" placeholder='Enter username' onChange={(e)=> setUname(e.target.value)}/>
                    <br /><br /><br />
                    <p>Enter Password</p>
                    <input type="passsword" placeholder='Enter password' onChange={(e)=> setPass(e.target.value)}/>
                    <br /><br /><br /><br />
                    <button className='submitbtn'>Login</button>
                </div>
                <div>
                    <Image src={loginimage} alt='login image' className='image'></Image>
                </div>

            </div>
        </div>
    )
}

export default Login