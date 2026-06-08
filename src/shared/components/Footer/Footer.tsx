import React from 'react';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="logo">
        <img
          src="https://i.ibb.co/5hh0k7jy/Logo.png"
          className="log"
          alt="logo"
        />
      </div>

      <div className="info">
        <a
          href="#"
          className="contact"
        >
          github
        </a>

        <a
          href="#"
          className="contact"
        >
          contacts
        </a>

        <a
          href="#"
          className="contact"
        >
          rights
        </a>
      </div>
      <div className="container">
        <a
          href="#"
          className="back"
        >
          Back to top
        </a>

        <a href="#">
          <img
            src="https://i.ibb.co/mChJNHdX/Slider-button-Default-right.png"
            className="slider__button"
            alt="slider button"
          />
        </a>
      </div>
    </div>
  );
};
