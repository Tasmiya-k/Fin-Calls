import Navbar from "../Components/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [PDFfile, setPDFfile] = React.useState(null);
  const [viewPdf, setviewPdf] = React.useState(null);
  const [fileUploaded, setFileUploaded] = React.useState(false);

  const fileType = ["application/pdf"];
  const handleSubmit = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (event) => {
          const pdfData = event.target.result;
          setPDFfile(pdfData);
          setFileUploaded(true);
          setviewPdf(pdfData);
          console.log("here");
          console.log(PDFfile);
        };
      } else {
        setPDFfile(null);
        setFileUploaded(false);
      }
    }
  };

  useEffect(() => {
    // Navigate when viewPdf has data and fileUploaded flag is set
    if (viewPdf && fileUploaded) {
      navigate("/uploaded", { state: { pdf: viewPdf } });
    }
  }, [viewPdf, fileUploaded, navigate]);

  return (
    <div>
      <Navbar />
      <div className="home-main">
        <div className="home-main-video">
          <video
            controls
            src="videos/Home-video.mp4"
            width="650px"
            height="350px"
          ></video>
        </div>

        <label for="file-upload" class="custom-file-upload">
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            className="button button-home"
            onChange={handleSubmit}
          />
          Upload Earning Call
        </label>

        {/* <button onClick={view}>view</button>
        <div className="pdf-container">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {viewPdf && (
              <>
                <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
              </>
            )}
          </Worker>
        </div> */}
      </div>
    </div>
  );
}
