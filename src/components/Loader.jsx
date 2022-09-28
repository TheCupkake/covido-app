import React from 'react'

const Loader = () => {
    const icon = 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png'

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
        <img className="opacity-5 h-[150px] w-[150px] animate-spin" src={icon} />
        <p>Loading...</p>
    </div>
  )
}

export default Loader