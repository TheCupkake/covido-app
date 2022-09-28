import { Route, Routes } from 'react-router-dom';
import './App.css';
import Country from './components/Country';
import CovidIcon from './components/CovidIcon';
import Home from './components/Home';
import Loader from './components/Loader';
import Sidebar from './components/Sidebar';

import {useGetAllCountriesQuery} from './redux/services/covidApi'

function App() {
  const {data, isError, isFetching, isLoading} = useGetAllCountriesQuery()
  
  if (isFetching) return <Loader />
  
  const countries = data.response
 
  return (
    <div className="overflow-hidden flex relative bg-gradient-to-b from-[#ddead1] to-white">
      <CovidIcon />
      <Sidebar countries={countries} />
        <Routes>
          <Route path='/' element={<Home countries={countries} isFetching={isFetching} isError={isError} />} />
          <Route path='/:country' element={<Country />} />
        </Routes>
    </div>
  );
}

export default App;
