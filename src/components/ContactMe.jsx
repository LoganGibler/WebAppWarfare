import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { sendFeedbackToDB } from "../api";
import { getUser } from "../auth";
require("dotenv").config();
import "../css/contactme.css";

const ContactMe = () => {
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const submittedBy = getUser();
  // let api_FrontEnd = process.env.API_FE;
  // console.log(api_FrontEnd);
  return (
    <div className="contactme-outside-div">
      <form
        className="contactme-main-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (submittedBy && subject && comment) {
              const feedback = await sendFeedbackToDB(
                submittedBy,
                subject,
                comment
              );
              console.log(feedback);
              if (!feedback) {
                alert("Feedback failed to send, please try again later.");
              } else {
                setSubject("");
                setComment("");
                alert("Feedback sent successfully. Thank you.");
                location.reload();
              }
            } else {
              alert("Please fill out all fields.");
            }
          } catch (error) {
            throw error;
          }
        }}
      >
        <h4 className="contactme-header">Contact Form</h4>
        <div className="contactme-subject-div">
          <input
            className="contactme-subject-input"
            placeholder="Subject title here.."
            maxLength="70"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          ></input>
        </div>
        <div className="contactme-textarea-div">
          <textarea
            className="contactme-textarea"
            placeholder="Please write comments here...please include your email if you wish for a response!"
            maxLength="800"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="contactme-button-div">
          <button className="contactme-button-p">Submit Feedback</button>
        </div>
      </form>
    </div>
  );
};

export default ContactMe;
