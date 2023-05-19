import React from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { columns } from "./campaignsData";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Container maxW="80vw" mt={8}>
        <Table columns={columns} />
      </Container>
    </React.Fragment>
  );
}

export default App;
