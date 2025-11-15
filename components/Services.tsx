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
      className={`${styles.padding} relative min-h-screen w-full flex flex-col gap-10 justify-center items-center`}
    >



      <BlurText
      text="I Specialize in ⚡ Rank of Skills"
      delay={150}
      animateBy="words"
      direction="top"
      className="text-[35px] lg:text-[64px] font-poppins font-[600]"/>

     

      <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesCardData.map((service: ServiceCardData, index: number) => (
          <ServicesCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
