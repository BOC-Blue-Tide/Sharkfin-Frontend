import React, {useState} from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatForm = function(props) {
  const [formData, setFormData] = useState('');
  const [sentData, setSentData] = useState('');

  const handleChange = function(e) {
    let inputText = e.target.value;
    let escapedText = inputText.replaceAll("'", "''");

    setFormData(inputText);
    setSentData(escapedText);
  }

  return <form onSubmit={(e) => {
    e.preventDefault();
    props.handleFormSubmit(sentData);
    setFormData('');
    }}>
  <input className='chatform' type='text' value={formData} onChange={handleChange}></input>
  <Button type='submit' endIcon={<SendIcon />}>Send</Button>
  </form>
}

export default ChatForm;