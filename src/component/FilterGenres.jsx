import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';

function FilterGenres({movies, setMovies, copyMovies}) {
  const [genres, setGenres] = useState([]);
  const [showA, setShowA] = useState(false);
  const [choosenGenre, setChosenGenre] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
      const newGenres = movies.map(movie => {
        return movie.fields.genre.map(genre => {
          return genre;
        })
      })

      const typeGenre = newGenres.flat().map(genre => {
        return genre.charAt(0).toUpperCase() + genre.slice(1);
      });

      const finalGenres = typeGenre.filter((genre, index) => {
        return typeGenre.indexOf(genre) === index
      });

      setGenres(finalGenres.sort((genreA, genreB) => genreA.localeCompare(genreB)));
      
  }, [copyMovies]);

  useEffect(() => {
    let newGenres = {};
    [...genres].forEach(genre =>{
      newGenres = {...newGenres, [genre]: false};
    })
    setChosenGenre(newGenres);
    console.log(newGenres);
    setIsLoading(!isLoading);
  }, [genres])

  const chooseGenre = (genrePicked, condition) =>{

    const typizedGenres = copyMovies.map(movie =>{
      movie.fields.genre = movie.fields.genre.map(genre => {
        return genre.toLowerCase();
      })
      return movie;
    });

    const newMoviesPicked = typizedGenres.filter(movie => {
        if(movie.fields.genre.includes(genrePicked.toLowerCase())){
          return movie;
        }
    })

  // const newMoviesGenre = typizedGenres.filter(movie => {
  //   choosenGenre
  //   let movieA = {};
  //   choosenGenre.foreach(genreChoosen => {
  //     if(genreChoosen){

  //     }
  //   })
  //     if(choosenGenre.genreA){
  //       console.log('sassss');
  //       if(movie.fields.genre.includes(genreA.toLowerCase())){
  //         movieA = movie;
  //       }
  //     }
  //     return movieA;
  //   })
  //   console.log('13134123',newMoviesGenre);
  // const newMovies = [...new Set([...newMoviesGenre, ...newMoviesPicked])]
  // console.log('13asdasd3',newMovies);
    if(condition){
      setMovies(newMoviesPicked);
    } else {
      setMovies(copyMovies);
    }
  }

  const GenreHandler = (e) => {
    let isChecked = false;
    const pickedGenres = Object.entries(choosenGenre);
    pickedGenres.forEach(genre => {
      if(genre.includes(true)){
        const genreName = genre[0];
        console.log('111');
        setChosenGenre({...choosenGenre, [e.target.name]:e.currentTarget.checked, [genreName]:false});
        isChecked = true;
      } else if (!isChecked){
        console.log('222');
        setChosenGenre({...choosenGenre, [e.target.name]:e.currentTarget.checked});
      }
    })
    chooseGenre(e.target.name, e.currentTarget.checked);
    console.log(choosenGenre);
    isChecked = false;
  }

  return (
    <Row>
      <Col>
        <Button onClick={toggleShowA}>
          {showA
          ?'Close Genre Filter'
          :'Open Genre Filter' 
          }
        </Button>
        <Toast show={showA} onClose={toggleShowA} className='mt-3'>
          <Toast.Body className='genre-toast'>
            <Row xs={2} sm={3} md={6} xxl={7}>
            {genres.map(newGenre => (
              genres.length>0?
              <Col>
                <Form.Check
                onChange={GenreHandler}
                checked={choosenGenre[newGenre]}
                name={newGenre}
                className='checkbox-genre' 
                type='checkbox'
                id={`checkbox-${newGenre}`}
                label={newGenre}
                />
            </Col>:<p>Loading...</p>))}
            </Row>
          </Toast.Body>
        </Toast>
      </Col>
    </Row> 
  )
}

export default FilterGenres