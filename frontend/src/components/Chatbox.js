import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {

  return (
    <Box
      display={"flex"}
      alignItems="baseline"
      flexDir="column"
      p={3}
      bg="white"
      height={"100%"}
      w={{ base: "100%", md: "68%" }}
      borderRadius="1rem"
      borderWidth="2px"
      paddingTop={0}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
