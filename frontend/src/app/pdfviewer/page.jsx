"use client"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin, plugin } from "@react-pdf-viewer/default-layout"

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import React, { useEffect, useState } from 'react'
import SidePanel from "../components/sidepanel/page";
import './page.css'
import { serverAddress } from "../api";

async function fetchPDFAndConvertToBlob(pdfURL) {
    try {
        // Fetch the PDF file
        const response = await fetch(pdfURL);

        // Get the response as a blob
        const blob = await response.blob();

        return blob;
    } catch (error) {
        console.error('Error fetching PDF:', error);
        throw error;
    }
}


function PdfViewer() {

    const [resloc,setResloc] = useState('');
    const newPlugin = defaultLayoutPlugin();
    useEffect(() => {
        setResloc(sessionStorage.getItem('resloc'));
        if (resloc == null || resloc == undefined ) {
            document.location='/search';
        }
    }, [])

    return (
        <div className="main-extra">
            <SidePanel className="sidepanel" />
            <div className="page">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js" >
                    <Viewer fileUrl={serverAddress + resloc} plugins={[newPlugin]} />
                </Worker>
            </div>
        </div>
    )
    // return(
    //     <div className="main-extra">
    //         <SidePanel className="sidepanel" />
    //         <div className="page">
    //             <iframe src="http://127.0.0.1/test/qp.pdf" frameborder="0" className="pdfframe"></iframe>
    //         </div>
    //     </div>
    // )
}

export default PdfViewer

// import React from 'react'

// function PdfViewer() {
//   return (
//     <div height="100vh">
//         <iframe src="http://127.0.0.1/test/qp.pdf" frameborder="0"></iframe>
//     </div>
//   )
// }

// export default PdfViewer