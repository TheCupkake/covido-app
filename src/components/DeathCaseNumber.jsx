import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger';
import {FaArrowUp} from 'react-icons/fa'

const DeathCaseNumber = ({title, number}) => {
    const [counterOn, setCounterOn] = useState(false)

  return (
    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
    <div className="flex flex-col justify-center items-center" >
        <h2 className="text-center text-2xl mb-4 font-bold" >
            {title}
        </h2>
        {counterOn && 
            <div className="flex items-center">
                <CountUp className="text-3xl font-bold p-5 w-[200px] text-center text-white rounded-full bg-[#c7ddb5]"  start={0} end={number} duration={1} delay={0} />
                <FaArrowUp color="darkred" className="text-3xl color ml-3" />
            </div>
            
        }   
        </div>
    </ScrollTrigger>

  )
}

export default DeathCaseNumber