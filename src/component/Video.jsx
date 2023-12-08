import React from 'react';
import { useLocation } from "react-router-dom"; // Import useLocation
import { Container, Row, Col, ResponsiveEmbed } from 'react-bootstrap'; // Import Bootstrap components

const Video = () => {
    const location = useLocation();
    const { videoUrl } = location.state; // Extracting video URL from location state

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <ResponsiveEmbed aspectRatio="16by9">
                        <iframe title="Movie Trailer" src={videoUrl} allowFullScreen></iframe>
                        {/* Embed the video iframe */}
                    </ResponsiveEmbed>
                </Col>
            </Row>
        </Container>
    );
}

export default Video;