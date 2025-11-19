"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Title = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const fullText = "With over two years of experience, I build fast and beautiful web experiences.";

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    const words = titleRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      {
        yPercent: 120,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <h1
      ref={titleRef}
      className="max-w-[800px] italic text-[35px] lg:text-[50px] font-poppins font-[600] overflow-hidden"
    >
      {fullText.split(" ").map((word, index) => (
        <span
          key={index}
          className="word inline-block  mr-[0.3em]"
          style={{ lineHeight: "1.2" }}
        >
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </h1>
  );
};

export default Title;