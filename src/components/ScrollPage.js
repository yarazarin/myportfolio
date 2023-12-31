import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ScrollPage.css";
import smoothscroll from 'smoothscroll-polyfill';
import Navbar from "./Navbar";
import ContactForm from "./pages/ContactForm";

import page2Image from "../img/page2.jpg";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";

smoothscroll.polyfill();

const ScrollPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const totalPages = 4;
  const touchStartY = useRef(null);
  const changeTimeout = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setViewportHeight(scrollContainerRef.current.offsetHeight);
    }
  }, []);

  const scrollToPage = useCallback((page) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: page * viewportHeight,
        behavior: "smooth",
      });
    }
  }, [viewportHeight]);

  useEffect(() => {
    scrollToPage(currentPage);
  }, [currentPage, scrollToPage]);

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = event.deltaY;

      if (delta > 0 && currentPage < totalPages - 1) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (delta < 0 && currentPage > 0) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };

    const handleTouchStart = (event) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (touchStartY.current !== null) {
        const touchEndY = event.changedTouches[0].clientY;
        const deltaY = touchEndY - touchStartY.current;

        if (deltaY > 50 && currentPage > 0) {
          setCurrentPage((prevPage) => prevPage - 1);
        } else if (deltaY < -50 && currentPage < totalPages - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
        }

        touchStartY.current = null;
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPage]);

  useEffect(() => {
    if (changeTimeout.current !== null) {
      clearTimeout(changeTimeout.current);
    }

    // Apply a delay between page changes to restrict rapid scrolling
    changeTimeout.current = setTimeout(() => {
      scrollToPage(currentPage);
    }, 30);

    return () => {
      if (changeTimeout.current !== null) {
        clearTimeout(changeTimeout.current);
      }
    };
  }, [currentPage, scrollToPage]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < totalPages; i++) {
      dots.push(
        <div
          key={i}
          className={`dot ${i === currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        ></div>
      );
    }
    return dots;
  };

  return (
    <div className="scroll-container" ref={scrollContainerRef}>
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />{" "}
      <div className="scroll-page">
        <FirstPage />
      </div>
      <div
        className="scroll-page"
        // style={{}}
      >
        <SecondPage />
      </div>
      <div
        className="scroll-page"
        style={{ backgroundImage: `url(${page2Image})` }}
      >
        <ThirdPage />
      </div>
      <div
        className="scroll-page"
        style={{ backgroundImage: `url(${page2Image})` }}
      >
        <ContactForm />
      </div>
      <div className="dot-container">{renderDots()}</div>
    </div>
  );
};

export default ScrollPage;
