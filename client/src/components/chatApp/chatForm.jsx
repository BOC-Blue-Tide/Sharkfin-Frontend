import React, {useState} from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatForm = function(props) {
  const [formData, setFormData] = useState('');

  const handleChange = function(e) {
    setFormData(e.target.value);
  }

  return <form onSubmit={(e) => {e.preventDefault(); props.handleFormSubmit(formData)}}>
  <input className='chatform' type='text' onChange={handleChange}></input>
  <Button type='submit' endIcon={<SendIcon />}>Send</Button>
  </form>
}

export default ChatForm;