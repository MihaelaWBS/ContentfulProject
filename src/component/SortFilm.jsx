import Form from 'react-bootstrap/Form';

function SortFilm({
  movies,
  setMovies
}) {

const sortAlphabet = () => {
  const newMovies = [...movies].sort((movieA, movieB) => {
    return movieA.fields.title.localeCompare(movieB.fields.title);
  })
  setMovies(newMovies);
}
const sortYear = () => {
  const newMovies = [...movies].sort((movieA, movieB) => {
    return movieB.fields.year - movieA.fields.year;
  })
  console.log('new', newMovies);
  setMovies(newMovies);
}
const sortRating = () => {
  const newMovies = [...movies].sort((movieA, movieB) => {
    return movieB.fields.rating - movieA.fields.rating;
  })
  setMovies(newMovies);
}


const SortingHandler = (e) => {
  console.log(e.target.value);
  switch (e.target.value) {
    case 'Alphabet':
      sortAlphabet();
      break;
    case 'Year':
      sortYear();
      break;
    case 'Rating':
      sortRating();
      break;  
}
}

  return (
    <Form.Select aria-label="Alphabet" onChange={SortingHandler}>
    <option>Sort By</option>
    <option value="Alphabet">Alphabet</option>
    <option value="Year">Year</option>
    <option value="Rating">Rating</option>
  </Form.Select>
  )
}


export default SortFilm;