import React, { useEffect } from "react";
import Navbar from './shared/Navbar';
import "tailwindcss/tailwind.css";
import News1 from "@/assets/news-1.jpeg";
import News2 from "@/assets/news-2.jpeg";
import News3 from "@/assets/news-3.jpeg";
import News4 from "@/assets/news-4.jpeg";
import News5 from "@/assets/news-5.jpeg";

const images = [News1, News2, News3, News4, News5];
const NewsPage = () => {


  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById("stars-container");
      if (!starsContainer) return;
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "absolute bg-white rounded-full opacity-75 animate-twinkle move-stars";
        
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        
        starsContainer.appendChild(star);
      }
    };
    createStars();
  }, []);

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 via-black to-black z-0"></div>
      
      {/* Star Container (Fixed to cover full viewport) */}
      <div id="stars-container" className="fixed inset-0 z-0 w-full h-full"></div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* News Section */}
      <div className="flex flex-col items-center justify-center flex-grow pt-10 relative z-10">
        <h1 className="text-white text-4xl font-bold mb-8 animate-bounce">Latest News</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-10">
          {images.map((src, index) => (
            <div 
              key={index} 
              className="group relative cursor-pointer transform transition duration-300 hover:scale-105 w-80 h-85 overflow-hidden rounded-lg border-2 border-gray-700 group-hover:border-yellow-400 group-hover:shadow-yellow-400/50"
              
            >
              <img 
                src={src} 
                alt={`News ${index + 1}`} 
                className="w-full h-full object-fit"
              />
              
            </div>
          ))}
        </div>
      </div>

      <style>
        {`@keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .animate-twinkle {
          animation: twinkle 3s infinite alternate;
        }

        @keyframes moveStars {
          from { transform: translateY(0); }
          to { transform: translateY(-100vh); }
        }

        .move-stars {
          animation: moveStars 10s linear infinite;
        }`}
      </style>
    </div>
  );
};

export default NewsPage;
