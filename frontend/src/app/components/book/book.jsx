import React from 'react'
import './book.css';
import Image from 'next/image';

import bookthumb from '../../assets/bookthumb.png'

function Book(props) {
    return (
        <div className='book'>
            <Image src={bookthumb} alt='login image' className='thumbimage'></Image>
            <div className='bookprops'>
                <h1 className='bookname'>{props.name}</h1>
                <p>Author name : </p>
                <p>Department : </p>
                <p>Subject : </p>
                <div className='bookactionbuttons'>
                    <button className='actionbutton'>View</button>
                    <button className='actionbutton'>Save</button>
                    <button className='actionbutton'>Download</button>
                </div>
            </div>
        </div>
    )
}

export default Book