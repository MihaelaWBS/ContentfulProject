import { useState, useEffect } from "react";
import "./App.css";
import { createClient } from "contentful";
import { Link, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card, Row, Button, Col } from "react-bootstrap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function App() {
	const [movies, setMovies] = useState([]);

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
			.then((response) => setMovies(response.items))
			.catch(console.error);
	}, []);

	return (
		<>
			<Row>
				{movies.map((movie) => (
					<Col xs={12} sm={6} md={4} lg={3} className="mb-4"> 
						<Card key={movie.sys.id} className="h-100 d-flex flex-column">
							<Card.Img
								style={{ height: "300px" }}
								variant="top"
								src={movie.fields.image?.fields.file.url}
							/>
							<Card.Body className="flex-grow-1">
								<Card.Title>{movie.fields.title}</Card.Title>
								<Card.Text>
									{documentToReactComponents(movie.fields.body)}

								</Card.Text>
								<div className="mt-auto">
									<Row className="gx-4 justify-content-center"> 
										<Col xs={6} className="px-1 d-flex justify-content-center"> 
											<Button variant="primary" className="text-nowrap">
												Details
											</Button>
										</Col>
										<Col xs={6} className="px-1 d-flex justify-content-center"> 
											<Button variant="success" className="text-nowrap">
												Watch trailer
											</Button>
										</Col>
									</Row>
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
