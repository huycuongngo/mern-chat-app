import toast from "react-hot-toast"

const handleInputError = (fields, requiredFields) => {
  for (const field of requiredFields) {
    if (!fields[field]) {
      toast.error("Please fill in all fields")
      return false
    }
  }

  if (fields?.password && fields?.confirmPassword && fields?.password !== fields?.confirmPassword) {
    toast.error("Passwords do not match")
    return false
  }

  if (fields?.password && fields?.password?.length < 6) {
    toast.error("Password must be at least 6 characters")
    return false
  }

  return true
}

export default handleInputError