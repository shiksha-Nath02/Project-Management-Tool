import React from 'react'
import { Route,Routes } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MyProjects from './pages/MyProjects'
import Kanban from './components/Kanban'
import NewProject from './pages/NewProject'
import BarChart from './components/BarChart'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/project" element={<MyProjects/>} >
          <Route path=':id' element={<Kanban></Kanban>}></Route>
        </Route>
        <Route path='/newproject' element={<NewProject/>}>
          <Route path=':id' element={<BarChart/>} ></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App