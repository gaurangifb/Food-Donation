import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Donor from './components/Donor'
import Profile from './components/Profile'
import Home from './components/Home'
import LoginAdmin from './components/LoginAdmin'
import SignupAdmin from './components/SignUpAdmin'
import LoginDonor from './components/LoginDonor'
import SignupDonor from './components/SignupDonor'
import Index from './components/Index'
import DonorHomePage from './components/DonorHomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
        <Route path='' element={<Home />} /> 
          <Route path='/donor' element={<Donor />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        
          
          <Route path='/loginadmin' element={<LoginAdmin />} ></Route>
          <Route path='/signupadmin' element={<SignupAdmin />} ></Route>
          <Route path='/logindonor' element={<LoginDonor />} ></Route>
          <Route path='/signupdonor' element={<SignupDonor />} ></Route>
          <Route path='/index' element={<Index />} ></Route>
          <Route path='/donorhome' element={<DonorHomePage />} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App