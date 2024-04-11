"use client";
import './page.css'
import Image from 'next/image'
import avatar from '/src/app/assets/avatar.jpg'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHome, faLock, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { adminItems, userItems } from './MenuItems';
import checkLogin from '../checklogin/checkLogin';




function SidePanel() {


  const [user, setUser] = useState({
    image: avatar,
    name: 'User Not Logged In',
    semester: null,
    department: null,
  });
  useEffect(() => {
    if (user != null) {
      try {
        setUser(JSON.parse(Cookies.get('user')));
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


  if(!checkLogin()){
    try { window.location = '/login'; } catch(error) {}
    return (
      <h1>Please Login</h1>
    )
  }

  var menuitems = [];
  if (user.role == 'admin') {
    menuitems = adminItems;
  }
  else if (user.role == 'student' || user.role == 'faculty') {
    menuitems = userItems;
  }



  return (
    <div className='sidepanel-main'>
      <Image src={user.image || avatar} alt='Avatar' width={50} height={50} className='avatar' onClick={() => window.location = '/profile'}></Image>

      {
        menuitems.map((item, index) => (
          <div key={index} className='icondiv' onClick={() => (typeof window !== 'undefined') && (window.location = item.redirect)}>
            <FontAwesomeIcon icon={item.icon} className='iconbtn' size='3x' />
            <p className='btnlabel'>{item.label}</p>
          </div>
        ))
      }

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
