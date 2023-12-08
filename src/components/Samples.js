import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import samplesData from "../data/samples.json";

export const Samples = () => {
    const navigate = useNavigate();

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedContent, setClickedContent] = useState(null);
    const [clickedSampleClass, setClickedSampleClass] = useState(null);

    const navigateToHome = () => {
      navigate('/', { state: { fileContent: clickedContent } });
    };

    const handleBoxClick = (sampleClass, content) => {
      console.log("entered handleBoxClick");
      console.log("sampleClass:", sampleClass);
      console.log("content:", content);
      
      setClickedContent(content);
      setClickedSampleClass(sampleClass);
    };

    useEffect(() => {
      if (clickedContent && clickedSampleClass) {
        console.log("entered useEffect");
        console.log("clickedContent:", clickedContent);
        console.log("clickedSampleClass:", clickedSampleClass);
        navigate('/upload', { state: { fileContent: clickedContent } });
        downloadFile(clickedSampleClass, clickedContent);
      }
    }, [clickedContent, clickedSampleClass, navigate]);

    const downloadFile = (filename, content) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };

  return (
    <div id="portfolio" className="text-center">
      <div className="container" style={{ marginTop: '50px' }}>
        <div className="section-title">
          <h2>Samples</h2>
          <p>
            Below are some examples from our own validation set.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {samplesData
              ? samplesData.map((sample, index) => (
                  <div
                    key={`sample-${index}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                    style={{
                      flex: '0 0 calc(33.333% - 40px)',
                      margin: '20px',
                      position: 'relative',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="portfolio-item"
                      style={{
                        border: '1px solid #ccc',
                        padding: '20px',
                        height: '200px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                      onClick={() => handleBoxClick(sample.class, sample.content)}
                    >
                      <p style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {sample.content}
                      </p>
                      {hoveredIndex === index && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <p>{sample.class}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>

        <Button auto onClick={navigateToHome}
            className="btn btn-custom btn-lg"
            style={{ marginTop: '50px' }}
        >
            Back to Home
        </Button>
        {clickedContent && (
          <a
            id="downloadLink"
            style={{ display: "none" }}
            download={`${clickedSampleClass}.txt`}
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              clickedContent
            )}`}
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};
