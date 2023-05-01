import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useLoginMutation } from "../../services/appService";
import { showTooster } from "../../helpers/tooster";
import constants from "../../config/constants";
import { getUserHook } from "../../store/slice/ain1slice";
import { useDispatch } from "react-redux";


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data, isLoading, isSuccess, error, isError }] =
    useLoginMutation();


  const passwordState = () => setShowPassword(!showPassword);

  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      showTooster({
        toast,
        message: constants.LOGINSUCCESSMESSAGE,
        status: "success",
      });
      history.push("/chats");
    }
    if (isError) {
      showTooster({
        toast,
        message: error.message,
        status: "error",
      });
    }
  }, [isSuccess, isError]);

  const submitHandler = async () => {
    if (!email || !password) {
      showTooster({
        toast,
        message: "Please fill all the fields!",
        status: "warning",
      });
      return;
    }
    let data1 = {
      email: email,
      password: password,
    };
    const { data } = await login({ data: data1 });
    dispatch(getUserHook(data))
    localStorage.setItem("userInfo", data.token)
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={passwordState}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="green"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
