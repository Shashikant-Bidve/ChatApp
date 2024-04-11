import React, { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, ButtonGroup,useToast } from '@chakra-ui/react'
import {useHistory} from "react-router-dom"
import axios from "axios";

const Login = () => {

  const [show, setshow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = async () => {
    setLoading(true);
    if(!email || !password)
    {
        toast({
            title: "Please fill all the fields!",
            status: "warning",
            duration:"5000",
            isClosable: true,
            position:"bottom",
        });
        setLoading(false);
        return;
    }

    try {
        const config = {
            headers : {
                "Content-type" : "application/json"
            },
        };

        const {data} = await axios.post("api/user/login",{
        email, password
        },
    config);

    toast({
        title: "Login Successful!",
        status: "warning",
        duration:"5000",
        isClosable: true,
        position:"bottom",
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    history.push("/chats");

    } catch (error) {
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "warning",
            duration:"5000",
            isClosable: true,
            position:"bottom",
        });
        setLoading(false);
    }
  }

  return (
    <VStack spacing="5px" color="black">

        <FormControl id="email" isRequired >
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter your Email: ' value={email} onChange={(e)=>{setEmail(e.target.value)}}></Input>
        </FormControl>

        <FormControl id="password" isRequired >
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input type={show?"text":"password"} value={password} placeholder='Enter your Password: ' onChange={(e)=>{setPassword(e.target.value)}}></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={(e)=>{setshow((prev)=> !prev)}}> 
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button colorScheme='blue' width = "100%" style={{marginTop:15}} isLoading={Loading} onClick={()=>handleSubmit()}>Login</Button>
        <Button variant='solid' colorScheme='red' width = "100%" style={{marginTop:15}} onClick={()=>{setEmail("guest@example.com");setPassword("123456")}}>Guest User Login</Button>
    </VStack>
  )
}

export default Login