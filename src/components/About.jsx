import React, { useState, useEffect } from "react";
import "../css/about.css";

const About = () => {
  return (
    <div className="about-main-div">
      <div className="about-container-div">
        <div className="about-header-div">
          <h3 className="about-header">Meet the Developer</h3>
        </div>
        <div className="about-paragraph-div">
          <p className="about-firstparagraph">
            Hello users! My name is Logan, and welcome to my project. I created
            WebAppWarfare as a way to spread and share the knowledge of
            *ethical* hacking. Please do not use the techniques shown on this
            site to attack any legitmate networks or webapps without permission.
            That is illegal, and will result in fines or even prison time.
          </p>
          <p className="about-secondparagraph">
            Now on a lighter note...keep a look out for bugs with the site
            please! Using the contact form below, let me know any comments or
            concerns you have, and any features I should add!
          </p>
          <p className="about-thirdparagraph">
            Make sure you always have a vpn on as some tools(even used
            ethically) can cause your internet provider to take away your
            internet. If you don't know where to start, click on "Lab Intro"
            below to create your first lab environment. Happy hacking!
          </p>
          <div className="about-links-div">
            <a href="/contactme" className="about-contactme">
              Contact Me
            </a>
            <a href="/labguide" className="about-labintro">
              Lab Intro
            </a>
            <a href="https://www.linkedin.com/in/logan-gibler/" className="about-linkedin">
              LinkedIn
            </a>
            <a
              href="https://github.com/LoganGibler/WebAppWarfare"
              className="about-github"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
