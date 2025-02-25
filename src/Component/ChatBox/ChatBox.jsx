import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.profile_img} alt="profile image" />
        <p>Shivansh Agrawal <img src={assets.green_dot} alt="online" className='dot' /></p>
        <img src={assets.help_icon} alt="help icon" className='help'/>
      </div>

      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, beatae?</p>
          <div>
            <img src={assets.profile_img} alt="profile img" />
            <p>2:30 AM</p>
          </div>
        </div>

        <div className="s-msg">
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
        </div>
      </div>


      <div className="chat-input">
        <input type="text" placeholder='Send a message' />
        <input type="file" id="image" accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery icon" />
        </label>
        <img src={assets.send_button} alt="send button" />
      </div>
    </div>
  )
}

export default ChatBox