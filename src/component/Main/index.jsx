import React from 'react'
import {Router, Routes, Route} from "react-router-dom";
import ListOfFilms from '../ListOfFilms';
import MovieDetails from '../MovieDetails';
/*import Video from '../Video'; */
import NotFound from '../NotFound';

const Main = () => {


  return (
    <Routes>
        <Route path="/" element={ <ListOfFilms />}/>
        {/*<Route path="/video" element={<Video />} /> */}
        <Route path="/moviedetails" element={<MovieDetails />} /> 
        <Route path="*" element={<NotFound />} />  
    </Routes>
    
  )
}

export default Main;