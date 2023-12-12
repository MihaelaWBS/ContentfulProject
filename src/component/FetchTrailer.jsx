/*import { useNavigate } from 'react-router-dom'; */
import { createClient } from 'contentful';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';



function FetchTrailer({ movieId, movieTitle }) {
  /*const navigate = useNavigate(); */
  const [show, setShow] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');

  console.log("Movie ID:", movieId);

  const fetchTrailer = async () => {
    const SPACE_ID = import.meta.env.VITE_SPACE_ID;
    const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
    const ENVIRONMENT_NAME = import.meta.env.VITE_ENVIRONMENT_NAME;

    const client = createClient({
      space: SPACE_ID,
      environment: ENVIRONMENT_NAME,
      accessToken: ACCESS_TOKEN,
    });

    try {
      const response = await client.getEntry(movieId);
      console.log("API Response:", response); // Debug: Check API response

      const fetchedTrailerUrl = response.fields.video?.fields.file?.url;
      console.log("Fetched Trailer URL:", fetchedTrailerUrl); // Debug: Check fetched URL
  
      if (fetchedTrailerUrl) {
        setTrailerUrl(fetchedTrailerUrl); // Set the trailer URL
        setShow(true);
      } else {
        console.log("Trailer URL not found");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
     /*navigate(`/movie/${movieId}`); */
  };

  return (
    <>
    <Button variant="success" className="text-nowrap" onClick={fetchTrailer}>
        Watch trailer
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movieTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerUrl && (
            <iframe 
              src={trailerUrl} 
              width="100%" 
              height="400px" 
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
     
    </>
  );
}

export default FetchTrailer;



