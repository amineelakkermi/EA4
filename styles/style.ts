const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",
  
    title: "text-[35px] lg:text-[60px] font-poppins font-[600]",
    paragraph: "font-normal text-[18px] leading-[30.8px]",
    paragraph2: "font-normal text-[14px] lg:text-[22px] leading-[30.8px] lg:leading-[45px]",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
    paddingX: "lg:px-16 px-6",
    paddingY: "lg:py-16 py-12",
    padding: "lg:px-12 px-6 lg:py-12 py-6",
    marginX: "lg:mx-16 mx-6",
    marginY: "lg:my-16 my-6",
};

export const layout = {
    sectionRow: `flex lg:flex-row flex-col ${styles.paddingY}`,
    sectionColumn: `flex flex-col ${styles.paddingY}`,
    sectionReverse: `flex lg:flex-row flex-col-reverse ${styles.paddingY}`,
  
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} lg:mr-10 mr-0 lg:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} lg:ml-10 ml-0 lg:mt-0 mt-24 relative`,
  
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
