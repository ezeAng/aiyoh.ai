import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { motion } from "framer-motion";

const FormPageA = ({ formData, updateFormData}) => {

  const sliderStyle = {
    display: 'flex',
    width: 0.3,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const boxStyle = { 
    width: 0.8, display: 'block', margin: 'auto',
    marginBottom: "5rem",
    justifyContent: 'center',
    alignItems: 'center', }
  
  const headerStyle = {
    padding: 2,
    margin: "auto",
    width: 0.5,
    height: "fit-content",
    marginBottom: "2rem"
  }
   
  return (
    <div>
        <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div>
          <Typography sx={headerStyle} variant='h4' fontFamily={'Montserrat'} >Tell us about your room layout</Typography>
        </div>
        <Box sx={boxStyle}>
          <Typography fontFamily={'Montserrat'} gutterBottom>Room Type</Typography>
          <Box sx={sliderStyle}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData["room"]}
              label="Room"
              onChange={(e) => updateFormData("room", e.target.value)}
            >
              <MenuItem value={"Living"}>Living</MenuItem>
              <MenuItem value={"Dining"}>Dining</MenuItem>
              <MenuItem value={"Bedroom"}>Bedroom</MenuItem>
            </Select>
          </FormControl>
          </Box>
        </Box>
        <Box sx={boxStyle}>
          <Typography fontFamily={'Montserrat'} gutterBottom>Room Area in square meters</Typography>
          <Slider
            sx={sliderStyle}
            aria-label="Default"
            value={formData['area']}
            valueLabelDisplay="on"
            onChange={(e) => updateFormData("area", e.target.value)} />
        </Box>
        </div>
          </motion.div>
        
    </div>
  )
}

export default FormPageA;