import React from 'react'
import './book.css';
import Image from 'next/image';

import bookthumb from '../../assets/bookthumb.png'
import { serverAddress } from '@/app/api';
import Cookies from 'js-cookie';

function Book(props) {
    const thumbimg = serverAddress + props.thumbnail;
    function viewHandler() {
        sessionStorage.setItem('resloc', props.locations);
        document.location = '/pdfviewer';
    }

    async function saveHandler() {
        var newuser, accessdet = {};
        if (newuser = Cookies.get('user')) {
            const userObj = JSON.parse(newuser)
            console.log(userObj);
            if (userObj) {
                accessdet.sessionid = userObj.sessionid;
                accessdet.bookId = props._id;
            }
            else {
                window.location = '/'
            }
        }
        else {
            window.location = '/login'
        }

        try {
            const responce = await fetch(serverAddress+'/savebook',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(accessdet),
            });
    
            if(responce.ok){
                const data = await responce.json();
                console.log('Data Fetched');
                if(data.status==='sucess'){
                    alert('Book Saved')
                    return(data);
                }
                else {
                    return(false)
                }
            }
        } catch (error) {
            return('error : '+error)
        }
    }

    return (
        <div className='book'>
            <Image src={thumbimg} alt='login image' className='thumbimage' width={200} height={300}></Image>
            <div className='bookprops'>
                <h1 className='bookname'>{props.name}</h1>
                <p>Author name : {props.author}</p>
                <p>Department : {props.department}</p>
                <p>Subject : {props.subject}</p>
                <div className='bookactionbuttons'>
                    <button className='actionbutton' onClick={viewHandler}>View</button>
                    <button className='actionbutton' onClick={saveHandler}>Save</button>
                    <button className='actionbutton'>Download</button>
                </div>
            </div>
        </div>
    )
}

export default Book