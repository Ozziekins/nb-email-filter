import React from "react";
import { useNavigate } from 'react-router-dom';
import EmailFilterIcon from './EmailFilterIcon';

export const Navigation = (props) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
      navigate('/');
  };
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <div auto onClick={navigateToHome} style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <a href="" className="navbar-brand" style={{ paddingTop: '35px' }}>
            AI Course Project
            </a>{" "}
            <EmailFilterIcon/>
          </div>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
        </div>
      </div>
    </nav>
  );
};