import React from 'react';
import { useLocation } from "react-router-dom"; // Import useLocation
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components


const Video = () => {
    const location = useLocation();
    const { videoUrl } = location.state; // Extracting video URL from location state

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                        <iframe 
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            src={videoUrl}
                            title="Movie Trailer"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Video;