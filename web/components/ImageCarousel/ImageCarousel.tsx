"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function ModernImageCarousel(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  
  const images: ImageItem[] = [
    { 
      src: "/images/img1.jpg", 
      alt: "Aromatic Spices", 
      title: "From the Hills of Idukki ",
      description: "Experience the purest spices, handpicked with love."
    },
    { 
      src: "/images/img3.jpg", 
      alt: "Spices and Herbs", 
      title: "Taste the Tradition",
      description: "Authentic Indian spices, grown naturally in the Western Ghats."
    },
    { 
      src: "/images/img3.jpg", 
      alt: "Spices and Herbs", 
      title: "Spice Up Your Life, Naturally",
      description: "Discover the aroma of freshly harvested cardamom, pepper, and more."
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, images.length]);

  const nextSlide = (): void => {
    setIsAutoplay(false);
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setIsAutoplay(false);
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setIsAutoplay(false);
    setCurrentSlide(index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Welcome to Spicera  </h1>
      <p className=' font-bold text-center mb-6'>The Soul of Pure Spices</p>
      
      <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <Image
                width={1000}      
                height={500}
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
                <p className="text-lg">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={prevSlide}
            className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-r-lg p-3 ml-1 focus:outline-none transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={30} />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={nextSlide}
            className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-l-lg p-3 mr-1 focus:outline-none transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={30} />
          </button>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0">
          <div className="flex justify-center space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}