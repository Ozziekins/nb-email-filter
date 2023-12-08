import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const Header = (props) => {
    const navigate = useNavigate();

    const handleUploadClick = () => {
    navigate('/upload');
    };

    const handleSampleClick = () => {
      navigate('/samples');
      };

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '150px' }}>
                  <Button auto onClick={handleUploadClick}
                    className="btn btn-custom btn-lg"
                  >
                    Upload my own email
                  </Button>
                  <Button auto onClick={handleSampleClick}
                    className="btn btn-custom btn-lg"
                  >
                    Use from sample
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};