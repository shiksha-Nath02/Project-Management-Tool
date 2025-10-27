import React from 'react'
import BarChart from '../components/BarChart'
const Dashboard = () => {
  let id=1;
  return (
   <div>
      <h1>Welcome To Dashboard</h1>
      
      <BarChart id={id}/>
   </div>
   
  )
}

export default Dashboard