import React from 'react';
import styles from '@/styles/style';
import ServicesCard from './ServicesCard';
import { servicesCardData, type ServiceCardData } from '@/constants/data';
import Title from './Title';
import BlurText from './BlurText';

const Services: React.FC = () => {
  return (
    <section
      id='services'
      className={`${styles.padding} relative min-h-[100svh] w-full flex flex-col gap-10 justify-center items-center`}
    >
    
      <div className='gradient2' />


      <BlurText
      text="I Specialize in ⚡ Rank of Skills"
      delay={150}
      animateBy="words"
      direction="top"
      className={`${styles.title}`}/>

     

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesCardData.map((service: ServiceCardData, index: number) => (
          <ServicesCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
