import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api";
import "../css/guide.css";

const Guide = ({ allPublishedBlogs }) => {
  const [blog, setBlog] = useState({});
  let { id } = useParams();
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

  // console.log("this is blog front end", blog);
  return (
    <div className="main-individual-blog-div">
      <div className="main-blog-container1">
        <h2>{blog.vmtitle}</h2>

        <p>{blog.hostedby}</p>
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default Guide;
