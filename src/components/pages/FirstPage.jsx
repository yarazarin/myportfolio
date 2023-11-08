import React, { useEffect } from "react";
import "./FirstPage.css";

const FirstPage = () => {
  useEffect(() => {
    const sectionsLeaf = [...document.querySelectorAll(".leaf")];
    const optionsLeaf = {
      rootMargin: "0px",
      threshold: 0.25,
    };

const callbackLeaf = (entries) => {
  entries.forEach((entry) => {
    const { target } = entry;
    if (entry.intersectionRatio >= 0.25) {
      target.classList.add("is-visible");
      // Check if the user is on iOS
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) { 
        observerLeaf.unobserve(target); // stop observing once animation starts
      }
    } else {
      target.classList.remove("is-visible");
    }
  });
};

    const observerLeaf = new IntersectionObserver(callbackLeaf, optionsLeaf);
    sectionsLeaf.forEach((section) => {
      observerLeaf.observe(section);
    });
  }, []);

  return (
    <>
      <div className="first_page">
        <div className="first-wellcome">
          <h1>Welcome</h1>
          <span>
            I Am Yara,
            <br />A Full Stack Developer
          </span>
        </div>
        <div className="leaf_box">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
