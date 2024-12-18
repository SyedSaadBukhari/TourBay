import React, { useState } from "react";

import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

import "./navbar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header" role="banner">
      <nav className="navbar" aria-label="Main navigation">
        <Link href="/" className="brand">
          <img
            className="navbar-logo"
            src="/tourbay-logo.png"
            alt="Tourbay Logo"
          />
        </Link>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <section
          id="mobile-menu"
          className={`navbar-mobile-container ${isMenuOpen ? "active" : ""}`}
          role="navigation"
          aria-hidden={!isMenuOpen}
        >
          <nav>
            <ul className="navbar-links" role="menu">
              <li role="none">
                <Link
                  href="/tours"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  Tours
                </Link>
              </li>
              <li role="none">
                <Link
                  href="/addTour"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  Add Tour
                </Link>
              </li>
              <li role="none">
                <Link
                  href="/myTours"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  My Tours
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        <section className="desktop-button">
          <Button
            variant="contained"
            className="nav-btn"
            size="large"
            component={Link}
            href="/addTour"
            sx={{ textDecoration: "none" }}
          >
            Explore Now
          </Button>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
