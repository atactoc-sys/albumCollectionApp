import React from "react";
import "./Footer.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <div className="footerHome">
      <div className="contact">
        <a
          href="https://github.com/atactoc-sys"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/saikat-mandi-2595ba207/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLinkedin />
        </a>
      </div>
      <div className="bottom">
        <p>&copy; 2023 Album Collection App</p>
      </div>
    </div>
  );
}

export default Footer;
