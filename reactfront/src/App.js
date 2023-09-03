import TableProducts from "./components/TableProducts";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ width: "100%" }}>
        <TableProducts />
      </Container>
    </>
  );
}

export default App;
