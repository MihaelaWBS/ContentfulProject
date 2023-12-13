import React from 'react'
import { useEffect, useState } from 'react';
import { Card, Row, Button, Col,Stack, Container  } from "react-bootstrap";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "../App.css";
import FetchTrailer from "./FetchTrailer";
import movieLogo from '../assets/movieLogo.png';
import SortFilm from './SortFilm';
import FilterFilms from './FilterFilms';
import FilterGenres from './FilterGenres';
import { Placeholder } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';



function ListOfFilms() {

  const [movies, setMovies] = useState([]);
  const [copyMovies, setCopyMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	

	useEffect(() => {
		const SPACE_ID = import.meta.env.VITE_SPACE_ID;
		const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
		const ENVIRONMENT_NAME = import.meta.env.VITE_ENVIRONMENT_NAME;

		const client = createClient({
			space: SPACE_ID,
			environment: ENVIRONMENT_NAME, // defaults to 'master' if not set
			accessToken: ACCESS_TOKEN,
		});

		client
			.getEntries()
			.then((response) => {
				setMovies(response.items)
        setCopyMovies(response.items);
				setIsLoading(!isLoading);
			})
			.catch(console.error);
	}, []);


  return (
<Container>

<Row className="justify-content-center all-contant">
  <h1  style={{
    fontSize: '3rem',
  marginBottom: "5rem", marginTop: "5rem"}} >Movies list </h1>
  <Row className="filters-search">
		<Row>
			<Col md={2} className="mb-3 text-center">
      {copyMovies.length > 0?<SortFilm movies={movies} setMovies={setMovies} />:<Placeholder />}
			</Col>
			<Col md={6}>
				{copyMovies.length > 0?<FilterFilms movies={movies} setMovies={setMovies} copyMovies={copyMovies} />:<Placeholder />}
			</Col>
			</Row>
			<Row>
				<Col>
        {copyMovies.length > 0?<FilterGenres movies={movies} setMovies={setMovies} copyMovies={copyMovies}/>:<Placeholder />}
				</Col>
			</Row>
</Row> 
    
  {isLoading
		?<Spinner animation="border" />
		:movies.length === 0?<p>No such search result</p>
		:movies.map((movie) => (
  
    <Col xs={10} sm={8} md={6} lg={4} xl={3} className="mb-4">
    <Card key={movie.sys.id} className="h-100 d-flex flex-column card-effect">
    <Card.Img
      style={{ height: "300px" }}
      variant="top"
      src={movie.fields.image?.fields.file.url}
    />
    <Card.Body className="flex-grow-1 d-flex flex-column">
      <Card.Title className="mb-3 fw-bold">{movie.fields.title}</Card.Title>
      <Card.Text className="text-start flex-grow-1">
      {documentToReactComponents(movie.fields.body)}
      </Card.Text>
      <Stack direction="horizontal" gap={3} className="d-flex justify-content-center align-items-center text-center">
							<p > <b>Year:</b> {movie.fields.year}</p>
              <p className="info"><b> Rating: </b>  {movie.fields.rating}</p>
              
			</Stack>
							
      {/* Buttons aligned at the bottom */}
      <div className="mt-auto">
      <div className="d-flex justify-content-around"> {/* Adjust button spacing */}
        <Button variant="primary" className="text-nowrap me-2">
        Details
        </Button>
        <FetchTrailer movieId={movie.sys.id} movieTitle={movie.fields.title}/>
      </div>
      </div>
    </Card.Body>
    </Card>
  </Col>
  ))}
</Row>
</Container>

  )
}

export default ListOfFilms;