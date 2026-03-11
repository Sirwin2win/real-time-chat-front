import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../features/auth/authSlice'


const RegisterForm = () => {
    const {users,status,error} = useSelector(state=>state.auth)
        const dispatch = useDispatch()
    const [data, setData] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data,[name]:value}))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(register(data))
    }
  return (
   <div>
        <h1 className='text-primary text-center my-3'>Create account</h1>
        <div className='container'>
            <form method='post'>
                <div className='mx-5 mb-5'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' onChange={handleChange} value={data.name} className='form-control' name='name' placeholder='-enter your email-' />
                </div>
                <div className='mx-5 mb-5'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' onChange={handleChange} value={data.email} className='form-control' name='email' placeholder='-enter your email-' />
                </div>
                <div className='mx-5 mb-5'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={handleChange} value={data.password} className='form-control' name='password' placeholder='-enter your password-' />
                </div>
                <div className='mx-5 mb-5'>
                    {status==='error'&&<p className='text-danger'>Could not register</p>}
                    {status==='succeeded'&&<Link to={'/about'} className='text-success my-5'>Registration successful! Login</Link>}
                    {/* <input type="submit" value='Register' onClick={handleSubmit} className='form-control text-bg-primary' /> */}
                    <button className='form-control text-bg-primary' onClick={handleSubmit}>
                        {status==='loading'?'Registering...':'Register'}
                    </button>
                </div>
            </form>

        </div>
    </div>
  )
}

export default RegisterForm