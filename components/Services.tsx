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
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');
      
      // État initial: toutes les cartes cachées sauf la première
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.9 });
      if (cards[0]) gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });

      // Timeline principale avec pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: 'top top',
          end: '+=400%', // 4 sections: carte1 visible, carte2 apparaît, carte3 apparaît, disparition
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Phase 1: Carte 1 déjà visible (0-25%)
      // Phase 2: Carte 2 apparaît (25-50%)
      if (cards[1]) {
        tl.to(cards[1], {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
        }, 0.25);
      }

      // Phase 3: Carte 3 apparaît (50-75%)
      if (cards[2]) {
        tl.to(cards[2], {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
        }, 0.5);
      }

      // Phase 4: Disparition de tout (75-100%)
      // Titre va vers la droite
      tl.to(titleRef.current, {
        opacity: 0,
        x: 500,
        scale: 0.8,
        ease: "power2.inOut",
      }, 0.75);

      // Contenu va vers la gauche avec rotation
      tl.to(servicesContentRef.current, {
        opacity: 0,
        x: -100,
        rotateY: 45,
        scale: 0.8,
        ease: "power2.inOut",
      }, 0.75);
      
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
            <div key={service.id} className="service-card">
              <ServicesCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
