"use client";
import './page.css'
import Image from 'next/image'
import avatar from '/src/app/assets/avatar.jpg'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHome, faLock, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'




function SidePanel() {
  const [user, setUser] = useState({
    image: avatar,
    name: 'User Not Logged In',
    semester: null,
    department: null,
  });
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      try {
        setUser(JSON.parse(sessionStorage.getItem('user')));
      } catch (error) {
        console.error(error);
        alert(error);
        //window.location = '/login';
      }
    } else {
      setUser({
        image: avatar,
        name: 'User Not Logged In',
        semester: null,
        department: null,
      });
    }
  
    
  }, [])
  



  return (
    <div className='sidepanel-main'>
      <Image src={user.image || avatar} alt='Avatar' width={50} height={50} className='avatar' onClick={() => window.location = '/profile'}></Image>
      <div className='icondiv' onClick={() => (typeof window !== 'undefined') && (window.location = '/')}>
        <FontAwesomeIcon icon={faHome} className='iconbtn' size='3x' />
        <p className='btnlabel'>Home</p>
      </div>

      <div className='icondiv' onClick={() => (typeof window !== 'undefined') && (window.location = '/search')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='iconbtn' size='3x' />
        <p className='btnlabel'>Search</p>
      </div>

      <div className='icondiv' onClick={() => (typeof window !== 'undefined') && (window.location = '/saved')}>
        <FontAwesomeIcon icon={faBookmark} className='iconbtn' size='3x' />
        <p className='btnlabel'>Saved</p>
      </div>

      <div className='icondiv logoutbtn' onClick={() => {
        localStorage.removeItem('isLogedIn');
        window.location = '/login';
      }}>
        <FontAwesomeIcon icon={faLock} className='iconbtn' size='3x' />
        <p className='btnlabel'>Log Out</p>
      </div>
    </div>
  )
}

export default SidePanel
