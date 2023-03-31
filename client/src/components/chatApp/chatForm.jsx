// ChatForm.jsx
import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatForm = function (props) {
  const [formData, setFormData] = useState("");

  const handleChange = function (e) {
    setFormData(e.target.value);
  };

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
      }}
      onSubmit={(e) => {
        e.preventDefault();
        props.handleFormSubmit(formData);
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
      <Button type="submit" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  );
};

export default ChatForm;