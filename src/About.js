import React from "react";
import "./about.css";
const About = () => {
  return (
    <container class="main">
      <div class="left">
        <img alt="self" src="images/head.png" class="self" />
        <div class="socials">
          <a
            href="https://github.com/LucassNogueira"
            target="_blank"
            rel="noreferrer"
          >
            <img alt="hithub" id="social" src="/images/GitHub-Mark-64px.png" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-nogueira-34aa41228/"
            target="_blank"
            rel="noreferrer"
          >
            <img alt="linkedin" id="social" src="/images/linked.png" />
          </a>
          <a href="https://www.gptx.org/" target="_blank" rel="noreferrer">
            <img alt="texas" id="social" src="/images/texas.png" />
          </a>
        </div>
        <div class="about_title">
          <h1 id="name">Lucas Nogueira</h1>
          <h3 id="desc">Student Developer</h3>
          <h3 id="desc">BBM Graduate</h3>
          <h3 id="desc">Pizza Enthusiast</h3>
        </div>
      </div>
      <div class="right">
        <h1 class="aboutme">About Me</h1>
        <p class="aboutp">
          My name is Lucas Nogueira, in 2022 I decided to pivot out of a
          position in a restaurant group where I owned and opperated 6 units
          across the DFW area for 10 years with two partners. Since childhood
          ive always been interested in computers, either playing video games or
          building computers for friends. I chose to enroll myself in a coding
          bootcamp to begin a new career in software development.
        </p>
      </div>
    </container>
  );
};

export default About;
