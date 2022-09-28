import React, { useEffect, useState } from 'react'
import { useGetAllCountriesQuery, useGetAllStatsQuery, useGetCountryStatsQuery } from '../redux/services/covidApi'
import Moment from 'moment'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger';
import {AiOutlineArrowUp} from 'react-icons/ai'
import DeathCaseNumber from './DeathCaseNumber';
import Loader from './Loader';
import axios from 'axios'
import Article from './Article';

const Home = ({countries,isFetching,isError,}) => {
    const allData = useGetAllStatsQuery()
    const [articles, setArticles] = useState([])
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('afghanistan')
    const [countryStats, setCountryStats] = useState({})
    const response = useGetCountryStatsQuery(country)

    useEffect(() => {
        setCountryStats(response)
    }, [country])

    useEffect(() => {
        try {
            axios.request({
                method: 'GET',
                url: 'https://free-news.p.rapidapi.com/v1/search',
                params: {q: 'covid', lang: 'en'},
                headers: {
                    'X-RapidAPI-Key': 'dc412f2a70msh711a5d9d5cb4422p1d2c71jsnefdf2d62fb2c',
                    'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
                  }
                
            }).then((response) => setArticles(response?.data?.articles))
    
        } catch (error) {
            console.log(error)
        }
    }, [])


    if (allData.isFetching) return <Loader />
    if (isFetching) return <p>Loading...</p>

    console.log(allData)
    const topCountries = countries.slice(0, 3)


    const newDeaths = Number(allData.data.response[0].deaths.new.slice(1))
    const newCases = Number(allData.data.response[0].cases.new.slice(1))
    const totalDeaths = Number(allData.data.response[0].deaths.total)
    const totalCases = Number(allData.data.response[0].cases.total)

    

  return (
    <div className="px-5 py-20 flex flex-col items-center w-full">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-black to-[#555555] text-9xl font-extrabold text-center mb-5">Covido</h1>
        <h2 className="text-gray text-2xl italic">The one stop shop for all the latest <span>Covid-19 </span> stats and news</h2>
        <div>
            <h2 className="text-black text-4xl font-bold text-center mb-5 mt-20">
                Discover all the latest news related to your country
            </h2>
            <div className="flex justify-center gap-5 mt-10 mb-[200px] animate-slideright">
                {topCountries.map((country) => (
                        <div onMouseEnter={() => setCountry(country)} className="bg-black rounded-full p-6 w-40 hover:animate-pill text-[#eeeeee] text-center font-bold text-lg cursor-pointer">
                            {country}
                        </div>
                ))}
                    <div className="bg-[#eeeeee] rounded-full p-6 w-40 hover:animate-pill text-[#333333] text-center font-bold text-lg cursor-pointer">
                        More
                    </div>

            </div>
                <div className="flex justify-around my-[100px]">
                    <DeathCaseNumber
                        title={`New deaths on ${Moment().format('MMMM Do YYYY', allData.data.response[0].day)}`}
                        number={newDeaths}
                    />
                    <DeathCaseNumber
                        title="Total deaths"
                        number={totalDeaths}
                    />
                </div>
                <div className="flex justify-around my-[100px]">
                    <DeathCaseNumber
                        title={`New cases on ${Moment().format('MMMM Do YYYY', allData.data.response[0].day)}`}
                        number={newCases}
                    />
                    <DeathCaseNumber
                        className="mt-[200px]"
                        title="Total cases"
                        number={totalCases}
                    />
                </div>
            <div>
                <h2 className="text-center font-bold text-5xl mt-[200px] mb-10">Discover All the latest news</h2>
                <div className="flex flex-wrap justify-around">
                    {articles.slice(0, 3).map((article) => (
                        <Article
                            title={article?.title}
                            author={article?.author}
                            summary={article?.summary}
                            link={article?.link}
                            org={article.rights}
                            date={article.published_date}
                        />
                        ))}
                </div>
            </div>
        
            <h2 className="text-black text-4xl font-bold text-center mb-5 mt-[150px]">Subscribe to our newsletter so you don't miss a thing</h2>
            <form className="flex  justify-center w-screen mt-[70px]">
                <input
                    className=" w-[50%] focus:outline-none p-3 border-b-2 border-gray"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="p-4 bg-[#4b6043] text-white font-bold rounded-tr-3xl rounded-br-3xl w-[20%]">Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default Home