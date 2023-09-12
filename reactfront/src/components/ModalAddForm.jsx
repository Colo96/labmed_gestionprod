import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";

const postURL = "http://localhost:4000/api/products";

export default function ModalAddForm({ isOpen, handleClose }) {
  const createProducts = async () => {
    try {
      await axios.post(postURL, {});
    } catch (error) {
      console.log(error);
    }
  };
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
            width: "300px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Codigo"
              placeholder="EJ:CP7773"
              type="text"
              sx={{ width: "100%", mb: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Nombre"
              placeholder="EJ:Tafirol"
              type="text"
              sx={{ width: "100%", mb: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Precio"
              placeholder="EJ:1374.99"
              type="number"
              sx={{ width: "100%", mb: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Stock"
              placeholder="EJ:32"
              type="number"
              sx={{ width: "100%", mb: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Categoria"
              placeholder="EJ:Ungüento"
              type="text"
              sx={{ width: "100%", mb: 2 }}
            />
          </div>
          <Button
            variant="contained"
            sx={{ backgroundColor: "blue" }}
            onClick={createProducts}
          >
            Create Product
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
