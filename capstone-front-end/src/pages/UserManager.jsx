import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // This will be triggered when the component mounts
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Your MongoDB POST request logic goes here using axios
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/create",
        {
          username: username,
          email: email,
        }
      );

      // Handle the response as needed
      if (response.status === 200) {
        console.log("Data successfully sent to MongoDB");
      } else {
        console.error("Failed to send data to MongoDB");
      }
    } catch (error) {
      console.error("Error sending data to MongoDB:", error);
    }

    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nickel Nomad Budget Calculator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hello there! Thank you for using Nickel Nomad's Budget Calculator.
            Please enter your username and email to continue.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
