// ChatForm.jsx
import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
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

  return (
    <Box
      component="form"
      sx={{
        zIndex:2000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        padding: "8px",
        borderTop: "1px solid #ddd",
        borderRadius: "0px 0px 10px 10px"
      }}
      onSubmit={(e) => {
        e.preventDefault();
        props.handleFormSubmit(sentData);
        setFormData("");
      }}
    >
      <TextField
        className="chatform"
        type="text"
        value={formData}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        size="small"
      />
<IconButton type="submit" color="primary" aria-label="Send message">
  <SendIcon />
</IconButton>
    </Box>
  );
};

export default ChatForm;