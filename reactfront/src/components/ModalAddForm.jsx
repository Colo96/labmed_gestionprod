import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function ModalAddForm({ isOpen, handleClose }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: 24,
            p: 4,
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              type="text"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              type="text"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              type="text"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              type="text"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              type="text"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              type="text"
            />
          </div>
          <Button>Add Product</Button>
        </Box>
      </Modal>
    </div>
  );
}
