import React, { useState, useRef } from "react";
import "./ThirdPage.css";
import netlify from "../../img/netlify.png";
import MyFlixAngularClient from "../../img/MyFlixAngularClient.png";
import meet from "../../img/meet.png";
import todo from "../../img/todo.png";
import chat from "../../img/chat.png";
import mern from "../../img/mern.png";
import api_catch from "../../img/api_catch.png";

const ThirdPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  const images = [netlify, MyFlixAngularClient, meet, todo, chat, api_catch];

  // An array of links corresponding to the images
  const imageLinks = [
    "https://yaramyflix.netlify.app",
    "https://yarazarin.github.io/myFlix-Angular-client/",
    "https://yarazarin.github.io/meet/",
    "https://yarazarin.github.io/to-do-list-app/",
    "https://github.com/yarazarin/CHAT",
    "https://yarazarin.github.io/simple-js-app/",
  ];

  const imageText = [
    "Netlify:<br> sign up, log in, browse movies,<br>add/remove movies<br> to favorites, edit profile,<br> delete profile, log out, secured and more.",
    "MyFlix Angular Client:<br> sign up, log in, browse movies,<br>add/remove moviesto favorites,<br>edit profile, delete profile,<br>log out, secured and more.",
    "Meet App: <br>log in with google Authentication,<br> show chart of meetings <br> search by city or country, <br> filter the cities by name and number of cities.",
    "ToDo App: <br> add, edit, delete, mark as done, <br> filter by all, active, completed, <br> clear completed, <br> save to local storage.",
    "Chat application:<br> log in as a guest , <br> send and recive messages,<br>pictures and using camera on expo go app.",
    "API Catcher: <br> search for any API and <br>get the data in JSON format,<br>used bootstrap.",
  ];

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="third_page">
      <h3>What's in My Portfolio?</h3>
      <br />
      <img src={mern} alt="MERN" className="mern_logo" />
      <div className="horizontal-gallery" ref={galleryRef}>
        <button className="gallery-button left" onClick={handlePrevClick}>
          &lt;
        </button>
        <div
          className="image-grid"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <a
                className="image-link"
                href={imageLinks[index]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={image} alt={`${index + 1}`} />
              </a>
              <div>
                <p
                  className="image-text"
                  dangerouslySetInnerHTML={{ __html: imageText[index] }}
                ></p>
              </div>
            </div>
          ))}
        </div>
        <button className="gallery-button right" onClick={handleNextClick}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ThirdPage;
