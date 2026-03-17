import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/auth/authSlice'

const Users = () => {
  const dispatch = useDispatch()
  const { status, users, error } = useSelector(state => state.auth)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUsers())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <p className="text-center">Loading users...</p>
  }

  if (status === 'failed') {
    return <p className="text-danger text-center">{error}</p>
  }

  return (
    <div>
      <h1 className='text-primary text-center'>All Users</h1>

      {users && users.length > 0 ? (
        users.map(user => (
          <div key={user._id}>{user.username}</div>
        ))
      ) : (
        <p className="text-center">No users found</p>
      )}
    </div>
  )
}

export default Users