import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";

const getURL = "http://localhost:4000/api/products";

export default function TableProducts() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await axios.get(getURL);
    setPost(result.data);
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
            <TableCell>Borrar</TableCell>
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
                  <TableCell>{product.id_categoria}</TableCell>
                  <TableCell>{product.fecha_alta}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                    />
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
