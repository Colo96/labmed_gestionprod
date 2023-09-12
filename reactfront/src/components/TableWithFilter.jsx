import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import TableProducts from "./TableProducts";
import Button from "@mui/material/Button";
import ModalAddForm from "./ModalAddForm";

export default function Inputs() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleFechaAltaChange = (event) => {
    setFechaAlta(event.target.value);
  };

  const datos = [codigo, nombre, precio, stock, categoria, fechaAlta];

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <Container sx={{ width: "100%" }}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField
          label="Codigo"
          sx={{ width: "12%" }}
          type="text"
          value={codigo}
          onChange={handleCodigoChange}
        />
        <TextField
          label="Nombre"
          sx={{ width: "12%" }}
          type="text"
          value={nombre}
          onChange={handleNombreChange}
        />
        <TextField
          label="Precio"
          sx={{ width: "12%" }}
          type="number"
          value={precio}
          onChange={handlePrecioChange}
        />
        <TextField
          label="Stock"
          sx={{ width: "12%" }}
          type="number"
          value={stock}
          onChange={handleStockChange}
        />
        <TextField
          label="Categoria"
          sx={{ width: "12%" }}
          type="text"
          value={categoria}
          onChange={handleCategoriaChange}
        />
        <TextField
          label="Fecha Alta"
          sx={{ width: "12%" }}
          type="date"
          value={fechaAlta}
          onChange={handleFechaAltaChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "blue" }}
          onClick={handleOpenAddModal}
        >
          Agregar
        </Button>
      </Box>
      <TableProducts datos={datos} />
      <ModalAddForm
        isOpen={isAddModalOpen}
        handleClose={handleCloseAddModal}
        handleOpen={handleOpenAddModal}
      />
    </Container>
  );
}
