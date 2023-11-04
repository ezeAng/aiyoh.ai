import React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import { motion } from "framer-motion";

const FormPageSubmit = () => {
  return (
    <div>
      <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <Typography variant='h2' sx={{marginTop:14, padding: 4}} fontFamily={'Montserrat'} >Ready to see your dream home?</Typography>

      </motion.div>
        
    </div>
  )
}

export default FormPageSubmit