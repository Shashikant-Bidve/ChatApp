import React, { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, ButtonGroup } from '@chakra-ui/react'

const Login = () => {

  const [show, setshow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = ( ) => {

  }

  return (
    <VStack spacing="5px" color="black">

        <FormControl id="email" isRequired >
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter your Email: ' onChange={(e)=>{setEmail(e.target.value)}}></Input>
        </FormControl>

        <FormControl id="password" isRequired >
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input type={show?"text":"password"} placeholder='Enter your Password: ' onChange={(e)=>{setPassword(e.target.value)}}></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={(e)=>{setshow((prev)=> !prev)}}> 
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button colorScheme='blue' width = "100%" style={{marginTop:15}} onSubmit={handleSubmit}>Login</Button>
        <Button variant='solid' colorScheme='red' width = "100%" style={{marginTop:15}} onSubmit={()=>{setEmail("guest@example.com");setPassword("123456")}}>Guest User Login</Button>
    </VStack>
  )
}

export default Login