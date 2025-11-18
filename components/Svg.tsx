'use client';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

const Svg = () => {
  const leftIconRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(leftIconRef.current, {
      rotate: 360, // rotation complète
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 90%",
        end: "bottom 100%",
        scrub: 1.5,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={leftIconRef}
      className=""
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[50px] md:w-[80px] h-[50px] md:h-[80px]"
        viewBox="0 0 256 256"
        fill="none"
      >
        <path
          d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z"
          fill="#B4E50D"
        />
      </svg>
    </div>
  );
};

export default Svg;
