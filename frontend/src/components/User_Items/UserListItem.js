import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import { Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            backgroundColor="#eee"
            _hover={{
                backgroundColor: "white"
            }}
            width="100%"
            display={"flex"}
            alignItems="center"
            color={"black"}
            px={3}
            py={2}
            mb={2}
            borderRadius="1rem"
            border={"1px"}
            borderColor={'white'}
        >
            <Avatar
                mr={1}
                size="sm"
                cursor={"pointer"}
                name={user.name}
                email={user.email} />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs"><b>Email: </b>{user.email}</Text>
            </Box>
        </Box>)
}
export default UserListItem;