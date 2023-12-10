

import React from 'react'
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as mdb from 'mdb-ui-kit'; 
import 'mdb-ui-kit/css/mdb.min.css';
window.mdb = mdb;

const Footer = () => {
  return (

    
    <footer className="bg-body-tertiary text-center text-bg-light" style={{ width: '100%', 
        boxShadow: '0 -4px 12px 0 rgba(var(--mdb-box-shadow-color-rgb), 0.07), 0 -2px 4px rgba(var(--mdb-box-shadow-color-rgb), 0.05)' }}>
       
        <div className="text-center ">
            <div className="text-center p-3" >
                © 2020 Copyright: 
                <a className="text-body" href="https://mdbootstrap.com/"> Movies ACM</a>
            </div>

        </div> 
        
      
    </footer>
        
    

)
}

export default Footer

        
       