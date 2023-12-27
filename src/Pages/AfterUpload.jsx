import Navbar from "../Components/Navbar";
import React from "react";
import {Viewer, Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useLocation } from "react-router-dom";

export default function AfterUpload(props) {
  const { state } = useLocation();
  const viewPdf = state?.pdf;

  const [changeDiv, setchangeDiv] = React.useState(false);
 console.log(viewPdf)
  // const viewPdf = props.pdf;

  function GenerateTranscript(){
      setchangeDiv(prev=>!prev);
  }
  const newplugin = defaultLayoutPlugin();

  return (
    <div>
      <Navbar />
      
      <div className="afterupload-main">

        {changeDiv? 
        (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {viewPdf && <><Viewer fileUrl={viewPdf} plugins={[newplugin]}/> </>}
            </Worker>
      
        )
          : 
          (<div className="afterupload-main-sec">
            <img src="/images/Audio File.png" />
            <h2>Upload Successfull</h2>
         </div>
         )}
        
        <div className="afterupload-main-buttons">
          <div className="afterupload-button-sec1">
            <button className="after-upload-butt" onClick={GenerateTranscript}>Generate Transcript</button>
            <button className="after-upload-butt" >Generate Structured Summary</button>
          </div>
          <div className="afterupload-button-sec1">
            <button className="after-upload-butt" >Generate Unstructured Summary</button>
            <button className="after-upload-butt" >Visualize Data</button>
          </div>
        </div>

      </div>
    </div>
  );
}
