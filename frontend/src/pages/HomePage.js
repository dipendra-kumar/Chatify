import React, { useEffect } from "react";
import {
  Container,
  Box,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" marginTop="20vh" centerContent>
      <Box bg="aliceblue" w="90%" p="4" borderRadius="lg" borderWidth="1px">
        <Tabs variant="solid-rounded" colorScheme="green">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
