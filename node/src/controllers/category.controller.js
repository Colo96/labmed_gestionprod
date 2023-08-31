import { getConnection } from "./../database/database.js";

const getCategories = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM category");
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT nombre, descripcion, fecha_alta FROM category WHERE id = ?",
      id
    );
    if (!result) {
      res.status(400).json({
        message: "Bad request. Category not found",
      });
    }
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const category = {
      nombre,
      descripcion,
    };
    const result = await connection.query(
      "INSERT INTO category SET ?",
      category
    );
    console.log(result);
    res.json({
      message: "Category added",
      payload: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const { id } = req.params;
    if (!id || !nombre || !descripcion) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const category = {
      nombre,
      descripcion,
    };
    const result = await connection.query(
      "UPDATE category SET ? WHERE id = ?",
      [category, id]
    );
    console.log(result);
    res.json({
      message: "Category modified",
      payload: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Bad request. Please fill all fields",
      });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM category WHERE id = ?",
      id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
