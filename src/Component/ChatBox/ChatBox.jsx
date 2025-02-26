import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../Config/firebase'

const ChatBox = () => {

  const {userData,messagesId,chatUser,messages,setMessages,chatVisible,setChatVisible}=useContext(AppContext);
  const [input,setInput]=useState("");

  const sendMessage=async()=>{
    try {
      if(input && messagesId){
        await updateDoc(doc(db,"messages",messagesId),{
          messages:arrayUnion({
            sId:userData.id,
            text:input,
            createdAt:new Date()
          })
        })

        const userIDs=[chatUser.rId,userData.id];
        userIDs.forEach(async (id)=>{
          const userChatsRef=doc(db,'chats',id);
          const userChatsSnapShot=await getDoc(userChatsRef);

          if(userChatsSnapShot.exists()){
            const userChatData=userChatsSnapShot.data();
            const chatIndex=userChatData.chatsData.findIndex((c)=>c.messageId===messagesId);
            userChatData.chatsData[chatIndex].lastMessage=input.slice(0,30);
            userChatData.chatsData[chatIndex].updatedAt=Date.now();
            if(userChatData.chatsData[chatIndex].rId === userData.id){
              userChatData.chatsData[chatIndex].messageSeen=false;
            }
            await updateDoc(userChatsRef,{
              chatsData:userChatData.chatsData
            })
          }
        })
      }
    } catch (error) {
      toast.error(error.message);
    }
    setInput("");
  }

  const convertTimeStamp=(timestamp)=>{
    let date=timestamp.toDate();
    const hour=date.getHours();
    const minute=date.getMinutes();
    if(hour>12){
      return hour-12 + ":" + minute + "PM";
    }else{
      return hour + ":" + minute +"AM";
    }
  }

  useEffect(()=>{
    if(messagesId){
      const unSub=onSnapshot(doc(db,"messages",messagesId),(res)=>{
        setMessages(res.data().messages.reverse());
        
      })
      return ()=>{
        unSub();
      }
    }
  },[messagesId])

  return chatUser ? (
    <div className={`chat-box ${chatVisible ? "" : "hidden"}`}>
      <div className="chat-user">
        <img src={assets.profile_img} alt="profile image" />
        <p>{chatUser.userData.name} {Date.now()-chatUser.userData.lastSeen <= 70000 ? <img src={assets.green_dot} alt="online" className='dot' />:""}</p>
        <img src={assets.help_icon} alt="help icon" className='help'/>
        <img onClick={()=>setChatVisible(false)} src={assets.arrow_icon} alt="arrow icon" className='arrow' />
      </div>

      <div className="chat-msg">

        {messages.map((msg,index)=>(
          <div key={index} className={msg.sId === userData.id ? "s-msg":"r-msg"}>
          <p className="msg">{msg.text}</p>
          <div>
            <img src={assets.profile_img} alt="profile img" />
            <p>{convertTimeStamp(msg.createdAt)}</p>
          </div>
        </div>
        ))}

        

        {/* <div className="s-msg">
          <img src={assets.pic1} alt="picture 1" className='msg-img' />
          <div>
            <img src={assets.profile_img} alt="profile img" />
            <p>2:30 AM</p>
          </div>
        </div>

        <div className="r-msg">
          <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, beatae?</p>
          <div>
            <img src={assets.profile_img} alt="profile img" />
            <p>2:30 AM</p>
          </div>
        </div> */}


      </div>


      <div className="chat-input">
        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Send a message' />
        <input  type="file" id="image" accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery icon" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="send button" />
      </div>
    </div>
  ):
  <div className={`chat-welcome ${chatVisible ? "" : "hidden"}`}>
    <img src={assets.logo_icon} alt="logo" />
    <p>Chat anytimes, anywhere</p>
  </div>
}

export default ChatBox