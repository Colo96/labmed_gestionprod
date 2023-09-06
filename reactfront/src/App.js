import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import TableWithFilter from "./components/TableWithFilter";

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ width: "100%" }}>
        <TableWithFilter />
      </Container>
    </>
  );
}

export default App;
