import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const Navigate=useNavigate();
  const options={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }
  const [values,setValues]=useState({
    username:"",
    password:"",
  })

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      Navigate('/chat')
    }
  },[])

  const handleChange=(event)=>{
      const {name,value}=event.target
      setValues({...values,[name]:value})
  }
  const handelSubmit=async(event)=>{
    event.preventDefault();
    if(handleValidation(values))
    {
      const {data}=await axios.post("URL",values);
      if(data.status=== false){
        toast.error(data.msg,options)
      }
      else{
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        Navigate("/chat")
      }
    }
  }
  const handleValidation=(event)=>{
    const {password,username}=event;
    if(password.trim().length==="")
    {
      toast.error("username and password is required",options);
      return false;
    }
    else if(username.trim()==="")
    {
      toast.error("username and password is required",options);
      return false;
    }
    return true;
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handelSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt="Logo" />
            <h1>Snappy</h1>
          </div>
          <input type="text" placeholder='Username' name="username" onChange={e=>handleChange(e)}/>
          <input type="password" placeholder='Password' name="password" onChange={e=>handleChange(e)}/>
          <button type="submit">Create User</button>
          <span>
            Don't have an account ? <Link to="/">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer=styled.div`
    height: 100vh;
    width: 100 vw;
    display: flex;//
    flex-direction: column;//
    justify-content: center;//
    gap: 1rem;
    align-items: center;//
    background-color: #131324;
    .brand {
      display: flex;
      align-items:center;
      gap: 1rem;
      justify-content:center;
      img{
        height: 5rem;
      }
      h1{
        color:white;
        text-transform: uppercase;
      }
    }
    form{
      display:flex;
      flex-direction: column;
      gap:2rem;
      background-color: #00000076;
      border-radius: 2rem;
      padding: 3rem 5rem;
      input{
        background-color:transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width:100%;
        font-size: 1rem;
        &:focus{
          border: 0.1rem solid #997af0;
          outline: none;//
        }
      }
      button{
        background-color: #997af0;
        color:white;
        padding: 1rem 2rem;
        border:none;
        font-weight: bold;
        cursor:pointer;
        border-readius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
          background-color: #4e0eff;
        }
      }
      span{
        color: white;
        text-transform: uppercase;
        a{
          color:#420eff;
          text-decoration:none;
          font-weigth:bold;
        }        
      }
    }
`;
export default Login;
