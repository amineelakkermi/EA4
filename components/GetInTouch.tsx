'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const GetInTouch = () => {
  const lineRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation de la ligne verticale
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        y: -150,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#getInTouch",
          start: "bottom 150%",
          end: "bottom 0%",
          scrub: 1.5,
        }
      });
    }

    // Animation du div flottant
    if (divRef.current) {
      gsap.to(divRef.current, {
        x: -850,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#getInTouch",
          start: "bottom 100%",
          end: "bottom 0%",
          scrub: 3.5,
        }
      });
    }

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="getInTouch"
      className="snap-start snap-always relative my-16 rounded-[15px] min-h-[600px] w-full flex justify-center items-center bg text-white px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto text-center md:text-left">
        {/* TITLE */}
      <h1 className="text-[35px] md:text-[55px] font-light leading-tight tracking-wide">
      Got an <span className='italic font-semibold text-yellow'>idea</span> <span className="italic font-semibold">in your</span> 
      <span className="italic font-semibold"> mind</span> ? <br />
      Let's turn it into<span className="italic font-semibold text-yellow"> reality</span> today!
      </h1>


        {/* BUTTON */}
        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-4 text-[18px] underline hover:opacity-70 transition-all duration-300">
            Get in Touch Now
            <span className="text-[26px]">→</span>
          </a>
        </div>

        {/* FLOATING DIV */}
        <div
          ref={divRef}
          className="absolute right-[10%] bottom-[5%] w-[150px] md:w-[200px] h-[50px] md:h-[80px] rounded-[53px] bg-yellow shadow-lg"
        />

        {/* SCROLLING LINE */}
        <hr
          ref={lineRef}
          className="h-[100px] w-[1px] bg-gray-300 absolute right-[2%] md:right-[10%] bottom-[35%]"
        />
      </div>
    </section>
  );
};

export default GetInTouch;
