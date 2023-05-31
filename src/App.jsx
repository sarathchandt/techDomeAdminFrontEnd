import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './App.css'
import Home from './pages/Home';
import ProtectedRoutes from './pages/ProtectedRoutes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
            <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile/>} />
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
