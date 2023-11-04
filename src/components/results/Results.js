import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Modal, Typography } from '@mui/material';
import { GridLoader } from 'react-spinners';
import { modalStyle, loaderStyle, resultHeaderStyle, resultStyle, paperStyle, btnContStyle, homeBtnStyle, generalStyles } from '../../styles/style.js';
import { OpenAI } from 'openai';
import img from '../../images/tree.png';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY, 
  dangerouslyAllowBrowser: true
});



const Results = ({results, showBegin}) => {

  const navigate = useNavigate();
  const navigateToHome = () => {
    showBegin();
    navigate('/', {replace: true});
  };

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [finalRes, setFinalRes] = useState(img);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    // Create a new anchor element dynamically
    const anchor = document.createElement('a');
    anchor.href = finalRes;
    // Optionally set a filename for the downloaded image
    anchor.download = 'downloadedImage.png'; // You can set your own image name and extension
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  var roomType = ['studio'];
  if (results['room']) {
    roomType = results['room'];
  }

  var area = ["30"];
  if (results['area']) {
    area = results['area'];
  }

  var styles = ["No specific style"];
  if (results['styles']) {
    styles = results['styles'].join(',');
  }
  
  //Create GPT PRompt
  
  const prompt = `
    I am planning a interior design for a room. 
    Can you generate a real life artist impression of a ${roomType} room of size ${area} square meters in area using 
    these styles: ${styles}.
    Use IKEA products for the furnishing and lighting and make the image as realistic as possible.
  .`;

  // const prompt_options = {
  //   0 : `After which, tell me 5 possible career paths I can take. `,
  //   1 : `After which, tell me 5 possible steps I can take. `
  // };

  const tone = "Respond simply in the tone of a interior designer, in less than 100 words.";

  var final_prompt = prompt + tone;

  useEffect(() => {
    getOpenAIResult(final_prompt);
    return;
  },[]);


  //Do the GPT API Call here
  async function getOpenAIResult(prompt) {
    try {
      console.log("Getting...")
      // const response = await openai.images.generate({
      //   prompt: prompt,
      //   n : 1,
      //   size: "1024x1024"
      // });
      
      // console.log("Response",response);
      // var image_url = response.data[0].url;
      var image_url = img;


      // if (response) {
      //   console.log("Completed")
      //   setFinalRes(image_url);
      //   setIsLoading(false);
      // }
        setFinalRes(image_url);
        setIsLoading(false);
      
      return img;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setHasError(true);
      return null;
    }
  }





  return (
      <div>
        <Typography variant="h5" sx={resultHeaderStyle} fontFamily={"montserrat"} >"The best way to turn a house into a home is to fill it with love and laughter."</Typography>
        <Typography sx={resultHeaderStyle} fontFamily={"montserrat"} gutterBottom>- William J. Bennett.</Typography>
        <Box sx={loaderStyle}>
          <GridLoader loading={isLoading} color="#545251" />
        </Box>
        <Box sx={resultHeaderStyle}>
          {!isLoading && finalRes ? <Typography variant="h5" sx={resultHeaderStyle} fontFamily={"montserrat"} gutterBottom>Hello, thank you for waiting.</Typography> : null}
        </Box>

        {(finalRes || hasError) && !isLoading ? 
          <Box sx={resultStyle} onClick={handleOpen}>
            {hasError ? <Typography variant="h5" sx={resultHeaderStyle} fontFamily={"montserrat"} gutterBottom>There seems to be an error with our service, our engineers are working on it.</Typography> : null}
            {finalRes ? 
              <img src={finalRes} alt={`Result`} />
              : null}
          </Box> 
        : null}
        {finalRes ? <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{width: "100%", alignItems: "center", alignContent: "center"}}>
            <Typography gutterBottom fontFamily={"montserrat"} variant="h4">
              Download or Share Image
            </Typography>
            <Button variant="contained" sx={{backgroundColor:generalStyles.backgroundColor}} onClick={handleDownload}><Typography fontFamily={"montserrat"}>Download</Typography></Button>
          </Box>
        </Box>
      </Modal> : null}
        
        <Box sx={btnContStyle}>
          {!isLoading && (finalRes || hasError) ? <Button sx={homeBtnStyle} onClick={navigateToHome}><Typography fontSize={24} fontFamily={"montserrat"} >Return Home</Typography></Button> : null}
        </Box>
        
      </div>
  )
}

export default Results