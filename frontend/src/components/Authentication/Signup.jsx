import React, { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, ButtonGroup,useToast } from '@chakra-ui/react'
import axios from "axios";
import {useHistory} from "react-router-dom"


const Signup = () => {

  const [show, setshow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const postDetails = (pics) => {
    setLoading(true);
    if(pics === undefined){
        toast({
            title: "Please select an image!",
            status: "warning",
            duration:"5000",
            isClosable: true,
            position:"bottom",
        });
        return;
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png"){
        const data = new FormData();

        data.append("file", pics);
        data.append("upload_preset","ChatApp");
        data.append("cloud_name","dsxcigtki");

        fetch("https://api.cloudinary.com/v1_1/dsxcigtki/image/upload",{
            method:"post",
            body: data,
        }).then((res)=> res.json())
        .then((data) => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        })
    }else{
        toast({
            title: "Please select an image!",
            status: "warning",
            duration:"5000",
            isClosable: true,
            position:"bottom",
        });
        return;
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword)
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
    if(password !== confirmPassword){
        toast({
            title: "Passwords do not match!",
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

        const {data} = await axios.post("api/user",{
            name, email, password, pic
        },
    config);

    toast({
        title: "Registration Successful!",
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
            postDetails(e.target.files[0]);
            }}></Input>
        </FormControl>

        <Button colorScheme='blue' width = "100%" style={{marginTop:15}} onClick={()=>handleSubmit()}
        isLoading={Loading}> Sign Up</Button>

    </VStack>
  )
}

export default Signup;

// https://api.cloudinary.com/v1_1/{dsxcigtki}/image/upload