import React, { useEffect, useRef, useCallback } from "react";
import "./NavBar.css";
import mylogo from "../../image/smlogo.png";

const NavBar = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const pRef = useRef(null);

  const startHackerEffect = useCallback(() => {
    let iteration = 0;
    let intervalId = null;
    clearInterval(intervalId);

    intervalId = setInterval(() => {
      if (!pRef.current) return; // Add null check

      pRef.current.innerText = pRef.current.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return pRef.current.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= pRef.current.dataset.value.length) {
        clearInterval(intervalId);
      }

      iteration += 1 / 3;
    }, 100);

    return () => clearInterval(intervalId);
  }, [letters]);

  useEffect(() => {
    if (pRef.current) {
      // Add another null check before starting effect
      const intervalId = startHackerEffect();
      return () => clearInterval(intervalId);
    }
  }, [startHackerEffect]);

  return (
    <div className="navbar">
      <div className="navbarComponent">
        <div className="logo">
          <img src={mylogo} alt="logo" />
        </div>
        <div className="navLogo">
          <p ref={pRef} data-value="albums collection">
            albums collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
