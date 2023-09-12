import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
// import axios from "axios";

// const putURL = "http://localhost:4000/api/products";

export default function ModalUpdateForm({ isOpen, handleClose }) {
  const initialState = {
    codigo: "",
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(initialState);
  };

  return (
    <div sx={{ width: "50%", height: "50%" }}>
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
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Codigo"
              placeholder="EJ:CP7773"
              type="text"
              sx={{ width: "100%", mb: 2 }}
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Nombre"
              placeholder="EJ:Tafirol"
              type="text"
              sx={{ width: "100%", mb: 2 }}
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Precio"
              placeholder="EJ:1374.99"
              type="number"
              sx={{ width: "100%", mb: 2 }}
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Stock"
              placeholder="EJ:32"
              type="number"
              sx={{ width: "100%", mb: 2 }}
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Categoria"
              placeholder="EJ:Ungüento"
              type="text"
              sx={{ width: "100%", mb: 2 }}
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            />
          </div>
          <Button
            variant="contained"
            sx={{ backgroundColor: "blue" }}
            type="submit"
          >
            Update Product
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
