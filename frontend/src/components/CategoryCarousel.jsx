import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Blockchain Developer",
    // "Smart-Contract Developer",
    "Solidity Developer",
    "Web3 Developer",
    "Blockchain Architect",
    "Cryptocurrency Analyst",
    "Project Manager",
    "Security Engineer",
    "UX/UI Designer",
    "Community Manager",
    "Blockchain Researcher",
    "Blockchain Tester",
    "Ethereum Developer",
    "NFT Developer",
    "Metaverse Developer",
    "DeFi Developer",
    "Crypto Officer",
    "Crypto Auditor",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Database Administrator",
    "Cloud Engineer",
    "Cybersecurity Specialist",
    "Data Scientist",
    "AI/ML Engineer",
    "Systems Administrator",
    "IT Support Specialist",
    "Network Engineer",
    "Software Engineer",
    "Game Developer",
    "Technical Writer",
    "QA Engineer",
    "Product Manager",
    "DevOps Manager",
    "Blockchain Consultant",
    "Blockchain Developer",
    "Test Automation Engineer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const nextButton = carouselRef.current.querySelector('.carousel-next');
                if (nextButton) {
                    nextButton.click(); // Simulate a click on the "next" button
                }
            }
        }, 3000); // Slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div>
            <Carousel
                ref={carouselRef}
                className="w-full max-w-xl mx-auto my-20 text-black"
            >
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="category-item md:basis-1/3 lg:basis-1/3 sm:basis-1/2 sm:mx-1"
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                style={{
                                    background: "linear-gradient(90deg, #81c315 0%, #ffd300 100%)",
                                    color: "white",
                                }}
                                className="rounded-full w-full"
                            >
                                <span className="category-text">{cat}</span>
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="carousel-next" /> {/* Add a class for targeting */}
            </Carousel>
            <style jsx>{`
                /* Set flex-basis to 0 for mobile screens */
                .category-item {
                    flex-basis: 0; /* Default to 0 on mobile */
                }

                /* For screens larger than 300px */
                @media (min-width: 300px) {
                    .category-item {
                        flex-basis: 40%; /* Two items per row */
                    }
                }

                /* Adjust font size for different screen sizes */
                .category-text {
                    font-size: 0.65rem; /* Default font size for mobile */
                }

                @media (min-width: 400px) {
                    .category-text {
                        font-size: 0.85rem; /* Slightly larger font size */
                    }
                }

                @media (min-width: 600px) {
                    .category-text {
                        font-size: 0.9rem; /* Larger font size for tablets and desktops */
                    }
                }

                @media (min-width: 900px) {
                    .category-text {
                        font-size: 1rem; /* Even larger font size for larger screens */
                    }
                }
            `}</style>
        </div>
    );
};

export default CategoryCarousel;