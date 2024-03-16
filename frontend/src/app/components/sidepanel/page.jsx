"use client";
import React from 'react'
import './page.css'
import Image from 'next/image'
import avatar from '/src/app/assets/avatar.jpg'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLock } from '@fortawesome/free-solid-svg-icons'

function sidePanel() {
  return (
    <div className='main'>
        <Image src={avatar} alt='Avatar' className='avatar'></Image>
        <div className='icondiv'>
            <FontAwesomeIcon icon={faHome} className='iconbtn' size='3x'/>
            <p className='btnlabel'>Home</p>
        </div>

        <div className='icondiv logoutbtn'>
            <FontAwesomeIcon icon={faLock} className='iconbtn' size='3x'/>
            <p className='btnlabel'>Log Out</p>
        </div>
    </div>
  )
}

export default sidePanel