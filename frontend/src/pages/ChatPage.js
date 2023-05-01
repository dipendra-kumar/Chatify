import { React, useState } from "react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/misc/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";
import { useSelector } from "react-redux";


const ChatPage = () => {
  const user = useSelector(state => state.getAin1Slice.getUserData);
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="87%"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
