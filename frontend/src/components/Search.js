import React, { useState } from 'react'
import { Box, useToast, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { showTooster } from '../helpers/tooster';
import UserListItem from './User_Items/UserListItem';
import { ChatState } from '../Context/ChatProvider';
import { getSelectedChatData } from '../store/slice/chatSlice';

const Search = () => {
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState();
    const [label, setLabel] = useState(null);
    const userInfo = useSelector(state => state.getAin1Slice.getUserData);
    const { chats, setChats } = ChatState();
    const [loggedUser, setLoggedUser] = useState(userInfo);


    const toast = useToast();
    const dispatch = useDispatch();
    const handleSearch = async (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            if (search.trim() == "") {
                setSearchResult([])
                setLabel(null)
                return;
            }
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedUser.token}`,
                    },
                };
                const { data } = await axios.post(
                    `http://10.8.10.59:5002/api/user/search`,
                    { search, _id: loggedUser._id },
                    config
                );
                setSearchResult(data);
                if (data.length > 0) {
                    setLabel("Search Results")
                }
                else {
                    setLabel("Not Found!")
                }

            } catch (error) {
                showTooster({
                    toast,
                    message: "Failed to fetch user.",
                    status: "error",
                });
            }
        }
    }

    const accessChat = async (userID) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post(
                "http://10.8.10.59:5002/api/chats",
                { userID },
                config
            );

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            dispatch(getSelectedChatData(data));
            setSearchResult(null)
            setLabel(null)
        } catch (error) {
            console.log(error)
            showTooster({
                toast,
                message: "Failed to fetch chats",
                status: "error",
            });
        }
    };

    return (<Box>
        <form >
            <input type="search" placeholder="Search..." onChange={(e) => {
                setSearch(e.target.value)

            }}
                onKeyDown={handleSearch}></input>
            <i className="fa fa-search search" aria-hidden="true"></i>
        </form>
        <Box className='Search-Result' display={label ? "flex" : "none"} ><Text fontWeight={'bold'} fontSize={"20px"} padding={"5px"} >{label}</Text>{
            searchResult?.map((user) => (
                <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                />))
        }
        </Box>
    </Box>
    )
}

export default Search