import React from 'react';
import Image from 'next/image';
import type { ServiceCardData } from '@/constants/data';

type Props = {
  service: ServiceCardData;
  index?: number;
};

const ServicesCard: React.FC<Props> = ({ service, index = 0 }) => {
  const isHighlighted = index === 1; // style différent pour la 2e carte
  return (
    <article
      className={`mt-5 bg-beige hover:rotate-2 group relative hover:rotate-2 overflow-hidden rounded-3xl p-8 border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 ease-out`}
    >
      {/* Icon container avec effet de glow */}
      <div className={`${
        isHighlighted 
          ? 'bg-white/20' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-lime-50 group-hover:to-lime-100'
      } w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500`}>
        <Image
          src={service.img}
          alt={service.title}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3 className={`${
        isHighlighted ? 'text-black' : 'text-gray-900'
      } text-xl font-bold mb-3 leading-tight`}>
        {service.title}
      </h3>

      {/* Description */}
      <p className={`${
        isHighlighted ? 'text-black/80' : 'text-gray-600'
      } text-sm leading-relaxed`}>
        {service.texte}
      </p>

      {/* Decorative element */}
      <div className={`${
        isHighlighted 
          ? 'bg-black/10' 
          : 'bg-gradient-to-r from-lime-400/0 via-lime-400/50 to-lime-400/0'
      } absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
    </article>
  );
};

export default ServicesCard;
