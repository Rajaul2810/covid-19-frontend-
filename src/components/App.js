import React, { createContext, useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Login from './Login';
import Navbar from './Navbar';

import Regi from './Regi';

import './App.css'
import { Home } from './Home';
import Info from './Info';
import PrivateRoute from './PrivetRoute';
import { Dashboard } from './Dashboard';
import { Manage } from './Manage';
import { Admin } from './Admin';
import { Reportlist } from './Reportlist';


export const UserContext = createContext();


const App = () => {
  
  const [loggedInUser,setLoggedInUser] = useState({});
  console.log(loggedInUser);
  return (
    <UserContext.Provider value={{loggedInUser,setLoggedInUser}}>
     
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Home />} />
            {
              loggedInUser.rule ==='doctor' || loggedInUser.rule==='admin' ? <Route  path='/dashboard' element={<Dashboard />} >
                <Route path='/dashboard/info' element={<Info/>}/>
                <Route path='/dashboard/manage' element={<Manage/>}/>
                <Route path='/dashboard/admin' element={<Admin/>}/>
                 </Route> : null
            }
           
            <Route path='/report' element={<PrivateRoute>  <Reportlist /> </PrivateRoute> } />
            <Route path='/login' element={<Login />} />
            <Route path='/reg' element={<Regi />} />
          </Routes>
        </BrowserRouter>
     
    </UserContext.Provider>
  )
}

export default App;
