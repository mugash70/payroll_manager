import React from  'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/home/index'
import Employees from './components/home/pages/employees'
// import history from './history';
function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes >
      <Route exact path='/' element={<Home />} />
      <Route exact path='/employees' element={<Employees />} />
    </Routes>
    </div>
</BrowserRouter>
  );
}

export default App;
