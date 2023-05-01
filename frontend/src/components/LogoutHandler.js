import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutHook } from '../store/slice/ain1slice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LogoutHandler = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        dispatch(logoutHook);
        history.push("/");
    };

    return (
        <Box className="Logout-button" onClick={logoutHandler} >
            <i className="fa fa-sign-out" aria-hidden="true"></i><Text paddingLeft={"5px"} >Logout</Text>
        </Box>
    )
}

export default LogoutHandler