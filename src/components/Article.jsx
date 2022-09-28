import React from 'react'
import moment from 'moment'

const Article = ({title, author, summary, link, org, date}) => {
  return (
    <div className="bg-white m-2 p-5 rounded-lg border-2 border-[#eeeeee] w-[40%] z-400">
        <h1 className="text-center font-bold text-xl mb-2">{title}</h1>
        <hr />
        <p>{summary.slice(0, 200)} <a href={link} target="_blank" className="font-bold cursor-pointer">Read More...</a></p>
        <hr />
        <h2 className="text-[#aaaaaa] italic text-right">{author ? author : org} - {moment(date).fromNow()}</h2>
    </div>
  )
}

export default Article