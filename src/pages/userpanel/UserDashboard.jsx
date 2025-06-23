import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../features/auth/authSLice'

const UserDashboard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/') 
  }

  return (
    <>
      <h1 className='text-5xl font-bold text-center mt-10'>User Dashboard</h1>
      <button className='bg-blue-500 py-1 px-3 text-center' onClick={handleLogout}>Logout</button>
    </>
  )
}

export default UserDashboard
