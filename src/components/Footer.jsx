import React, { useState, useEffect } from "react";
import "./myStyles.css";

const Footer = () => {
  return (
    <footer>
      <div
        id="footer"
        className="container-fluid text-center text-md-left footer fixed-bottom"
      >
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">Glorious Proteins</h5>
            <p>Welcome to Glorious Proteins</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
              <a href="#!">GitHub</a>
              </li>
              <li>
                <a href="#!"></a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.linkedin.com/in/logan-gibler/">LinkedIn</a>
              </li>
              <li>
                {/* <a href="#!">Glorious Proteins Link</a> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
