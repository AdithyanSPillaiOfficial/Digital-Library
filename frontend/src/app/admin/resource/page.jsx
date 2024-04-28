"use client"
import React, { use, useEffect, useState } from 'react'
import './resource.css'
import SidePanel from '@/app/components/sidepanel/page'
import Cookies from 'js-cookie'



function AddResource() {
  const [adminVerify, setAdminVerify] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    var newuser;
    if (newuser = Cookies.get('user')) {
      const userObj = JSON.parse(newuser)
      console.log(userObj);
      if (userObj && userObj.role == 'librarian') {
        setAdminVerify(true)
      }
      else {
        window.location = '/'
      }
    }
    else {
      window.location = '/login'
    }


  }, [])

  if (!adminVerify) {
    return (
      <div></div>
    )
  }
  return (
    <div className='main-admin'>
      <h1>Manage Resources</h1>
      <div className='horizontal-line' />
      <div className='option-parent'>
        <div className='options'>
          <div className='tile' onClick={()=>{document.location='./'}}>
            <b >Edit or Delele resource</b>
          </div>
          <div className='tile' onClick={()=>{document.location=document.location+'/addresource'}}>
            <b >Add Resource</b>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default AddResource