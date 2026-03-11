import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'


const LoginForm = () => {
    const {users,status,error} = useSelector(state=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email:'',
        password:''
    })

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data,[name]:value}))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(data));
        if(status==='succeeded'){
            navigate('/chat');
        }
    }

  return (
    <div>
        <h1 className='text-primary text-center my-3'>Welcome back</h1>
        <div className='container'>
            <form method='post'>
                <div className='mx-5 mb-5'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' onChange={handleChange} value={data.email} className='form-control' name='email' placeholder='-enter your email-' />
                </div>
                <div className='mx-5 mb-5'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={handleChange} value={data.password} className='form-control' name='password' placeholder='-enter your password-' />
                </div>
                <div className='mx-5 mb-5'>
                    {/* <input type="submit" value='Login' onClick={handleSubmit} className='form-control text-bg-primary' /> */}
                    <button className='form-control text-bg-primary' onClick={handleSubmit}>
                        {status==='loading'?'Logging you in ...':'Login'}
                    </button>
                </div>
            </form>

        </div>
    </div>
  )
}

export default LoginForm