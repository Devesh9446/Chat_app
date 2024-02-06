import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {Buffer} from 'buffer'

function SetAvatar() {
    const navigate =useNavigate();
    const api=`https://api.multiavatar.com/4645646`;
    const [isLoading,SetisLoading]=useState(true)
    const [avatars,Setavatars] =useState([])
    const [selectedAvatar,setSelectedAvatar]=useState(undefined)
    const options = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user"))
        navigate("/login");
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                try {
                    const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = Buffer.from(response.data);
                    data.push(buffer.toString("base64"));
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
            Setavatars(data);
            SetisLoading(false);
        };
        fetchData();
    }, []);

    const setProfilePicture=async()=>{
        if(handleValidation())
        {
            const user=await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post("URL",{image:avatars[selectedAvatar]})
            if(data.status===true)
            {
                user.isAvatarSelected=true;
                user.AvatarImage=data.image
                navigate("/chat")
            }
            else{
                toast.error("something went wrong in setting up the avatar select again",options)
            }
        }
    }
    const handleValidation=()=>{
        if(selectedAvatar===undefined)
        {
            toast.error("Select an Avatar",options)
            return false
        }
        return true;
    }

    return (
        <>
        {isLoading ? (
            <Container>
            <img src={Loader} alt="loader" className="loader" />
            </Container>
        ) : (
            <Container>
            <div className="title-container">
                <h1>Pick an Avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {avatars.map((avatar, index) => {
                return (
                    <div
                    className={`avatar ${
                        selectedAvatar === index ? "selected" : ""
                    }`}
                    key={index}
                    >
                    <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        key={avatar}
                        onClick={() => setSelectedAvatar(index)}
                    />
                    </div>
                );
                })}
            </div>
            <button onClick={setProfilePicture} className="submit-btn">
                Set as Profile Picture
            </button>
            <ToastContainer />
            </Container>
        )}
      </>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar
