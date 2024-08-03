import React, { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion';
import images from './images';
import './Carousel.css';

const Carousel = () =>{
const [width,setWidth]=useState(0);
const CarouselRef=useRef();
useEffect(()=>{
    console.log(CarouselRef.current.scrollWidth);
    console.log(CarouselRef.current.offsetWidth);

    
    setWidth(CarouselRef.current.scrollWidth-CarouselRef.current.offsetWidth)
},[])

  return (
<>
<motion.div className='carousel' ref={CarouselRef}>
    <motion.div drag='x' dragConstraints={{right:0,left:-width}} className='inner-carousel'>
{images.map((image)=>(
    <motion.div className='item'>
        <img src={image} alt="pic" />
    </motion.div>
))}

    </motion.div>
</motion.div>
</>
  )
};

export default Carousel;
