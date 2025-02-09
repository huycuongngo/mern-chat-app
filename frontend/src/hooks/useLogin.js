import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import handleInputError from '../utils'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async (username, password) => {
    const success = handleInputError({ username, password }, ["username", "password"])
    if (!success) return

    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      // localStorage
      localStorage.setItem('chat-user', JSON.stringify(data))
      // context
      setAuthUser(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin