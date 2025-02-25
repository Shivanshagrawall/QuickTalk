import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../Config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const [image,setImage]=useState(false);
  const [name,setName]=useState("");
  const [bio,setBio]=useState("");
  const [uid,setUid]=useState("");
  const [prevImage,setPrevImage]=useState("");
  const navigate=useNavigate();
  const {setUserData}=useContext(AppContext)
  

  const profileUpdate=async(event)=>{
    
    event.preventDefault();
    try {
      // Change this
      // if(!prevImage && !image){
      //   toast.error("Upload Profile Picture");
      // }
      const docRef=doc(db,"users",uid);

      // Change this
      // if(image){
      //   // const imgUrl=await upload(image);
      //   // setPrevImage(imgUrl);
      //   await updateDoc(docRef,{
      //     avatar:imgUrl,
      //     bio:bio,
      //     name:name
      //   })
      // }else{
      //   await updateDoc(docRef,{
      //     bio:bio,
      //     name:name
      //   })
      // }

      await updateDoc(docRef, {
        name: name,
        bio: bio,
        lastSeen: Date.now(),
      });
      
      toast.success("Profile updated successfully!");

      const snap=await getDoc(docRef);
      setUserData(snap.data());
      navigate('/chat');
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        setUid(user.uid);
        const docRef=doc(db,"users",user.uid);
        const docSnap=await getDoc(docRef);
        if(docSnap.data().name){
          setName(docSnap.data().name);
        }
        if(docSnap.data().bio){
          setBio(docSnap.data().bio);
        }
        if(docSnap.data().avatar){
          setPrevImage(docSnap.data().avatar);
        }
      }else{
        navigate('/');
      }
    })
  },[])

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden />
            <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="icon"/>
            Upload profile image
          </label>
          <input  onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Your Name' required/>
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='Write Profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={image  && image instanceof File ? URL.createObjectURL(image) : assets.logo_icon} alt="logo icon" />
      </div>
    </div>
  )
}

export default ProfileUpdate