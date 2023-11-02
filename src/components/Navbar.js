import React from "react";
import "./Navbar.css";

const Navbar = ({ setCurrentPage, currentPage }) => {
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="navbar">
      <button className={currentPage === 3 ? 'active' : ''} onClick={() => navigateToPage(3)}>Contact Me</button>
      <button className={currentPage === 2 ? 'active' : ''} onClick={() => navigateToPage(2)}>Portfolio</button>
      <button className={currentPage === 1 ? 'active' : ''} onClick={() => navigateToPage(1)}>About me</button>
      <button className={currentPage === 0 ? 'active' : ''} onClick={() => navigateToPage(0)}><i class="fa-solid fa-house"></i></button>
    </div>
  );
};

export default Navbar;