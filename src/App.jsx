import { useRef, useEffect } from "react";
import { Provider, useDispatch } from 'react-redux'
import {store} from './features/store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import About from './pages/About'
import Chat from './pages/Chat'
import { refresh } from './features/auth/authSlice'
import Users from './pages/Users'

// import NotFound from './components/NotFound'


const App = () => {
const dispatch = useDispatch();
  const hasRun = useRef(false);
  
 useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    dispatch(refresh());
  }, [dispatch]);


  return (
   
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='users' element={<Users />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Route>
      </Routes>
      </BrowserRouter>
  
  )
}

export default App