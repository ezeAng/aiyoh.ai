import '@fontsource/montserrat';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Form from './components/forms/Form';
import Footer from './components/footer/Footer';
import Results from './components/results/Results';
import { Button, Typography } from '@mui/material';

import { motion, AnimatePresence } from "framer-motion";

import { headerStyle, beginBtnStyle } from './styles/style.js';


function App() {

  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [showBeginBtn, setShowBeginBtn] = useState(true);

  const [showHeader, setShowHeader] = useState(true);

  const navigateToResults = (data) => {
    setResults(data);
    navigate('/results', {replace: true});
    setShowBeginBtn(false);
  };

  const handleBegin = () => {
    setShowHeader(false);
    setShowBeginBtn(false);
  }

  const returnToHome = () => {
    setShowHeader(true);
    setShowBeginBtn(true);
  }

  
  return (
    <div>
      <div className="App">
      <AnimatePresence>
        {showHeader && (
          <motion.header
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6}}
          >
            <Typography sx={headerStyle} variant='h2' fontFamily={'Montserrat'} >Welcome to AIYOH</Typography>
            <Typography variant='h4' fontFamily={'Montserrat'} gutterBottom>AI Invents Your Own Home!</Typography>
            <Typography variant='h5' fontFamily={'Montserrat'} >Begin your design journey here.</Typography>
          </motion.header>
        )}
      </AnimatePresence>
      {showBeginBtn ? <Button sx={beginBtnStyle} onClick={handleBegin} ><Typography variant='h3' color={"white"} fontFamily={'Montserrat'} >Begin</Typography></Button> : null}
      
      <Routes>
        <Route path="/" element={<Form showBegin={returnToHome} showHeader={showHeader} navigateToResults={navigateToResults} />} />
        <Route path="/results" element={<Results results={results} showBegin={returnToHome} />} />
      </Routes>

      <Footer />
      </div>
      <div className="error-prompt">
        <Typography variant='h4' fontFamily={'Montserrat'} >Please view this website on a desktop for the best experience.</Typography>
      </div>
    </div>
  );
}

export default App;
