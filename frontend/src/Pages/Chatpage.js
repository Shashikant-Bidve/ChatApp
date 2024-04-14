import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ChatState } from '../Context/ChatProvider.js';
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/Miscelleneous/SideDrawer.jsx';
import MyChats from '../components/Miscelleneous/MyChats.jsx';
import ChatBox from '../components/Miscelleneous/ChatBox.jsx';

const Chatpage = () => {
    const { user } = ChatState();
    // const [chats,setChats] = useState([]);

    // const fetchChats = async () => {
    //     const {data} = await axios.get("/api/chat");
    //     setChats(data);
    // }

    // useEffect(()=>{
    //     fetchChats();
    // },[]);

  return (
    <div style={{width: "100%"}}>
        {user && <SideDrawer/>}
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </Box>
    </div>
  )
}

export default Chatpage