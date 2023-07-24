import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api";
import "../css/guide.css";

const Guide = ({ allPublishedBlogs }) => {
  const [blog, setBlog] = useState({});
  let { id } = useParams();
  let counter = 0;
  // console.log(allPublishedBlogs);
  async function getBlog(id) {
    const calledBlog = allPublishedBlogs.map((element) => {
      if (element._id === id) {
        return setBlog(element);
      }
    });
  }

  useEffect(() => {
    getBlog(id);
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
        <p>{blog.hostedby}</p>
        <p>{blog.description}</p>
        {steppies ? (
          steppies.map((step) => {
            // console.log("step:", step.step);
            counter = counter + 1;
            if (step.step === undefined && counter === 1) {
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
