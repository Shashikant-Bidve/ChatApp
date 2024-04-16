import React from 'react'
import { ChatState } from '../../Context/ChatProvider.js';
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat.jsx';
const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState();
  return (
    <Box
    display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </Box>
  )
}

export default ChatBox