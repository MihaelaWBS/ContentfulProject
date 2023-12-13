import { useState, useCallback } from 'react';
import { FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function FilterFilms({movies, setMovies, copyMovies}) {
  const [year, setYear] = useState({});
  const [rating, setRating] = useState({});


  const YearHandler = (e) => {
    setYear({...year, [e.target.name]: e.target.value});
    switch(e.target.name){
      case 'from':
        filter(e.target.value, year.till);
        break;
      case 'till':
        filter(year.from, e.target.value);
        break;
    }
  }

  const RatingHandler = (e) => {
    setRating({...rating, [e.target.name]: e.target.value});
    switch(e.target.name){
      case 'fromRating':
        filterRating(e.target.value, rating.tillRating);
        break;
      case 'tillRating':
        filterRating(rating.fromRating, e.target.value);
        break;
    }
  }

  const filter = (from, till) => {

      const newMovies = [...copyMovies].filter(movie => {
        if(from != null && till == null){
          console.log(from);
          return movie.fields.year > from;
        } else if(from == null && till != null && till.toString().length > 3){
          return movie.fields.year < till
        } else if (from != null && till != null && till.toString().length > 3){
          return movie.fields.year > from && movie.fields.year < till
        } else {
          return movie;
        }
      })
      console.log(newMovies);
      setMovies(newMovies);
  }

  const filterRating = (from, till) => {
      console.log(till);
      const newMovies = [...copyMovies].filter(movie => {
        if(from != null && till == null){
          console.log(from);
          return movie.fields.rating > from;
        } else if(from == null && till != null && till.toString().length < 2){
          return movie.fields.rating < till
        } else if (from != null && till != null && till.toString().length < 2){
          return movie.fields.rating > from && movie.fields.rating < till
        } else {
          return movie;
        }
      })
      console.log(newMovies);
      setMovies(newMovies); 
}


  return (
    <>
    <Stack direction="horizontal" gap={3}>
    <FormLabel>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
        </svg>
    </FormLabel>
    <Form.Control type='number' placeholder="1900" name='from' pattern='[0-9]*' value={year.from} onChange={YearHandler}/>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
      </svg>
    <Form.Control type='number' placeholder="2030" name='till' value={year.till} onChange={YearHandler}/>
    <FormLabel>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
      <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
      </svg>
    </FormLabel>
    <Form.Control type='number' placeholder="1" name='fromRating' pattern='[0-9]*' value={rating.from} onChange={RatingHandler}/>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
      </svg>
    <Form.Control type='number' placeholder="10" name='tillRating' value={rating.till} onChange={RatingHandler}/>
    </Stack>
    
    </>
  )
}

export default FilterFilms