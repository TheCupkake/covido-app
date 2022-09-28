import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'




const Sidebar = ({countries}) => {
    const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Coronavirus_icon.svg/2048px-Coronavirus_icon.svg.png"
    const [viewSidebar, setViewSidebar] = useState(false)
    const [viewCountries, setViewCountries] = useState(false)
    const navigate = useNavigate()
  return (
    <>
        {!viewSidebar && 
            <div onMouseEnter={() => setViewSidebar(true)} className="fixed h-screen absolute left-0 w-[5px] bg-black bg-opacity-10" />
        }
        {viewSidebar && 
            <div className="overflow-scroll-y scrollbar fixed z-1000 animate-slideleft w-[20%] h-screen bg-black bg-opacity-10 flex flex-col p-2" onMouseLeave={() => setViewSidebar(false)}>
                <img
                    onClick={() => navigate('/')}
                    src={logo}
                    alt="logo"
                    className="w-40 h-40 m-0 p-0 cursor-pointer object-contain"
                    />
                <div className="flex flex-col gap-2 my-5">
                    <NavLink
                        className="text-2xl font-bold mx-7 my-2 hover:animate-hoveranimation"
                        to=""
                        >
                        Stats
                    </NavLink>
                    <NavLink
                        className="text-2xl font-bold mx-7 my-2 hover:animate-hoveranimation"
                        to=""
                        >
                        News
                    </NavLink>
                    <p className="text-2xl font-bold mx-7 my-2 hover:animate-hoveranimation cursor-pointer" onClick={() => setViewCountries((prevViewCountries) => !prevViewCountries)}>
                        Countries
                    </p>
                    {viewCountries && countries.map((country) => (
                        <p className="text-md border-b-2 border-[#bbbbbb] font-semibold mx-7 my-2 hover:animate-hoveranimation cursor-pointer" onClick={() => navigate(`/${country}`)}>
                            {country}
                        </p>
                    ))}
                </div>
            </div>
        }
    </>
  )
}

export default Sidebar