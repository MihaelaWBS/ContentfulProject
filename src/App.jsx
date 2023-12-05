import { useState, useEffect } from "react";
import "./App.css";
import { createClient } from "contentful";
import { Link, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card, Row, Button } from "react-bootstrap";
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
					<Card key={movie.sys.id} style={{ width: "18rem" }}>
						<Card.Img
							style={{ height: "300px" }}
							variant="top"
							src={movie.fields.image?.fields.file.url}
						/>
						<Card.Body>
							<Card.Title>{movie.fields.title}</Card.Title>
							<Card.Text>
								{documentToReactComponents(movie.fields.body)}

							</Card.Text>
							<Button variant="primary" className="mt-5">
								Details
							</Button>
              <Button variant="success" className="mt-5">
								Watch trailer
							</Button>
						</Card.Body>
					</Card>
				))}
			</Row>
		</>
	);
}

export default App;
