import { getConnection } from "./../database/database.js";
import { methods as categoryController } from "./category.controller.js";

const getProducts = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM products");
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT codigo, nombre, precio, stock, id_categoria, fecha_alta FROM products WHERE id = ?",
      id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const { codigo, nombre, precio, stock, id_categoria } = req.body;
    if (!codigo || !nombre || !precio || !stock || !id_categoria) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const product = {
      codigo,
      nombre,
      precio,
      stock,
      id_categoria,
    };
    const result = await connection.query(
      "INSERT INTO products SET ?",
      product
    );
    console.log(result);
    res.json({
      message: "Product added",
      payload: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { codigo, nombre, precio, stock, id_categoria } = req.body;
    const { id } = req.params;
    if (!id || !codigo || !nombre || !precio || !stock || !id_categoria) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const product = {
      codigo,
      nombre,
      precio,
      stock,
      id_categoria,
    };
    const result = await connection.query(
      "UPDATE products SET ? WHERE id = ?",
      [product, id]
    );
    console.log(result);
    res.json({
      message: "Product modified",
      payload: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM products WHERE id = ?",
      id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const setActivationValue = async (req, res) => {
  try {
    const { codigo, checked } = req.body;
    let activo = 0;
    if (checked === true) {
      activo = 1;
    }
    if (!codigo) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE products SET activo = ? WHERE codigo = ?",
      [activo, codigo]
    );
    console.log(result);
    res.json({
      message: "active value modified",
      payload: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setActivationValue,
};
