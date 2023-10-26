import React, { useState, useEffect, useRef } from "react";
import "./ThirdPage.css";
import netlify from "../../img/netlify.png";
import MyFlixAngularClient from "../../img/MyFlixAngularClient.png";
import meet from "../../img/meet.png";
import todo from "../../img/todo.png";
import chat from "../../img/chat.png";

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
    "https://picsum.photos/400/200?random=6",
  ];

  // An array of links corresponding to the images
  const imageLinks = [
    "https://yaramyflix.netlify.app",
    "https://yarazarin.github.io/myFlix-Angular-client/",
    "https://yarazarin.github.io/meet/",
    "https://yarazarin.github.io/to-do-list-app/",
    "https://github.com/yarazarin/CHAT",
    "#6",
  ];

  const imageText = [
    "<b>Netlify:</b> <br> sign up, log in, browse movies, add/remove movies<br> to favorites,<br>edit profile, delete profile, log out, secured and more.",
    "<b>MyFlix Angular Client<b><br> sign up, log in, browse movies, add/remove movies<br>to favorites,<br>edit profile, delete profile, log out, secured and more.",
    "Meet App: <br>log in with google Authentication, show chart of meetings <br> search by city or country, <br> filter the cities by name and number of cities",
    "ToDo App: <br> add, edit, delete, mark as done, <br> filter by all, active, completed, <br> clear completed, <br> save to local storage",
    "Chat application: <br> log in as a guest , <br> send and recive messages, pictures and using camera on expo go <br>",
    "6",
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
  );
};

export default ThirdPage;
