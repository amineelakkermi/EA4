'use client';

import React from 'react';

const Technologies: React.FC = () => {
  const technologies = [
    'Reactjs',
    'Nextjs',
    'Tailwindcss',
    'Typescript',
    'Mongodb',
    'Sanity',
  ];

  const items = Array.from({ length: 8 }, () => technologies).flat();

  return (
    <div className="relative w-full overflow-hidden select-none py-16 border-t border-gray-800 bg-black">
      <div className="track" aria-hidden>
        {items.map((item, index) => (
          <span key={`a-${index}`} className="chunk">
            <a
              className='flex gap-5 items-center'
              href="https://mostaql.com/u/Elakkermi2/portfolio"
              target='_blank'
              rel="noreferrer noopener"
            >
              <span className="label text-white">{item}</span>
              <span className="plane-wrap" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 256 256"
                  className="plane"
                >
                  <path
                    d="M 92 72 C 142.81 72 184 113.19 184 164 C 184 214.81 142.81 256 92 256 C 41.19 256 0 214.81 0 164 C 0 113.19 41.19 72 92 72 Z M 256 0 L 256 256 L 184 256 L 184 72 L 0 72 L 0 0 Z"
                    fill="white"
                  />
                </svg>
              </span>
            </a>
          </span>
        ))}
      </div>
      <div className="track" aria-hidden>
        {items.map((item, index) => (
          <span key={`b-${index}`} className="chunk">
            <a
              className='flex gap-5 items-center'
              rel="noreferrer noopener"
            >
              <span className="label text-gray-100">{item}</span>
              <span className="plane-wrap" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 256 256"
                  className="plane"
                >
                  <path
                    d="M 92 72 C 142.81 72 184 113.19 184 164 C 184 214.81 142.81 256 92 256 C 41.19 256 0 214.81 0 164 C 0 113.19 41.19 72 92 72 Z M 256 0 L 256 256 L 184 256 L 184 72 L 0 72 L 0 0 Z"
                    fill="white"
                  />
                </svg>
              </span>
            </a>
          </span>
        ))}
      </div>

      <style jsx>{`
        .track { position: absolute; left: 0; top: 50%; display: inline-flex; gap: 3.5rem; width: max-content; transform: translateY(-50%); animation: scroll-x 120s linear infinite; white-space: nowrap; will-change: transform; }
        .chunk { display: inline-flex; align-items: center; gap: 1.25rem; }
        .label { font-weight: 900; font-size: clamp(2.25rem, 5vw, 2.5rem); letter-spacing: 0.01em; line-height: 1; }
        .plane-wrap { display: inline-flex; align-items: center; justify-content: center; width: clamp(1.75rem, 5vw, 3rem); height: clamp(1.75rem, 5vw, 3rem); border-radius: 9999px; background: radial-gradient(circle at 30% 30%, rgba(127,255,68,0.45), rgba(127,255,68,0.12) 70%); border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 2px 10px rgba(0,0,0,0.6); transform: translateZ(0); transition: transform 300ms ease, box-shadow 300ms ease, background 300ms ease; animation: plane-pulse 2.2s ease-in-out infinite; }
        .plane { width: 60%; height: 60%; color: #fff; filter: drop-shadow(0 0 4px rgba(0,0,0,0.9)); transition: transform 300ms ease; }
        .chunk:hover .plane-wrap, a:focus-visible .plane-wrap { transform: scale(1.08) rotate(6deg); box-shadow: 0 4px 16px rgba(0,0,0,0.25); }
        .chunk:hover .plane, a:focus-visible .plane { transform: rotate(12deg) translateY(-1px); }
        @keyframes plane-pulse { 0%, 100% { box-shadow: 0 2px 12px rgba(0,0,0,0.1), inset 0 0 10px rgba(127,255,68,0.22); } 50% { box-shadow: 0 4px 16px rgba(0,0,0,0.18), inset 0 0 16px rgba(127,255,68,0.3); } }
        .fade-edges { -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0)); mask-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0)); }
        @keyframes scroll-x { from { transform: translate(0, -50%); } to { transform: translate(-50%, -50%); } }
      `}</style>
    </div>
  );
};

export default Technologies;


