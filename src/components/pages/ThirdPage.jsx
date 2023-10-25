import React, { useState, useEffect, useRef } from "react";
import "./ThirdPage.css";
import netlify from "../../img/netlify.png";
import MyFlixAngularClient from "../../img/MyFlixAngularClient.png"; 

const ThirdPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);
  const pointerOverGallery = useRef(false);
  const touchStartX = useRef(null);

  const images = [
    netlify,
    MyFlixAngularClient,
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4",
    "https://picsum.photos/400/200?random=5",
    "https://picsum.photos/400/200?random=6",
  ];

  // An array of links corresponding to the images
  const imageLinks = [
    "https://yaramyflix.netlify.app",
    "https://yarazarin.github.io/myFlix-Angular-client/",
    "https://example.com/link3",
    "https://example.com/link4",
    "https://example.com/link5",
    "https://example.com/link6",
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
    <div
      className="horizontal-gallery"
      ref={galleryRef}
      style={{
        overflow: "hidden",
      }}
    >
      <div
        className="image-grid"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <a key={index} className="image-link" href={imageLinks[index]} target="_blank">
            <img src={image} alt={`Image ${index + 1}`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ThirdPage;
