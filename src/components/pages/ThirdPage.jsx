import React, { useState, useEffect, useRef } from "react";
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
  const pointerOverGallery = useRef(false);
  const touchStartX = useRef(null);

  const images = [
    netlify,
    MyFlixAngularClient,
    meet,
    todo,
    chat,
    api_catch,
  ];

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
    "Meet App: <br>log in with google Authentication,<br> show chart of meetings <br> search by city or country, <br> filter the cities by name and number of cities",
    "ToDo App: <br> add, edit, delete, mark as done, <br> filter by all, active, completed, <br> clear completed, <br> save to local storage",
    "Chat application:<br> log in as a guest , <br> send and recive messages,<br>pictures and using camera on expo go app",
    "API Catcher: <br> search for any API and <br>get the data in JSON format,<br>used bootstrap",
  ];

  const handleScroll = (event) => {
    if (!pointerOverGallery.current) {
      event.preventDefault();
      const delta = event.deltaY;
      if (delta > 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (delta < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (touchStartX.current !== null) {
      const touchX = event.touches[0].clientX;
      const deltaX = touchX - touchStartX.current;
      if (deltaX > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (deltaX < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      touchStartX.current = null;
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;

    const handleGalleryScroll = (event) => {
      handleScroll(event);
      event.stopPropagation(); // Prevent the scroll event from reaching the outer container
    };

    // Attach the wheel event listener to the gallery element
    gallery.addEventListener("wheel", handleGalleryScroll, { passive: false });
    gallery.addEventListener("touchstart", handleTouchStart);
    gallery.addEventListener("touchmove", handleTouchMove);

    return () => {
      // Remove the event listeners when the component unmounts
      gallery.removeEventListener("wheel", handleGalleryScroll);
      gallery.removeEventListener("touchstart", handleTouchStart);
      gallery.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentIndex]);

  return (
    <div className="third_page">
      <img src={mern} alt="MERN" className="mern_logo" />
    <div className="horizontal-gallery" ref={galleryRef}>
      <div
        className="image-grid"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <a className="image-link" href={imageLinks[index]} target="_blank">
              <img src={image} alt={`Image ${index + 1}`} />
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
    </div>
    </div>
  );
};

export default ThirdPage;
