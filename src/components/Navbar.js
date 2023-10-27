import React from "react";
import "./Navbar.css";

const Navbar = ({ setCurrentPage }) => {
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="navbar">
      <button onClick={() => navigateToPage(2)}>Portfolio</button>
      <button onClick={() => navigateToPage(1)}>About me</button>
      <button onClick={() => navigateToPage(0)}><i class="fa-solid fa-house"></i></button>
    </div>
  );
};

export default Navbar;
