import styles, { layout } from '@/styles/style'
import Image from 'next/image'
import experienceImg from '@/public/experienceImg.png';
import Title from './Title';
import BlurText from './BlurText';

const Experience = () => {
  return (
   <div id='experience' className='relative w-full'>
    <div className={`max-w-7xl mx-auto px-6 sm:px-10 py-24 flex justify-between items-center`}>
      <div className="w-[90%]">
      <BlurText
      text="Turning ideas into meaningful digital solutions"
      delay={150}
      animateBy="words"
      direction="top"
      className="text-[35px] lg:text-[64px] font-poppins font-[600]"/>
      </div>
      <div className="w-[30%]">
        <Image src={experienceImg} width={215} height={215} alt='experience' />
      </div>
    </div>


   </div>
  )
}

export default Experience