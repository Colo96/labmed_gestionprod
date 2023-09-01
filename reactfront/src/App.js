import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:4000/api/products";

function App() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await axios.get(baseURL);
    setPost(result.data);
  };

  return (
    <>
      <div>{post}</div>
    </>
  );
}

export default App;
