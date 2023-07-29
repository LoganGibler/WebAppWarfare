import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api";
import "../css/guide.css";

const Guide = ({ allPublishedBlogs }) => {
  // console.log(allPublishedBlogs);
  const [blog, setBlog] = useState([]);
  let { id } = useParams();
  console.log("id:", id);
  let counter = 0;

  async function getBlog(id) {
    const calledBlog = allPublishedBlogs.map((element) => {
      if (element._id === id) {
        return setBlog(element);
      }
    });
  }

  useEffect(async () => {
    await getBlog(id);
  }, [id]);
  // console.log("HTIS IS BLOG:", blog);
  let steppies = blog.steps;
  // console.log("steppies:", steppies);
  // console.log("this is blog front end", blog);
  return (
    <div className="main-individual-blog-div">
      <div className="main-blog-container1">
        <h2>{blog.vmtitle}</h2>
        <p className="author-guide">Created By: {blog.author}</p>
        <p className="date-guide">Published on: {blog.date}</p>
        <div className="hostedby-difficulty-div-guide">
          <p>{blog.hostedby}</p>
          <p className="difficulty-guide">Rating: {blog.difficulty}</p>
        </div>
        <p>{blog.description}</p>
        {steppies ? (
          steppies.map((step) => {
            // console.log("step:", step.step);
            counter = counter + 1;
            if (!step.step && counter === 1) {
              return (
                <div className="step-div">
                  <p className="step-element">This guide has no steps yet!</p>
                </div>
              );
            }
            return (
              <div key={counter} className="step-div">
                <p className="step-element">
                  Step {counter}: {step.step}
                </p>
              </div>
            );
          })
        ) : (
          <div className="step-div">
            <p className="step-element">This guide has no steps yet!</p>
          </div>
        )}
        {/* <p>{blog.steps[1]}</p> */}
      </div>
    </div>
  );
};

export default Guide;
