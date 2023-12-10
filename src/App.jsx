import { useState, useEffect } from "react";
import "./App.css";
import { createClient } from "contentful";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card, Row, Button, Col } from "react-bootstrap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Video from "./component/Video";
import Header from "./component/Header";
import Main from "./component/Main";
import Footer from "./component/Footer";


function App() {



	return (
		<> 
		<Header/>
		<Main />
		<Footer />

		</>
          
	

				
	);
}

export default App;
