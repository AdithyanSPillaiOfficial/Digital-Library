// import React from 'react'
// import SidePanel from '../components/sidepanel/page'
// import './page.css'
// import Book from '../components/book/book'

// const booktemp = {
//   name: 'Naughty Book'
// }
// function Saved() {
//   return (
//     <div className='main main-extra'>
//         <SidePanel className='sidepanel'/>
//         <div className='main-content'>
//             <h1>Saved Books</h1>
//             <div className='horizontal-line'></div>
//             <div className='savedbooks'>
//               <Book {...booktemp}/>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Saved

"use client";
import React, { useEffect, useState } from 'react'
import './page.css'
import SidePanel from '../components/sidepanel/page'
import { serverAddress } from '../api';
import Cookies from 'js-cookie';
import { fetchSaved } from './getsaved';
import Book from '../components/book/book';
var limitflag = false;




function Saved() {
  const [savedBooks, setSavedBooks] = useState([]);

  async function getSaved(){
    if (Cookies.get('user') ) {
      const profile = JSON.parse(Cookies.get('user'));
      const userid = profile.user_id;
  
      const responce = await fetchSaved(userid);
      setSavedBooks(responce);
  
    }
    else {
      window.location = '/login'
    }
  }

  if(limitflag==false) {
    getSaved();
    limitflag = true;
  }


  return (
    <div className='main-extra'>
      <SidePanel className='sidepanel' />
      <div className='page'>
        <h1>Saved Books</h1>
        <div className="horizontal-line"></div>
        <div>
          {
            savedBooks.map(book =>(
              <Book {...book} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Saved