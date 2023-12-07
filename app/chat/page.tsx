'use client'
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
import ChatHeader from "@/app/components/chatComp/chatHeader"
import ChatContent from "../components/chatComp/chatContent";
// import { messages, conversations } from "../components/chatComp/messages";
import ChatInput from "../components/chatComp/chatInput";
import ConversComp from "../components/chatComp/conversComp";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import store from "../store/store";
import { useDispatch } from "react-redux";
import { fetchChatData } from "../Slices/chatSlice";
import { useCookies } from 'react-cookie';
import { messages } from "../components/chatComp/messages";
import { socket } from "../components/chatComp/socket";
import { BiConversation } from "react-icons/bi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { PropagateLoader } from "react-spinners";


import axios from "axios";

export interface Message {
  avatar: string,
  content: string;
  sender: string;
  isOwner: boolean;
  conversationId? : string;
}

export interface Conversation {
  id: number;
  online: boolean;
  username: string;
  avatar: string;
  owner:string;
  timestamp?: number;
  messages: Message[];
  conversationId? : string;
}

export default function chat() {
  const dispatch = useDispatch<AppDispatch>();
  const conversations: Conversation[] = useSelector((state: RootState) => state.chat?.entity);
  const loading: boolean = useSelector((state: RootState) => state.chat?.loading);
  const [selectedConv, setSelectedConv] = useState<Conversation[]>(conversations);
  const [showConversations, setShowConversations] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [selectConvId, setSelectConvId] = useState<number>(0);

  useEffect(() => {
    // console.log("test")
    // console.log('Dispatching fetchChatData...');
    dispatch(fetchChatData());
  }, [])

  useEffect(() => {
    setSelectedConv(conversations)
  }, [conversations])

  useEffect(() => {
    socket.on('RecieveMessage', (data: Message) => {
      
      if (data.conversationId) {
        const timestamp = Date.now();
        
        const existingConversation: Conversation | undefined = selectedConv.find(
          (conversation) => conversation.username === data.sender
          );
          console.log(data.conversationId);
          console.log(existingConversation);
          
          console.log('got event ==> ', existingConversation);

          if (existingConversation ) {
            setSelectedConv((prevConversations) =>
            prevConversations.map((conversation) =>
            conversation.id === existingConversation.id
            ? {
              ...existingConversation,
              timestamp,
              messages: [...existingConversation.messages, data],
            }
            : conversation
            )
            );
          }
        }
    });
  
    return () => {
      socket.off('RecieveMessage');
    };
  }, [selectedConv]); 
  
  // const [allMessages, setAllMessages] = useState<Message[]>(selectedConv[0].messages);

  
  
  // console.log(allMessages);
  const handleSendMessage = (newMessage: string) => {
    if (selectConvId !== null) {
      const timestamp = Date.now();
      const updatedConversations = selectedConv.map((conversation: any) =>
        conversation.id === selectConvId
          ? {
              ...conversation,
              timestamp: timestamp,
              messages: [
                ...conversation.messages,
                {
                  avatar: conversation.avatar,
                  content: newMessage,
                  sender: conversation.owner,
                  isOwner: true,
                },
              ],
            }
          : conversation
      );

      setSelectedConv(updatedConversations);
      
    // const newChatMessage: Message = {
    //   avatar:"",
    //   text: newMessage,
    //   sentBy: 'owner',
    //   isChatOwner: true,
    // };
    // setAllMessages((prevMessages) => [...prevMessages, newChatMessage]);
    }
  }
  if (loading)
    return (<>
      <div className="text-white flex flex-col justify-center items-center w-full h-[90%]">
        <div className="h-16 w-full Large:h-24"><Navbar pageName="chat"/></div>
        <div className="m-auto text-xl">
          <div className="p-3 ">LOADING</div>
          <div className="p-3 ml-9"><PropagateLoader color={"#E58E27"} loading={loading} size={20} aria-label="Loading Spinner"/></div>
        </div>
      </div>

    </>)

  const sortedConversations = selectedConv.slice().sort((a, b) => {
    const timestampA = a.timestamp || 0;
    const timestampB = b.timestamp || 0;
    return timestampB - timestampA;
  });

  return (
          <div className="flex flex-col justify-between items-center h-screen min-h-screen min-w-screen">
            <div className="h-16 w-full Large:h-24"><Navbar pageName="chat"/></div>
            <div className="h-[80%] min-h-[600px] medium:min-h-[700px] m-auto w-[410px] medium:w-[80%] mt-11">
              <div className="w-full h-[90%] xMedium:h-full flex xMedium:flex xMedium:justify-between xMedium:items-center ">
                <div id="id_1" className={`${showConversations ? 'flex' : 'hidden'} h-full w-full xMedium:flex flex-col bg-[#323232] xMedium:w-[30%] rounded-xl`}>
                  <div className="h-20 py-3 w-full border-b rounded-t-lg border-b-[#E58E27]">My conversations</div>
                  <div className="xMedium:h-[75%] h-full w-full bg-[#323232] overflow-y-auto scrollbar-hide rounded-b-xl xMedium:rounded-xl">
                      {sortedConversations.map((conversation: Conversation) => (
                        <div key={conversation.id} className="h-20 w-full xMedium:bg-opacity-20 xMedium:bg-white shadow-sm xMedium:shadow-white">
                          <button
                          
                          onClick={() => {setSelectConvId(conversation.id); setShowConversations(false);}}
                          className="xMedium:w-full xMedium:h-full xMedium:bg-white xMedium:bg-opacity-10 transition duration-500 ease-in-out hover:text-orange-500 hover:bg-opacity-100"
                          ><ConversComp conversation={conversation}/>
                          </button>
                        </div>
                      ))}

                  </div>
                </div>
                { (<div id="id_2" className={`${showConversations ? 'hidden' : 'flex'} flex-col xMedium:block w-full h-full xMedium:w-[60%] bg-[#323232] rounded-xl`}>
                  <ChatHeader name="Nems"/>
                  <ChatContent messages={selectedConv.find((conversation) => conversation.id === selectConvId)?.messages || []}/>
                  <ChatInput onSendMessage={handleSendMessage} conversation={sortedConversations.find((conversation) => conversation.id === selectConvId) as Conversation}/>
                </div>)}
              </div>
                <div className="xMedium:hidden mt-4 w-full flex shadow-sm border border-[#E58E27] rounded-xl shadow-[#E58E27] ">
          <button onClick={() => setShowConversations(true)} className={`w-1/2 py-2 ${showConversations ? 'bg-[#E58E27] text-white' : 'hover:bg-[#cacaca] hover:bg-opacity-10 text-white'} text-3xl  transition duration-500 flex ease-in-out rounded-l-xl`}><span className="text-center m-auto"><BiConversation /></span>
</button>
          <button onClick={() => setShowConversations(false)} className={`w-1/2 py-2 ${!showConversations ? 'bg-[#E58E27] text-white' : 'hover:bg-[#cacaca] hover:bg-opacity-10 text-white'} text-3xl  transition duration-500 flex ease-in-out rounded-r-xl`}><span className="text-center m-auto"><BiSolidMessageSquareEdit /></span>
</button>
        </div>
            </div>
          </div>

  )
}