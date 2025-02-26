import React, { useContext } from 'react'
import './RightSideBar.css'
import assets from '../../assets/assets'
import { logout } from '../../Config/firebase'
import { AppContext } from '../../context/AppContext'
const RightSideBar = () => {

  const {chatUser,messages}=useContext(AppContext);

  return  chatUser ?  (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt="profile image" />
        <h3>{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src={assets.green_dot} className='dot' alt="dot" />:""} </h3>
        <p>{chatUser.userData.bio}</p>
      </div>

      <hr />

      <div className="rs-media">
        <p>Media</p>
        <div>
          {/* <img src={assets.pic1} alt="picture" />
          <img src={assets.pic2} alt="picture" />
          <img src={assets.pic3} alt="picture" />
          <img src={assets.pic4} alt="picture" />
          <img src={assets.pic1} alt="picture" />
          <img src={assets.pic2} alt="picture" /> */}
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  ):(
    <div className='rs'>
      <button onClick={()=>logout()}>LogOut</button>
    </div>
  )
}

export default RightSideBar