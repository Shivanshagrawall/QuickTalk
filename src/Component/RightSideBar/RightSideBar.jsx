import React from 'react'
import './RightSideBar.css'
import assets from '../../assets/assets'
import { logout } from '../../Config/firebase'
const RightSideBar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt="profile image" />
        <h3>Shivansh Ag <img src={assets.green_dot} className='dot' alt="dot" /></h3>
        <p>I am a Coder Software Engineer</p>
      </div>

      <hr />

      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="picture" />
          <img src={assets.pic2} alt="picture" />
          <img src={assets.pic3} alt="picture" />
          <img src={assets.pic4} alt="picture" />
          <img src={assets.pic1} alt="picture" />
          <img src={assets.pic2} alt="picture" />
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default RightSideBar