'use client';
import { useEffect, useRef } from 'react';
import styles from '@/styles/style';
import ServicesCard from './ServicesCard';
import { servicesCardData, type ServiceCardData } from '@/constants/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesSectionRef = useRef(null);
  const servicesContentRef = useRef(null);
  const titleRef = useRef(null);


  useEffect(() => {
    if (!servicesSectionRef.current || !servicesContentRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {

      // نضمن أن المحتوى ظاهر قبل الـ Scroll
      gsap.set(servicesContentRef.current, {
        opacity: 1,
        y: 0,
      });

      // Scroll Animation - effet unique: rotation + mouvement latéral
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Titre va vers la droite
      tl.to(titleRef.current, {
        opacity: 0,
        x: 500,
        scale: 0.8,
        ease: "power2.inOut",
      }, 0);

      // Contenu va vers la gauche avec rotation
      tl.to(servicesContentRef.current, {
        opacity: 0,
        x: -100,
        rotateY: 45,
        scale: 0.8,
        ease: "power2.inOut",
      }, 0);
      
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={servicesSectionRef}
      id="services"
      className={`${styles.padding} relative min-h-[100svh] w-full flex flex-col gap-10 justify-center items-center`}
    >
      <h1 ref={titleRef} className={`${styles.title}`}>I Specialize in ⚡ Rank of Skills</h1>

      <div ref={servicesContentRef} className="flex flex-col gap-5">

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesCardData.map((service, index) => (
            <ServicesCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
