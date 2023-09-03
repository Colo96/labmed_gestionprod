import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";

const getURL = "http://localhost:4000/api/products";

export default function TableProducts() {
  const [post, setPost] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    getProducts();
  });

  const getProducts = async () => {
    try {
      const result = await axios.get(getURL);
      setPost(result.data);
      await getCategoryForProducts(result.data);
    } catch (error) {
      throw error;
    }
  };

  const getCategoryForProducts = async (products) => {
    try {
      const categoryIds = new Set(
        products.map((product) => product.id_categoria)
      );
      const categoryData = {};

      for (const categoryId of categoryIds) {
        const result = await axios.get(
          `http://localhost:4000/api/categories/${categoryId}`
        );
        categoryData[categoryId] = result.data[0];
      }

      setCategories(categoryData);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Fecha Alta</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post ? (
            post.length === 0 ? (
              <TableRow
                key="codigo"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Empty
                </TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
              </TableRow>
            ) : (
              post.map((product) => (
                <TableRow
                  key={product.codigo}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.codigo}
                  </TableCell>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell>{product.precio}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {categories[product.id_categoria]
                      ? categories[product.id_categoria].nombre
                      : "Categoría desconocida"}
                  </TableCell>
                  <TableCell>{product.fecha_alta}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="update product"
                      size="large"
                    >
                      <UpdateIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
