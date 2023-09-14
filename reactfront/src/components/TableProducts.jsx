import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { useState, useEffect } from "react";
import { Checkbox, IconButton } from "@mui/material";
import ModalUpdateForm from "./ModalUpdateForm";
import TablePagination from "@mui/material/TablePagination"; // Importa TablePagination

const getURL = "http://localhost:4000/api/products";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TableProducts({ datos }) {
  const [post, setPost] = useState([]);
  const [categories, setCategories] = useState({});
  const [activos, setActivos] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(0); // Estado para la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Estado para la cantidad de filas por página

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get(getURL);
      setPost(result.data);
      await getCategoryForProducts(result.data);

      const activosInicial = {};
      result.data.forEach((product) => {
        activosInicial[product.codigo] = true;
      });
      const activosInicialArray = Object.entries(activosInicial);
      for (let index = 0; index < activosInicialArray.length; index++) {
        await axios
          .put(getURL, {
            codigo: activosInicialArray[index][0],
            checked: activosInicialArray[index][1],
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
      setActivos(activosInicial);
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

  const isChecked = async (event, productCod) => {
    setActivos((prevActivos) => ({
      ...prevActivos,
      [productCod]: event.target.checked,
    }));
    await axios
      .put(getURL, {
        codigo: productCod,
        checked: event.target.checked,
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const filteredProducts = post.filter((product) =>
    Object.values(product).some((value) =>
      Object.keys(datos).every((key) => {
        if (
          datos[key] === "" ||
          datos[key] === undefined ||
          datos[key] === isNaN
        )
          return true;

        return (
          String(value).toLowerCase().includes(datos[key].toLowerCase()) ||
          String(value).toLowerCase() === datos[key].toLowerCase()
        );
      })
    )
  );

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer sx={{ marginBottom: "50px" }}>
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
            {paginatedProducts.length === 0 || !paginatedProducts ? (
              <TableRow
                key="codigo"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" colSpan={8}>
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
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
                      disabled={!activos[product.codigo]}
                      onClick={handleOpenUpdateModal}
                    >
                      <UpdateIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      onChange={(event) => isChecked(event, product.codigo)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalUpdateForm
        isOpen={isUpdateModalOpen}
        handleClose={handleCloseUpdateModal}
        handleOpen={handleOpenUpdateModal}
        products={post}
      />
    </div>
  );
}
