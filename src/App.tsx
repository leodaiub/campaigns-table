import { Fragment } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { columns } from "./data/campaignsData";
import { Button, Container, Flex } from "@chakra-ui/react";
import SearchInput from "./components/SearchInput";
import RangeDatePicker from "./components/DateRangePicker";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

function App() {
  const [updateDateRange, updateSearch] = useStore(
    (state) => [state.updateDateRange, state.updateSearch],
    shallow
  );

  const handleClearFilters = () => {
    updateSearch("");
    updateDateRange([undefined, undefined]);
  };

  return (
    <Fragment>
      <Navbar />
      <Container maxW="80vw" mt={8}>
        <Flex my={8} justifyContent="space-between">
          <SearchInput />
          <RangeDatePicker />
          <Button onClick={handleClearFilters}>Clear filters</Button>
        </Flex>
        <Table columns={columns} />
      </Container>
    </Fragment>
  );
}

export default App;
