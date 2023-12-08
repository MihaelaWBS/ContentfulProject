import { useState, useEffect } from "react";
import "./App.css";
import { createClient } from "contentful";
import { BrowserRouter as Router, Switch, Link, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card, Row, Button, Col } from "react-bootstrap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Video from "./component/Video";

function App() {
	const [movies, setMovies] = useState([]);
	const navigate = useNavigate(); 
	

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
				console.log(response.items);
			})
			.catch(console.error);
	}, []);

	const goToTrailer = (videoUrl) => {
        navigate('/video', { state: { videoUrl } }); // Navigate to Video component with video URL
    };


	return (
		<Router>
            <Routes>
                <Route path="/" element={

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
								<Card.Body className="flex-grow-1 d-flex flex-column">
									<Card.Title className="mb-3 fw-bold">{movie.fields.title}</Card.Title>
									<Card.Text className="text-start flex-grow-1">
									{documentToReactComponents(movie.fields.body)}
									</Card.Text>
									{/* Buttons aligned at the bottom */}
									<div className="mt-auto">
									<div className="d-flex justify-content-around"> {/* Adjust button spacing */}
										<Button variant="primary" className="text-nowrap me-2">
										Details
										</Button>
										<Button variant="success" className="text-nowrap" onClick={() => goToTrailer(movie.fields.video?.fields.file.url)}>
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
			}/>
			<Route path="/video" element={<Video />} /> {/* New Route for Video component */}
		</Routes>
	</Router>

				
	);
}

export default App;
