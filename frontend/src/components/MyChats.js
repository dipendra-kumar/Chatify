import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import { useLazyShowChatsQuery } from "../services/appService";
import { Avatar, Image, Input } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedChatData, getChatData } from "../store/slice/chatSlice";
import axios from "axios";
import { showTooster } from "../helpers/tooster";

import "./MyChats.css";
import UserListItem from "./User_Items/UserListItem";
import Search from "./Search";
import LogoutHandler from "./LogoutHandler";
import SideDrawer from "./misc/SideDrawer";
const MyChats = ({ fetchAgain }) => {

  const [loggedUser, setLoggedUser] = useState("");
  const [showChats, { data, isLoading, isSuccess, error, isError }] = useLazyShowChatsQuery();

  const userInfo = useSelector(state => state.getAin1Slice.getUserData);
  const selectedChat = useSelector(state => state.chatSlice.getSelectedChatData);
  const chats = useSelector(state => state.chatSlice.getChatData)
  const dispatch = useDispatch();
  const toast = useToast();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const fetchChats = async () => {
    const { data } = await showChats();
    dispatch(getChatData(data))
  }

  useEffect(() => {
    setLoggedUser(userInfo);
    if (!isLoading) {

    }
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain, isLoading]);

  return (
    <Box className="chat-outer-box" d={{ base: "flex", md: "flex" }} >
      <Search />

      {
        <Stack className="chats" overflowY="scroll" >
          {chats.length > 0
            ? chats.map((chat, index) => (
              <div key={index}>
                <Box className="chat-box" key={chat._id} backgroundColor={selectedChat === chat ? "#3182CE" : "white"} onClick={() => dispatch(getSelectedChatData(chat))}>
                  <Avatar
                    margin={"8px"}
                    size={"sm"}
                    name={getSender(loggedUser, chat.users)} />
                  <Box >
                    <Text color={selectedChat === chat ? "white" : "black"} fontSize={"medium"} >
                      <b>{getSender(loggedUser, chat.users)}</b>
                    </Text>
                    {chat.latestMessage && (
                      <Text display={"flex"} fontSize="sm" color={selectedChat === chat ? "white" : "grey"} >
                        {
                          chat.latestMessage.content.length > 50
                            ? chat.latestMessage.contentType !== "text" ? <span> <Image display={"flex"} height={"20px"} src="some random picture" /></span> : chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content
                        }{
                        }
                      </Text>
                    )}
                  </Box>
                </Box>
              </div>
            ))
            : <Box className="no-chats-found">
              <Text>
                No Chats Found
              </Text>
            </Box>
          }
        </Stack>
      }
    </Box>
  );
};

export default MyChats;
