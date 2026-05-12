import { useState } from "react"
import { loginUser } from "../service/authService"

const useUserAuth = () =>{

  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(null)

  const login =  async (email_or_username , password) =>{
    try {
      setLoading(true)
      setError(null)
      const data = await loginUser({email_or_username , password})
      return data
    } catch (err) {
       setError(err.response?.data?.message || 'login faild')
      throw err
    } finally {
      setLoading(false);
    }
  }
  return {
    login,
    loading,
    error
  }

}

export default useUserAuth;