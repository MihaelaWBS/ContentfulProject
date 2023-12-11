import { useState, useEffect } from "react";
import "./App.css";
import { createClient } from "contentful";
import { Link, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card, Row, Button, Col, Stack } from "react-bootstrap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import SortFilm from "./component/SortFilm";
import FilterFilms from "./component/FilterFilms";
import FetchMovieDetails from "./component/FetchMovieDetails";

function App() {
	const [movies, setMovies] = useState([]);
	const [copyMovies, setCopyMovies] = useState([]);

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
			})
			.catch(console.error);
	}, []);

	return (
		<>
		<Row >
			<Col md={2} className="mb-3 text-center">
			<SortFilm movies={movies} setMovies={setMovies} />
			</Col>
			<Col md={6}>
				{copyMovies.length > 0?<FilterFilms movies={movies} setMovies={setMovies} copyMovies={copyMovies} />:<p>Loading...</p>}
			</Col>
		</Row>
			<Row>
				{movies.map((movie) => (
				
					<Col xs={12} sm={12} md={6} lg={4} xxl={3} className="mb-4">
					<Card key={movie.sys.id} className="h-100 d-flex flex-column">
					<Row className="d-flex justify-content-center">
					<Card.Img
						className="text-center"
						style={{ height: "300px", width: '222px' }}
						variant="top"
						src={movie.fields.image?.fields.file.url}
					/>
					</Row>
					<Card.Body className="flex-grow-1 d-flex flex-column">
						<Card.Title className="mb-3 fw-bold">{movie.fields.title}</Card.Title>
						<Card.Text className="text-start flex-grow-1">
							<Stack direction="horizontal" gap={3} className="d-flex justify-content-center align-itemscenter text-center">
							<p >{movie.fields.year}</p>
							<div className="vr" />
							<span class="fa fa-star checked"></span>
							<p className="info">{movie.fields.rating}</p>
							</Stack>
						{documentToReactComponents(movie.fields.body)}
						</Card.Text>
						{/* Buttons aligned at the bottom */}
						<div className="mt-auto">
              <div className="d-flex justify-content-around">
                <FetchMovieDetails movieId={movie.sys.id} />
                <Button variant="success" className="text-nowrap">
                  Watch trailer
                </Button>
              </div>
            </div>
					</Card.Body>
					</Card>
				</Col>
				))}
			</Row>
		</>

				
	);
}

export default App;
