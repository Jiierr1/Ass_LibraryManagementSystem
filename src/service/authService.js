// import api  from "./api";
import axios from "axios";
const API_URL = "http://localhost:3000/api";
export const loginUser = async (data) => {
  const res = await api.post('/auth/login' , data)
  console.log(res.data.data)
  if(res.data.data.token){
    localStorage.setItem('token' , res.data.data.token)
  }
  return res.data.data
}