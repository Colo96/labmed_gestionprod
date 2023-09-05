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
import { Checkbox, IconButton } from "@mui/material";

const getURL = "http://localhost:4000/api/products";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TableProducts() {
  const [post, setPost] = useState([]);
  const [categories, setCategories] = useState({});
  const [producto, setProducto] = useState({});
  const [activo, setActivo] = useState(null);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const isChecked = async (event, productId) => {
    event.preventDefault();
    console.log(productId);

    const tableRow = document.getElementById(`${productId}`);
    console.log(`Linea de la tabla: ${tableRow}`);

    const res = await getProduct(productId);
    if (res !== null) {
      console.log(res.data);
      setProducto(res.data);
      console.log(event.target.checked);
      setActivo(event.target.checked);
    }
  };

  const getProduct = async (id) => {
    try {
      const result = await axios.get(`${getURL}/${JSON.stringify(id)}`);
      return result;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return null;
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
            <TableCell>Activo</TableCell>
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
                <TableCell>Empty</TableCell>
              </TableRow>
            ) : (
              post.map((product) => (
                <TableRow
                  key={product.codigo}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  id={JSON.stringify(product.id)}
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
                      disabled={false}
                    >
                      <UpdateIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      onChange={(event) => isChecked(event, product.id)}
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
