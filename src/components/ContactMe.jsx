import React, { useState, useEffect } from "react";
import "../css/contactme.css";

const ContactMe = () => {
  // 3 things- subject, comment, and username

  return (
    <div className="contactme-outside-div">
      <form className="contactme-main-form">
        <h4 className="contactme-header">Contact Form</h4>
        <div className="contactme-subject-div">
          <input
            className="contactme-subject-input"
            placeholder="Subject title here.."
            maxLength="70"
          ></input>
        </div>
        <div className="contactme-textarea-div">
          <textarea
            className="contactme-textarea"
            placeholder="Please write comments here...please include your email if you wish for a response!"
            maxLength="800"
          ></textarea>
        </div>
        <div className="contactme-button-div">
          <p className="contactme-button-p">Submit Feedback</p>
        </div>
      </form>
    </div>
  );
};

export default ContactMe;
