import React, { useState } from 'react';
import './Carousel.css';

const slides = [
  {
    title: "Slide 1",
    content: "Information about Telkom Akses 1"
  },
  {
    title: "Slide 2",
    content: "Information about Telkom Akses 2"
  },
  {
    title: "Slide 3",
    content: "Information about Telkom Akses 3"
  }
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-content">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].content}</p>
      </div>
      <button className="carousel-button left" onClick={prevSlide}>◀</button>
      <button className="carousel-button right" onClick={nextSlide}>▶</button>
    </div>
  );
}

export default Carousel;
