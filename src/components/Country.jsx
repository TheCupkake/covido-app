import React, { useEffect, useState } from 'react'
import { useGetAllCountriesQuery, useGetAllStatsQuery, useGetCountryStatsQuery } from '../redux/services/covidApi'
import Moment from 'moment'
import DeathCaseNumber from './DeathCaseNumber';
import Loader from './Loader';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Article from './Article';

const Home = () => {
    const [articles, setArticles] = useState([])
    const [email, setEmail] = useState('')
    const [articleCount, setArticleCount] = useState(3)
    const {country} = useParams()
    const {data, isError, isFetching, isLoading} = useGetCountryStatsQuery(country)


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


    if (isFetching) return <Loader />
    if (isError) return <p>Error</p>


    const newDeaths = Number(data?.response[0]?.deaths?.new?.slice(1))
    const newCases = Number(data?.response[0]?.cases?.new?.slice(1))
    const totalDeaths = Number(data?.response[0]?.deaths?.total)
    const totalCases = Number(data?.response[0]?.cases?.total)
    const activeCases = Number(data?.response[0]?.cases?.active)
    const recoveredCases = Number(data?.response[0]?.cases?.recovered)
    const criticalCases = Number(data?.response[0]?.cases?.critical)
    const tests = Number(data?.response[0]?.tests?.total)
    const population = Number(data?.response[0]?.population)

    

  return (
    <div className="px-5 pb-20 flex flex-col items-center w-full">
        <div className="flex flex-col justify-center h-screen items-center">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-black to-[#555555] md:text-9xl text-7xl  font-extrabold text-center mb-5">Covido</h1>
            <h2 className="text-gray md:text-2xl text-xl text-center italic">The one stop shop for all the latest <span>Covid-19 </span> stats and news</h2>
            <h2 className="text-black md:text-4xl text-2xl font-bold text-center mb-5 mt-20">
                Discover all the latest Covid-19 news in {country}
            </h2>
            <div className="text-3xl text-center mt-10">
                <span className="font-bold">Population:</span> <span className="italic">{population.toLocaleString({ maximumFractionDigits: 2 })}</span>
            </div>
        </div>
        <div>
                <div>
                    <h2 className="text-6xl text-center font-bold mt-[200px] bg-clip-text text-transparent bg-gradient-to-b from-black to-[#555555]">Deaths</h2>
                    <div className="flex md:flex-row flex-col justify-around my-[50px]">
                        <DeathCaseNumber
                            title={`New deaths on ${Moment().format('MMMM Do YYYY', data.response[0].day)}`}
                            number={newDeaths}
                        />
                        <DeathCaseNumber
                            title="Total deaths"
                            number={totalDeaths}
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-6xl text-center font-bold mt-[200px] bg-clip-text text-transparent bg-gradient-to-b from-black to-[#555555]">Cases</h2>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-y-20 px-[50px] my-[100px]">
                            <DeathCaseNumber
                                title={`New cases on ${Moment().format('MMMM Do YYYY', data.response[0].day)}`}
                                number={newCases}
                                />
                            <DeathCaseNumber
                                className="mt-[200px]"
                                title="Active cases"
                                number={activeCases}
                                />

                            <DeathCaseNumber
                                className="mt-[200px]"
                                title="Recovered cases"
                                number={recoveredCases}
                                />
                            <DeathCaseNumber
                                className="mt-[200px]"
                                title="Critical cases"
                                number={criticalCases}
                                />

                            <DeathCaseNumber
                                className="mt-[200px]"
                                title="Total cases"
                                number={totalCases}
                                />
                            <DeathCaseNumber
                                className="mt-[200px]"
                                title="Total tests"
                                number={tests}
                                />
                            
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-6xl text-center font-bold mt-[200px] bg-clip-text text-transparent bg-gradient-to-b from-black to-[#555555]">Stats</h2>
                        <p className="mt-9 text-xl my-2 border-b-2 border-[#aaaaaa] p-1 md:w-[35%] w-[90%] p-2 bg-[#eeeeee] rounded-md text-center">
                            <span className="font-semibold">% of cases that ended in death: </span> <span className="italic">{(totalDeaths / totalCases * 100).toFixed(2)} %</span>
                        </p>
                        <p className=" text-xl my-2 border-b-2 border-[#aaaaaa] p-1 md:w-[35%] w-[90%] p-2 bg-[#eeeeee] rounded-md text-center">
                            <span className="font-semibold">% of tests that resulted positive: </span> <span className="italic">{(totalCases / tests * 100).toFixed(2)} %</span>
                        </p>
                        <p className=" text-xl my-2 border-b-2 border-[#aaaaaa] p-1 md:w-[35%] w-[90%] p-2 bg-[#eeeeee] rounded-md text-center">
                            <span className="font-semibold">% of active cases to the entire population: </span> <span className="italic">{(activeCases / population * 100).toFixed(2)} %</span>
                        </p>
                    </div>
                </div>
            <div>
                <h2 className="text-center font-bold md:text-5xl text-3xl mt-[200px] mb-10">Discover All the latest Covid-19 news in {country}</h2>
                <div className="flex flex-wrap justify-around items-center">
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