import React, { useState } from 'react'
import handleInputError from '../utils'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputError({ fullName, username, password, confirmPassword, gender }, ["fullName", "username", "password", "confirmPassword", "gender"])
    if (!success) return

    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
      })
      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // localstorage
      localStorage.setItem("chat-user", JSON.stringify(data))
      // context
      setAuthUser(data)

    } catch (error) {
      console.log("error", error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, signup }
}

export default useSignup