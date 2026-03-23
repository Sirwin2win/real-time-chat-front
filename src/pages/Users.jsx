import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers,setPage  } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import avatar from '../assets/images/avatar.png'


const Users = () => {
  const dispatch = useDispatch()
  const { status, users, error, page, pages } = useSelector(state => state.auth)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUsers(page))
    }
  }, [status, dispatch, page])

  console.log(users)

  // if (status === 'loading') {
  //   return <p className="text-center">Loading users...</p>
  // }

  // if (status === 'failed') {
  //   return <p className="text-danger text-center">{error}</p>
  // }

  const nextPage = () => {
    if (page < pages) {
      dispatch(setPage(page + 1));
    }
  };

  const prevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  return (
     <div className='container'>
      {/* <h2>Users</h2> */}
      <div className="row">


      {users && users.map((user)=>(
        <div key={user._id} className='col-sm-4'>
          <div className="card" style={{width: '18rem'}}>
  <img src={avatar} className="card-img-top rounded-circle" alt={user.avatar} />
  <div className="card-body">
    <h5 className="card-title">{user.username}</h5>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p> */}
    <Link to="#" className="btn btn-primary">Let's Chat</Link>
  </div>
</div>
        </div>
      ))}
      </div>

      <button onClick={prevPage} disabled={page === 1}>
        Prev
      </button>

      <span>
        Page {page} of {pages}
      </span>

      <button onClick={nextPage} disabled={page === pages}>
        Next
      </button>
    </div>
  )
}

export default Users