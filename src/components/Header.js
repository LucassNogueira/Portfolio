import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="navigation">
      <Link to="/">
        <img
          className="logo"
          src="/images/capture.png"
          height={60}
          width={203}
          alt="logo"
        />
      </Link>
      <li>
        <Link to="/projects" className="item">
          Projects
        </Link>
      </li>
      <li>
        <Link to="/about" className="item">
          About
        </Link>
      </li>
      <li>
        <a
          href="https://docs.google.com/document/d/17vuFMQnbQmFx5oOxSw7bTVmCltWY7zM_h4YgiClB77Q/edit?usp=sharing"
          target="_blank"
        >
          Resume
        </a>
      </li>
      <li>
        <a href="mailto:howdy@lucasnogueira.dev">Contact</a>
      </li>
    </div>
  );
};

export default Header;
