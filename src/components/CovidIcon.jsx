import React from 'react'

const CovidIcon = () => {
    const icon = 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png'
  return (
    <div className="">
        <img className="absolute opacity-5 h-[150px] w-[150px] animate-spin top-[10%] left-[20%]" src={icon} />
        <img className="absolute opacity-5 h-30 w-30 animate-spin top-[30%] left-[70%]" src={icon} />
        <img className="absolute opacity-5 h-[100px] w-[100px] animate-spin top-[5%] left-[80%]" src={icon} />
        <img className="absolute opacity-5 h-30 w-30 animate-spin top-[60%] right-[80%]" src={icon} />
    </div>
  )
}

export default CovidIcon