import React from 'react'
import './book.css';
import Image from 'next/image';

import bookthumb from '../../assets/bookthumb.png'
import { serverAddress } from '@/app/api';

function Book(props) {
    const thumbimg = serverAddress + props.thumbnail;
    function viewHandler(){
        sessionStorage.setItem('resloc',props.locations);
        document.location='/pdfviewer';
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
                    <button className='actionbutton'>Save</button>
                    <button className='actionbutton'>Download</button>
                </div>
            </div>
        </div>
    )
}

export default Book