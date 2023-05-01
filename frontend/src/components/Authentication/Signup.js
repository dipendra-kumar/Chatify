import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";
import { useSignupMutation } from "../../services/appService";
import { showTooster } from "../../helpers/tooster";
import constants from "../../config/constants";
import { getUserHook } from "../../store/slice/ain1slice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [signup, { data, isLoading, isSuccess, error, isError }] = useSignupMutation();


  const passwordState = () => setShowPassword(!showPassword);
  const confirmPasswordState = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      showTooster({
        toast,
        message: constants.SIGNUPSUCCESSMESSAGE,
        status: "success",
      });
      history.push("/chats");
    }
    if (isError) {
      showTooster({
        toast,
        message: "Something went wrong.",
        status: "error",
      });
    }
  }, [isSuccess, isError]);

  const submitHandler = async () => {
    let data1 = { name, email, password, confirmPassword };
    const { data } = await signup({ data: data1 });
    dispatch(getUserHook(data))
    localStorage.setItem("userInfo", data.token)
  };

  return (
    <VStack spacing="8px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          borderColor="green"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={confirmPasswordState}>
              {showConfirmPassword ? "Hide" : "Show"}
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
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;
