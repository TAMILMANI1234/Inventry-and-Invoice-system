import React from 'react'
import Content from '../ContentComponent/content'; 
const Dashboard = (theme) => {
  return (
    <div className={`flex h-full bg-gray-100`}>
      <div className="flex flex-col flex-1 overflow-hidden ">
        <Content theme={theme}/>
      </div>
   </div>
     
  )
}

export default Dashboard
