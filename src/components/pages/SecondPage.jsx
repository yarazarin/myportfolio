import React from "react";
import "./SecondPage.css";

const SecondPage = () => {
  return (
    <div className="second_page">
      <div className="second_container">
        <div className="part_one">
          <h1>Hi!</h1>
          <p>
            I'm a seasoned full-stack web developer well-versed in MERN
            "NoSQL-MongoDB, Express, React - React Native, Node.js" and Angular
            technologies. My focus is on crafting user-friendly, efficient web
            applications and websites that drive business success. I bring a
            keen eye for design, adhering to best practices like SEO, security,
            and responsive design, and I leverage JQuery, SCSS and Bootstrap for
            enhanced styling. With strong organizational and problem-solving
            skills, I'm ready to collaborate and contribute to exceptional web
            solutions. I'm eager to learn more about your project and how I can
            help it succeed.
          </p>
        </div>
        <div className="part_two">
          <h3>- My Expertise:</h3>
          <ul>
            <li>Frontend: Bootstrap, React, Angular, React Native</li>
            <li>Backend: Node.js, Express, Serverless, Firebase</li>
            <li>Databases: MongoDB, Google Firestore</li>
            <li>Tools: Git, Testing, Project Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
