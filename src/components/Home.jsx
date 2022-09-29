import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { useGetAllCountriesQuery, useGetAllStatsQuery, useGetCountryStatsQuery, useGetHistoryStatsQuery } from '../redux/services/covidApi'
import Moment from 'moment'
import DeathCaseNumber from './DeathCaseNumber';
import Loader from './Loader';
import axios from 'axios'
import Article from './Article';



const Home = ({countries,isFetching,isError,}) => {
    const allData = useGetAllStatsQuery()
    const [articles, setArticles] = useState([])
    const [email, setEmail] = useState('')
    const [articleCount, setArticleCount] = useState(3)
    const [country, setCountry] = useState('afghanistan')
    const [countryStats, setCountryStats] = useState({})
    const response = useGetCountryStatsQuery(country)
    const history = useGetHistoryStatsQuery('all')

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
    if (history.isFetching) return <Loader />
    if (isFetching) return <Loader />


    const topCountries = countries.slice(0, 3)
    const historyData = history.data.response.slice(0, 20)
    let cases = []
    let deaths = []
    let times = []
    historyData.map((item) => cases.push(Number(item.cases.new.slice(1))))
    historyData.map((item) => deaths.push(Number(item.deaths.new.slice(1))))
    historyData.map((item) => times.push(item.cases.time))

    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            type: 'category',
            categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            labels: {
                show: false
            }
        },
    }



    const casesSeries = [
        {
            name: "Cases",
            type: 'line',
            data: cases.reverse()
        },
    ]
    const deathSeries = [
        {
            name: "Deaths",
            type: 'line',
            data: deaths.reverse()
        }
    ]

    console.log(deaths)

    console.log(historyData)



    const newDeaths = Number(allData.data.response[0].deaths.new.slice(1))
    const newCases = Number(allData.data.response[0].cases.new.slice(1))
    const totalDeaths = Number(allData.data.response[0].deaths.total)
    const totalCases = Number(allData.data.response[0].cases.total)

    

  return (
    <div className="px-5 py-20 my-20 md:my-0 flex flex-col items-center w-screen">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-black to-[#555555] md:text-9xl text-7xl  font-extrabold text-center mb-5">Covido</h1>
        <h2 className="text-gray md:text-2xl text-xl text-center italic">The one stop shop for all the latest <span>Covid-19 </span> stats and news</h2>
        <div className="w-screen">
            <h2 className="text-black md:text-4xl text-2xl font-bold text-center mb-5 mt-20">
                Discover all the latest news related to your country
            </h2>
            <div className="flex justify-center md:flex-row flex-col items-center gap-5 mt-10 mb-[200px] animate-slideright">
                {topCountries.map((country) => (
                        <div onMouseEnter={() => setCountry(country)} className="bg-black rounded-full p-6 w-40 hover:animate-pill text-[#eeeeee] text-center font-bold text-lg cursor-pointer">
                            {country}
                        </div>
                ))}
                    <div className="bg-[#eeeeee] rounded-full p-6 w-40 hover:animate-pill text-[#333333] text-center font-bold text-lg cursor-pointer">
                        More
                    </div>

            </div>
                <div className="flex justify-around md:flex-row flex-col  my-[100px]">
                    <DeathCaseNumber
                        title={`New deaths on ${Moment().format('MMMM Do YYYY', allData.data.response[0].day)}`}
                        number={newDeaths}
                    />
                    <DeathCaseNumber
                        title="Total deaths"
                        number={totalDeaths}
                    />
                </div>
                <div className="flex justify-around md:flex-row flex-col  my-[100px]">
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
            <h2 className="text-center font-bold md:text-5xl text-3xl mt-[200px] mb-10">Discover All the latest news</h2>
            <div className="flex md:flex-row flex-col flex-wrap justify-around items-center ">
                    {articles.slice(0, articleCount).map((article) => (
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
            {articles?.length > articleCount + 3 && 
                <h2 onClick={() => setArticleCount((prevArticleCount) => prevArticleCount + 3)} className="text-center cursor-pointer font-semibold mt-5">Load more articles...</h2>
            }
            
            <h2 className="text-center font-bold md:text-5xl text-3xl mt-[200px] mb-20">Trends over the past 5 hours worldwide</h2>

            <div className="flex md:flex-row flex-col justify-around ">
                <div className="flex items-center flex-col ">
                <h3 className="font-bold text-xl">Cases each 15 minutes</h3>
                    <Chart
                        options={options}
                        series={casesSeries}
                        type="line"
                        height="300"
                        className="md:w-600 w-400"
                        />
                </div>
                <div className="flex items-center flex-col ">
                    <h3 className="font-bold text-xl ">Deaths each 15 minutes</h3>
                    <Chart
                        options={options}
                        series={deathSeries}
                        type="line"
                        height="300"
                        className="md:w-600 w-400"
                        />
                </div>
            </div>
        
            <h2 className="text-black md:text-4xl text-3xl font-bold text-center mb-5 mt-[150px]">Subscribe to our newsletter so you don't miss a thing</h2>
            <form className="flex md:flex-row flex-col items-center justify-center w-screen mt-[70px]">
                <input
                    className=" md:w-[50%] w-[80%] focus:outline-none p-3 md:border-b-2 border-l-2 border-gray"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="p-4 bg-[#4b6043] text-white font-bold md:rounded-tr-3xl md:rounded-bl-none rounded-bl-3xl rounded-br-3xl md:w-[20%] w-[80%]">Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default Home