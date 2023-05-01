import React from "react";
import { Box, Text, } from "@chakra-ui/layout";
import { Avatar, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "./SideDrawer.css"

import LogoutHandler from "../LogoutHandler";

const SideDrawer = () => {
  const userInfo = useSelector(state => state.getAin1Slice.getUserData);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        className="top-header-box"
      >
        <Box className="user-info">
          <Button padding={"5px"} borderRadius={"1rem"} onClick={handleOpen}>
            <Avatar className="user-info-Avatar"
              size={"sm"}
              name={userInfo.name} /><Text>{userInfo.name}</Text>
          </Button>
          {open ? (
            <ul className="menu">
              <li className="menu-item">
                <button>Profile</button>
              </li>
              <li className="menu-item">
                <LogoutHandler />
              </li>
            </ul>
          ) : null}

        </Box>
      </Box>
    </>
  );
};

export default SideDrawer;
