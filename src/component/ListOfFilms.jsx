import React from 'react'
import { useEffect, useState } from 'react';
import { Card, Row, Button, Col,Stack, Container  } from "react-bootstrap";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "../App.css";



function ListOfFilms() {

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
			.then((response) => {
				setMovies(response.items)
				console.log(response.items);
			})
			.catch(console.error);
	}, []);


  return (
<Container>

<Row className="justify-content-center">
<h1  style={{fontFamily: 'Impact, Charcoal, sans-serif',
    fontSize: '3.5rem',
    textShadow: '1px 1px 0px black', 
    marginBottom: "5rem", marginTop: "5rem"}} >MOVIES LIST </h1>  
  {movies.map((movie) => (
  
    <Col xs={10} sm={8} md={6} lg={4} xl={3} className="mb-4">
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
      <Stack direction="horizontal" gap={3} className="d-flex justify-content-center align-items-center text-center">
							<p > <b>Year:</b> {movie.fields.year}</p>
              {/*
              <div className="vr" style={{ height: "20px"}}/>
               
                <span className="fa fa-star checked mb-3" style={{color: "#F6C100"}}></span>
                */}
                <p className="info"><b> Rating: </b>  {movie.fields.rating}</p>
              
			</Stack>
							
      {/* Buttons aligned at the bottom */}
      <div className="mt-auto">
      <div className="d-flex justify-content-around"> {/* Adjust button spacing */}
        <Button variant="primary" className="text-nowrap me-2">
        Details
        </Button>
        <Button variant="success" className="text-nowrap" onClick={() => {
            const trailerUrl = movie.fields.video?.fields.file.url;
            if (trailerUrl) {
              window.open(trailerUrl);
              const trailer = new Trailer(trailerUrl);
              trailer.play();
            }
        }}>
        
        Watch trailer
        </Button>
        


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