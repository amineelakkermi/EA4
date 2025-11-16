'use client';

import React from 'react';
import { Send } from 'lucide-react';

const EmailScrolling: React.FC = () => {
  const text = 'Get in touch';
  const items = Array.from({ length: 18 }, () => text);

  return (
    <div className="relative w-full overflow-hidden select-none py-16 fade-edges border-t border-gray-200 bg-white">
      <div className="track" aria-hidden>
        {items.map((item, index) => (
          <span key={`a-${index}`} className="chunk">
            <a
              className='flex gap-5 items-center'
              href="https://mostaql.com/u/Elakkermi2/portfolio"
              target='_blank'
              rel="noreferrer noopener"
            >
              <span className="label text-black">{item}</span>
              <span className="plane-wrap" aria-hidden>
                <Send className="plane" />
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
              href="https://mostaql.com/u/Elakkermi2/portfolio"
              target='_blank'
              rel="noreferrer noopener"
            >
              <span className="label text-black">{item}</span>
              <span className="plane-wrap" aria-hidden>
                <Send className="plane" />
              </span>
            </a>
          </span>
        ))}
      </div>

      <style jsx>{`
        .track { position: absolute; left: 0; top: 50%; display: inline-flex; gap: 3.5rem; width: max-content; transform: translateY(-50%); animation: scroll-x 60s linear infinite; white-space: nowrap; will-change: transform; }
        .chunk { display: inline-flex; align-items: center; gap: 1.25rem; }
        .label { font-weight: 900; font-size: clamp(2.25rem, 5vw, 2.5rem); letter-spacing: 0.01em; line-height: 1; }
        .plane-wrap { display: inline-flex; align-items: center; justify-content: center; width: clamp(1.75rem, 5vw, 3rem); height: clamp(1.75rem, 5vw, 3rem); border-radius: 9999px; background: radial-gradient(circle at 30% 30%, rgba(127,255,68,0.3), rgba(127,255,68,0.08) 70%); border: 1px solid rgba(0,0,0,0.12); box-shadow: 0 2px 10px rgba(0,0,0,0.12); transform: translateZ(0); transition: transform 300ms ease, box-shadow 300ms ease, background 300ms ease; animation: plane-pulse 2.2s ease-in-out infinite; }
        .plane { width: 60%; height: 60%; color: #000000; filter: drop-shadow(0 0 4px rgba(0,0,0,0.18)); transition: transform 300ms ease; }
        .chunk:hover .plane-wrap, a:focus-visible .plane-wrap { transform: scale(1.08) rotate(6deg); box-shadow: 0 4px 16px rgba(0,0,0,0.25); }
        .chunk:hover .plane, a:focus-visible .plane { transform: rotate(12deg) translateY(-1px); }
        @keyframes plane-pulse { 0%, 100% { box-shadow: 0 2px 12px rgba(0,0,0,0.1), inset 0 0 10px rgba(127,255,68,0.22); } 50% { box-shadow: 0 4px 16px rgba(0,0,0,0.18), inset 0 0 16px rgba(127,255,68,0.3); } }
        .fade-edges { -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0)); mask-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0)); }
        @keyframes scroll-x { from { transform: translate(0, -50%); } to { transform: translate(-50%, -50%); } }
      `}</style>
    </div>
  );
};

export default EmailScrolling;


