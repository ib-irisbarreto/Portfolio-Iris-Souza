import React, { useState, useEffect, useRef } from "react";

import { t } from "../translations";

import './styles/Header_Slider.css';


const sliderImages = [
  '/photos/ipb.jpg',
  '/photos/ipb.jpg',
  '/photos/ipb.jpg',
  '/photos/ipb.jpg',
  '/photos/ipb.jpg',
];


export default function HeaderSlider() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null); // index of the next image to slide in
  const [direction, setDirection] = useState(1); // 1 for right-to-left, -1 for left-to-right
  const [isSliding, setIsSliding] = useState(false);
  const timeoutRef = useRef(null);
  const SLIDE_DURATION_MS = 7000;

  const startSlide = (nextIdx, dir) => {
    setNext(nextIdx);
    setDirection(dir);
    setIsSliding(true);
    setCurrent(nextIdx);
    setNext(null);
    setIsSliding(false);
  };

  const nextSlide = () => {
    const nextIdx = (current + 1) % sliderImages.length;
    startSlide(nextIdx, 1);
  };
  const prevSlide = () => {
    const nextIdx = (current - 1 + sliderImages.length) % sliderImages.length;
    startSlide(nextIdx, -1);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, SLIDE_DURATION_MS);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [current]);

  // keyboard navigation
useEffect(() => {
	const onKey = (e) => {
		if (e.key === "ArrowLeft") prevSlide();
		if (e.key === "ArrowRight") nextSlide();
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [current]);

  return (
		<header className="header-section">
			{/* Sliding image backgrounds */}
			<div className="slider-background">
				<div
					className={`slider-track ${isSliding ? (direction === 1 ? "slide-left" : "slide-right") : ""}`}
					style={{
						transform: `translateX(-${current * 100}%)`,
					}}
				>
					{sliderImages.map((img, index) => (
						<div
							key={index}
							className="slide"
							style={{
								backgroundImage: `linear-gradient(rgba(247,182,210,0.7),rgba(247,182,210,0.7)), url('${img}')`,
							}}
						/>
					))}
				</div>
			</div>
			{/* End sliding image backgrounds */}
			<div className="slider-text">
				<span>{t("home_header_lineOne")}</span>
				<br/>
				<span>{t("home_header_lineTwo")}</span>
			</div>
			
			{/* Left (previous) button */}
			<button className="slider-btn left" onClick={prevSlide} aria-label="Previous image">‹</button>
			{/* Right (next) button */}
			<button className="slider-btn right" onClick={nextSlide} aria-label="Next image">›</button>

			{/* Navigation progress bars */}
			<div className="progress-container">
				{sliderImages.map((_, idx) => (
					<div
						key={idx}
						className={`progress-bar ${idx === current ? "active" : ""}`}
						onClick={() => setCurrent(idx)}
					>
						<div className="progress-fill" />
					</div>
				))}
			</div>
		</header>
  );
}