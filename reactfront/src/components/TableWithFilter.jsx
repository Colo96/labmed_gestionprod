import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { Container } from "@mui/material";
import TableProducts from "./TableProducts";
import Button from "@mui/material/Button";
import ModalAddForm from "./ModalAddForm";

const ariaLabel = { "aria-label": "description" };

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
        <Input
          placeholder="Codigo"
          inputProps={ariaLabel}
          sx={{ width: "12%" }}
          type="text"
          value={codigo}
          onChange={handleCodigoChange}
        />
        <Input
          placeholder="Nombre"
          inputProps={ariaLabel}
          sx={{ width: "12%" }}
          type="text"
          value={nombre}
          onChange={handleNombreChange}
        />
        <Input
          placeholder="Precio"
          inputProps={ariaLabel}
          sx={{ width: "12%" }}
          type="number"
          value={precio}
          onChange={handlePrecioChange}
        />
        <Input
          placeholder="Stock"
          inputProps={ariaLabel}
          sx={{ width: "12%" }}
          type="number"
          value={stock}
          onChange={handleStockChange}
        />
        <Input
          placeholder="Categoria"
          inputProps={ariaLabel}
          sx={{ width: "12%" }}
          type="text"
          value={categoria}
          onChange={handleCategoriaChange}
        />
        <Input
          placeholder="Fecha Alta"
          inputProps={ariaLabel}
          sx={{ width: "12%" }}
          type="date"
          value={fechaAlta}
          onChange={handleFechaAltaChange}
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
