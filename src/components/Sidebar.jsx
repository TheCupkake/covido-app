import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import {AiOutlineClose, AiFillCaretRight} from 'react-icons/ai'




const Sidebar = ({countries}) => {
    const logo = "https://cdn-icons-png.flaticon.com/512/2913/2913465.png"
    const [viewSidebar, setViewSidebar] = useState(false)
    const [viewCountries, setViewCountries] = useState(false)
    const navigate = useNavigate()
  return (
    <>
        {!viewSidebar && 
        <>
            <div onMouseEnter={() => setViewSidebar(true)} className="fixed h-screen left-0 w-[5px] bg-black bg-opacity-10" />
            <AiFillCaretRight
                className="md:hidden fixed top-[20px] left-[10px] text-2xl opacity-80 z-[5]"
                onClick={() => setViewSidebar(true)}
                />
        </>
        }
        {viewSidebar && 
            <div className="overflow-scroll-y scrollbar fixed z-1000 animate-slideleft md:w-[20%] w-[100%] h-screen bg-black md:bg-opacity-10 bg-opacity-80 flex flex-col p-5" onMouseLeave={() => setViewSidebar(false)}>
                <img
                    onClick={() => navigate('/')}
                    src={logo}
                    alt="logo"
                    className="w-40 h-40 m-0 p-0 cursor-pointer object-contain"
                    />
                <div className="flex flex-col gap-2 my-5">
                    <NavLink
                        className="text-2xl font-bold mx-7 my-2 hover:animate-hoveranimation md:text-black text-white "
                        to=""
                        >
                        Stats
                    </NavLink>
                    <p className="text-2xl font-bold mx-7 my-2 hover:animate-hoveranimation cursor-pointer md:text-black text-white " onClick={() => setViewCountries((prevViewCountries) => !prevViewCountries)}>
                        Countries
                    </p>
                    {viewCountries && countries.map((country) => (
                        <p className="md:text-black text-white text-md border-b-2 border-[#bbbbbb] font-semibold mx-7 my-2 hover:animate-hoveranimation cursor-pointer" onClick={() => navigate(`/${country}`)}>
                            {country}
                        </p>
                    ))}
                    <AiOutlineClose
                        className="md:hidden absolute top-[30px] right-[20px] text-white text-3xl"
                        onClick={() => setViewSidebar(false)}
                    />
                </div>
            </div>
        }
    </>
  )
}

export default Sidebar