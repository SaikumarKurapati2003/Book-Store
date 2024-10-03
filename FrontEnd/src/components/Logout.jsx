import React from 'react'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast'

const Logout = () => {
    const [authUser, setAuthUser] = useAuth()
    const handleLogout = () =>{
        try {
            setAuthUser({
                ...authUser,
                user:null
            })
            localStorage.removeItem("Users")
            toast.success("Logout Successfully")
            setTimeout(()=>{
              window.location.reload();
            },2000)
        } catch (error) {
            toast.error("Error: "+error.message);   
        }
    }
  return (
    <div>
      <button className='font-medium w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 duration-300 cursor-pointer' 
      onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Logout
