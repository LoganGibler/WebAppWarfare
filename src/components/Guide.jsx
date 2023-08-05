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
        <h2 className="guide-title">{blog.vmtitle}</h2>
        <p className="author-guide">Created By: {blog.author}</p>
        <p className="date-guide">Published on: {blog.date}</p>
        <div className="hostedby-difficulty-div-guide">
          <p className="guide-hostedby">{blog.hostedby}</p>
          <p className="difficulty-guide">Rating: {blog.difficulty}</p>
        </div>
        <div className="guide-description-div">
          <p className="guide-description-p">{blog.description}</p>
        </div>

        <div className="guide-main-step-div">
          {steppies ? (
            steppies.map((step) => {
              // console.log("step:", step.step);
              counter = counter + 1;
              if (!step.step && counter === 1) {
                return (
                  <div className="guide-step-div">
                    <p className="guide-step-element">
                      This guide has no steps yet!
                    </p>
                  </div>
                );
              }
              return (
                <div className="guide-step-main-div">
                  <div key={counter} className="guide-step-div">
                    <p className="guide-step-element">
                      Step {counter}: {step.step}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="guide-step-div">
              <p className="guide-step-element">This guide has no steps yet!</p>
            </div>
          )}
        </div>
        {/* <p>{blog.steps[1]}</p> */}
      </div>
    </div>
  );
};

export default Guide;
