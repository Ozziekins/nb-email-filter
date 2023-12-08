import React, { useState, useEffect } from 'react';
import JsonData from '../data/data.json'
import { Navigation } from './Navigation';
import { Header } from './Header';

const HomePage = () => {

    const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


    return (
        <div>
          <Navigation />
          <Header data={landingPageData.Header} />
        </div>
      );
};

export default HomePage;