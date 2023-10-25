import React, { useState, useEffect, useRef } from "react";
import "./ScrollPage.css";

import page1Image from "../img/page1.jpg";
import page2Image from "../img/page2.jpg";
import page3Image from "../img/page3.jpg";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";

const ScrollPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;
  const touchStartY = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = event.deltaY;

      if (delta > 0 && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      } else if (delta < 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
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
          setCurrentPage(currentPage - 1);
        } else if (deltaY < -50 && currentPage < totalPages - 1) {
          setCurrentPage(currentPage + 1);
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

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: currentPage * window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

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
      <div
        className="scroll-page"
        style={{ backgroundImage: `url(${page1Image})` }}
      >
        <FirstPage />
      </div>
      <div
        className="scroll-page"
        style={{ backgroundImage: `url(${page2Image})` }}
      >
        <SecondPage />
      </div>
      <div
        className="scroll-page"
        style={{ backgroundImage: `url(${page3Image})` }}
      >
        <ThirdPage />
      </div>
      <div className="dot-container">{renderDots()}</div>
    </div>
  );
};

export default ScrollPage;
