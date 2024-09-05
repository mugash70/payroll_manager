import React from  'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/home/index'

import Login from './components/login'
import Signup from './components/signup'
import Forgot from './components/forgot'

import Organization from './components/home/pages/organizations'
import Entities from './components/home/pages/entities'
// 

import Employees from './components/home/pages/employees'
import Roles from './components/home/pages/role'
import Departments from './components/home/pages/departments'
import Others from './components/home/pages/others'
import Reports from './components/home/pages/reports'
import Bd from './components/home/pages/b_d'
import ED from './components/home/input/emp_details'
import Pay from './components/home/pages/payroll'
import { ConfigProvider } from 'antd';
// import history from './history';
function App() {
  return (
    // <ConfigProvider>
          <BrowserRouter>
          <div>
          <Routes>

          <Route exact path='/' element={<Login />} />
          <Route exact path='/changepass' element={<Signup />} />
          <Route exact path='/forgot' element={<Forgot />} />

          <Route exact path='/dashboard' element={<Home />} />

          <Route exact path='/payroll' element={<Pay />} />
       
            {/* <Route exact path='/dashboard/:id' element={<Home />} /> */}
            <Route exact path='/employees' element={<Employees />} />
            <Route exact path='/departments' element={<Departments />} />
            <Route exact path='/roles' element={<Roles />} />
            <Route exact path='/b&d' element={<Bd />} />
            <Route exact path='/others' element={<Others />} />
            <Route exact path='/reports' element={<Reports />} />
            <Route exact path='/employees/:id' element={<ED />} />

            <Route exact path='/organizations' element={<Organization />} />
            <Route exact path='/entities' element={<Entities />} />
          </Routes>
          </div>
      </BrowserRouter>
  // </ConfigProvider>
  );
}

export default App;
