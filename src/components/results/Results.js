import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Modal, Typography } from '@mui/material';
import { GridLoader } from 'react-spinners';
import { modalStyle, loaderStyle, resultHeaderStyle, resultStyle, paperStyle, btnContStyle, homeBtnStyle, generalStyles } from '../../styles/style.js';
import { OpenAI } from 'openai';
import img from "../../images/tree.png";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY, 
  dangerouslyAllowBrowser: true
});



const Results = ({results, showBegin}) => {

  console.log("Results Mounted:", results);

  const navigate = useNavigate();
  const navigateToHome = () => {
    showBegin();
    navigate('/', {replace: true});
  };

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [finalRes, setFinalRes] = useState("");
  const [gettingImg, setGettingImg] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    window.open(finalRes, '_blank');
    // try {
    //   // Fetch the image from the finalRes URL
    //   const response = await fetch(finalRes);
    //   // Create a blob from the response
    //   const imageBlob = await response.blob();
    //   // Create an object URL for the blob
    //   const imageObjectURL = URL.createObjectURL(imageBlob);
  
    //   // Create a new anchor element and trigger the download
    //   const anchor = document.createElement('a');
    //   anchor.href = imageObjectURL;
    //   anchor.download = 'downloadedImage.png'; // Set the name of the downloaded file
    //   document.body.appendChild(anchor); // Append the anchor to the body
    //   anchor.click(); // Programmatically click the anchor to trigger the download
    //   document.body.removeChild(anchor); // Remove the anchor after triggering the download
  
    //   // Clean up the object URL to avoid memory leaks
    //   URL.revokeObjectURL(imageObjectURL);
    // } catch (error) {
    //   console.error('Error during image download', error);
    //   // You can display an error message to the user here if needed
    // }
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
    styles = results['styles'].join(', ');
  }
  
  //Create GPT PRompt
  
  const prompt = `
    I am planning a interior design for a room. 
    Can you generate a real life artist impression of a ${roomType} room of size ${area} square meters in area using 
    these styles: ${styles}.
    Use IKEA products for the furnishing and lighting and make the image as realistic as possible.
  .`;

  const final_prompt = prompt;



  useEffect(() => {
    console.log("Getting res")
    getOpenAIResult(final_prompt);
    
  },[]);


  //Do the GPT API Call here
  async function getOpenAIResult(prompt) {
    try {
      console.log("Getting...")
      const response = await openai.images.generate({
        prompt: prompt,
        n : 1,
        size: "1024x1024"
      });
      
      console.log("Response",response);
      
      if (response) {
        var image_url = response.data[0].url;
        console.log("Completed")
        setFinalRes(image_url);
        setIsLoading(false);
        return response;
      } else {
        return null;
      }
      // if (img) {
      //   var image_url = img;
      //   console.log("Completed")
      //   setFinalRes(image_url);
      //   setIsLoading(false);
      //   return img;
      // } else {
      //   return null;
      // }
      
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