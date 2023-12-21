import React, { useState, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadIcon from './UploadIcon';
import { useDropzone } from 'react-dropzone';

export const Section = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [fileContent, setFileContent] = useState(location.state?.fileContent || '');
    const [prediction, setPrediction] = useState('');
    const [confidence, setConfidence] = useState('');
    const fileInputRef = useRef(null);

    const navigateToHome = () => {
        navigate('/');
    };

    const readAndSetFileContent = async (file) => {
        if (file && file.type === 'text/plain') {
          const reader = new FileReader();
    
          const handleLoad = (event) => {
            const content = event.target.result;
            setFileContent(content);
          };
    
          reader.onload = handleLoad;
    
          reader.readAsText(file);
        } else {
          setFileContent('Invalid file type. Only .txt files are accepted.');
          console.error('Invalid file type. Only .txt files are accepted.');

          setPrediction('');
        }
      };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        readAndSetFileContent(file)
      };

    const handleFileInputChange = () => {
        const fileInput = fileInputRef.current;

        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            readAndSetFileContent(file);
        }
    };

    const handlePredictClick = () => {
      if (fileContent.trim() !== '') {
        fetch('https://nb-model-api-6b28733f4586.herokuapp.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: fileContent }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result) {
                    setPrediction(result.prediction);
                    setConfidence(result.confidence);
                } else {
                    setPrediction('Prediction not available');
                    setConfidence('');
                }
            })
            .catch((error) => {
                console.error('Error making prediction:', error);
            });
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });


  return (
    <div id="about">
      <div className="container" style={{ marginTop: '50px' }}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <Box
              sx={{
                border: '1px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
                <div>
                    <UploadIcon />
                </div>
                <div>
                    <p>Drag & Drop</p>
                </div>
                <div>
                    <p>OR</p>
                </div>
                <div>
                    <Button variant="contained" component="label"
                    onChange={handleFileInputChange}>
                    Browse
                    <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
                    </Button>
                </div>
                <div style={{ color: 'red' }}>
                    <p style={{ fontSize: '9px' }}>Only .txt files are accepted</p>
                </div>
            </Box>{" "}
            <Button auto onClick={navigateToHome}
                className="btn btn-custom btn-lg"
                style={{ marginTop: '50px' }}
            >
                Back to Home
            </Button>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Email Content</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>{fileContent || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
              <Button
                  variant="contained"
                  onClick={handlePredictClick}
                  sx={{
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        color: '#5ca9fb'
                    },
                }}
              >
                  Predict
              </Button>
              {prediction && confidence && (
              <div>
                <h3 style={{ marginTop: '50px' }}>Prediction:</h3>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{
                  fontWeight: '500',
                  backgroundColor: prediction.toLowerCase() === 'spam' ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)',
                  padding: '5px',
                  margin: '0px',
                  borderRadius: '3px',
                  display: 'inline',
                }}>
                  {prediction}
                </p>
                <p style={{ marginLeft: '10px', padding: '5px', margin: '0px' }}>with {Math.round(confidence)}%</p>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};