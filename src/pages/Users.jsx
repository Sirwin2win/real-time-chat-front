import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { refresh } from '../features/auth/authSlice'


const Users = () => {
  const dispatch = useDispatch()
  const {status,users,error} = useSelector(state=>state.auth)

  useEffect(()=>{
    if(status==='idle'){
      dispatch(refresh())
    }
  },[status,dispatch])
  return (
    <div>
        <h1 className='text-primary text-center'>All users</h1>
        {users.map(user=>(
          <div>{user.username}</div>
        ))}
        {/* {user.username} */}
    </div>
  )
}

export default Users