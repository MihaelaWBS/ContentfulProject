import { useNavigate } from 'react-router-dom';
import { createClient } from 'contentful';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


function FetchMovieDetails({ movieId }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const fetchMovieDetails = async () => {
    const SPACE_ID = import.meta.env.VITE_SPACE_ID;
    const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
    const ENVIRONMENT_NAME = import.meta.env.VITE_ENVIRONMENT_NAME;

    const client = createClient({
      space: SPACE_ID,
      environment: ENVIRONMENT_NAME,
      accessToken: ACCESS_TOKEN,
    });

    const response = await client.getEntry(movieId);
    setMovieDetails(response);
    console.log(response.fields.body.mainInformation);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
   /* navigate(`/movie/${movieId}`); */
  };

  return (
    <>
      <Button variant="primary" className="text-nowrap" onClick={fetchMovieDetails}>
        Details
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {movieDetails && documentToReactComponents(movieDetails.fields.mainInformation)}
</Modal.Body>
      </Modal>
    </>
  );
}

export default FetchMovieDetails;