import React, {useState} from 'react'
import { motion } from "framer-motion";
import { Typography } from '@mui/material';
import TagsInput from 'react-tagsinput';

const FormPageD = ({ formData, updateFormData}) => {
  const headerStyle = {
    margin: "auto",
    marginTop: 1,
    width: 0.5,
    height: 100
  }

  const [tags, setTags] = useState(formData['styles']);

  const handleChange = (tags) => {
    updateFormData("styles", tags)
    setTags(tags);
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
            <Typography sx={headerStyle} variant='h3' fontFamily={'Montserrat'} >What styles do you like?</Typography>
          </div>
          <Typography gutterBottom variant='h6' fontFamily={'Montserrat'} >Type them in below. Max 3.</Typography>
          <TagsInput maxTags={3} className='react-tagsinput' value={formData['styles']} onChange={handleChange} />
        </motion.div>
        
    </div>
  )
}

export default FormPageD;