'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/style'
import BlurText from './BlurText';

interface Feedback{
  _id: string;
  name: string;
  role: string;
  content: string,
}

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // 🧩 جلب البيانات من API
  useEffect(() => {
   const fetchFeedbacks = async () => {
    try{
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setFeedbacks(data.feedbacks);
    } catch(error){
      console.log(error);
    }
   }
   fetchFeedbacks();
  } , []);

  return (
    <section
      id="testimonials"
      className={`${styles.padding} snap-start snap-always w-full flex items-center flex-col gap-10`}
      aria-labelledby="feedbacks-title"
    >
      {/* Header */}
      <div className="w-full max-w-6xl border-b border-black/40 py-8">
        <h1 className={`${styles.title}`}>Client Testimonials</h1>
      </div>

      {/* Carousel Track */}
      {feedbacks.length > 0 ? (
        <div className="w-full overflow-hidden py-4">
          <div className="feedback-carousel">
            {[...feedbacks, ...feedbacks, ...feedbacks, ...feedbacks].map((fb, index) => (
              <article
                key={`${fb._id}-${index}`}
                className="feedback-item shrink-0 w-[88vw] sm:w-[560px] lg:w-[640px] bg-black text-white rounded-2xl ring-1 ring-black p-6 sm:p-8 md:p-10"
              >
                <p className="text-lg md:text-xl leading-relaxed">{fb.content}</p>
                <div className="mt-6 flex items-center gap-2 text-sm md:text-base">
                  <span className="font-semibold">{fb.name}</span>
                  <span className="text-white/70">, {fb.role}</span>
                </div>
              </article>
            ))}
          </div>

          <style jsx>{`
            .feedback-carousel {
              display: flex;
              gap: 1.5rem;
              animation: scroll-carousel 60s linear infinite;
              width: max-content;
            }
            .feedback-item {
              flex-shrink: 0;
            }
            @keyframes scroll-carousel {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-25% - 0.375rem));
              }
            }
            .feedback-carousel:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      ) : (
        <div className="w-full max-w-6xl text-center py-20">
          <p className="text-gray-500">Aucun feedback disponible pour le moment.</p>
        </div>
      )}
    </section>
  )
}
