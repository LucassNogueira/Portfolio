import React from "react";
import Discord from "./svg/Discord";
import Bootstrap from "./svg/Bootstrap";
import CSS from "./svg/CSS";
import ExpressJSDark from "./svg/ExpressJSDark";
import "./styles/about.css";
import Git from "./svg/Git";
import HTML from "./svg/HTML";
import JavaScript from "./svg/JavaScript";
import MaterialUIDark from "./svg/MaterialUIDark";
import MongoDB from "./svg/MongoDB";
import NodeJSDark from "./svg/NodeJSDark";
import Photoshop from "./svg/Photoshop";
import PostgreSQLDark from "./svg/PostgreSQLDark";
import ReactDark from "./svg/ReactDark";
import Redux from "./svg/Redux";
import TailwindCSSDark from "./svg/TailwindCSSDark";
import VSCodeDark from "./svg/VSCodeDark";

const About = () => {
  return (
    <main className="main">
      <div className="left">
        <img alt="self" src="images/head.png" className="self" />
        <div className="socials">
          <a
            href="https://github.com/LucassNogueira"
            target="_blank"
            rel="noreferrer"
          >
            <img alt="github" id="social" src="/images/GitHub-Mark-64px.png" />
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
        <div className="about_title">
          <h1 id="name">Lucas Nogueira</h1>
          <h3 id="desc">Student Developer</h3>
          <h3 id="desc">BBM Graduate</h3>
          <h3 id="desc">Pizza Enthusiast</h3>
        </div>
      </div>
      <div className="right">
        <h1 className="aboutme">About Me</h1>
        <p className="aboutp">
          My name is Lucas Nogueira, in 2022 I decided to pivot out of a
          position in a restaurant group where I owned and operated 6 units
          across the DFW area for 10 years with two partners. Since childhood
          ive always been interested in computers, either playing video games or
          building computers for friends. I chose to enroll myself in a coding
          bootcamp to begin a new career in software development.
        </p>
        <h1 className="skills">Skills</h1>
        <div className="skillsp">
          <ReactDark />
          <JavaScript />
          <HTML />
          <ExpressJSDark />
          <TailwindCSSDark />
          <CSS />
          <NodeJSDark />
          <Git />
          <MaterialUIDark />
          <MongoDB />
          <VSCodeDark />
          <PostgreSQLDark />
          <Photoshop />
          <Redux />
          <Bootstrap />
          <Discord />
        </div>
      </div>
    </main>
  );
};

export default About;
