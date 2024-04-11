import React, { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, ButtonGroup } from '@chakra-ui/react'


const Signup = () => {

  const [show, setshow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const postDetails = (pic) => {

  }

  const handleSubmit = ( ) => {

  }

  
  return (
    <VStack spacing="5px" color="black">
        <FormControl id="first-name" isRequired >
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter your name: ' onChange={(e)=>{setName(e.target.value)}}></Input>
        </FormControl>

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

        <FormControl id="password" isRequired >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input type={show?"text":"password"} placeholder='Confirm Password: ' onChange={(e)=>{setConfirmPassword(e.target.value)}}></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={(e)=>{setshow((prev)=> !prev)}}> 
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="pic">
            <FormLabel>Upload your Profile image</FormLabel>
            <Input type='file' p = "1"  accept='image/*' onChange={(e)=>{
                return postDetails(e.target.files[0]);
            }}></Input>
        </FormControl>

        <Button colorScheme='blue' width = "100%" style={{marginTop:15}} onSubmit={handleSubmit}> Sign Up</Button>

    </VStack>
  )
}

export default Signup