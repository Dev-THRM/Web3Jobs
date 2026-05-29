import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bitcoin from '../assets/bitcoin.png';
import cardano from '../assets/Cardano.png';
import dogecoin from '../assets/dogecoin.png';
import dot from '../assets/polkadot.png';
import solana from '../assets/solana.png';
import stellar from '../assets/stellar.png';
import thether from '../assets/thether.png';
import ether from '../assets/etherium.png';
import tron from '../assets/tron.png';
import shiba from '../assets/shiba.png';
import usd from '../assets/usd.png';
import litecoin from '../assets/litecoin.png';
import Binance from '../assets/Binance.png';
import Toncoin from '../assets/Toncoin.png';
import Ripple from '../assets/Ripple.png';
import Avalanche from '../assets/Avalanche.png';
import rubble from '../assets/rubble.png';
import Chainlink from '../assets/Chainlink.png';
import CryptoTicker from './CryptoTicker';
import AboutUs from './AboutUs';


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/');
    }
  }, []);

  // Styling for animated gradient background and images
  const containerStyles = {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  };

  const backgroundStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, #121212, #1e1e1e, #006633, #006633)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 15s ease infinite',
    zIndex: -2,
  };

  const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1,
    opacity: 0.4,  // Decrease opacity here (0 is fully transparent, 1 is fully opaque)
  };
  

  const contentStyles = {
    position: 'relative',
    zIndex: 1,
    color: '#e0e0e0',
  };

  const cryptoImages = [cardano,solana,dogecoin,dot,stellar,thether,bitcoin,ether,tron,shiba,usd,litecoin,Binance,Toncoin,Ripple,Avalanche,rubble,Chainlink];

  return (
    <div style={containerStyles}>
      {/* Animated Background */}
      <div style={backgroundStyles}></div>

      {/* Floating Crypto Coins */}
      <div style={imageStyles}>
        {cryptoImages.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`Crypto Coin ${i + 1}`}
            className="crypto-coin"
          />
        ))}
      </div>

      {/* Content */}
      <div style={contentStyles}>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <AboutUs/>
        <Footer />
        <CryptoTicker/>

      </div>

      {/* Animations and Styles */}
      <style>
        {`
          /* Gradient Animation */
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          /* Floating Coin Animation */
          .crypto-coin {
            position: absolute;
            width: 40px; /* Adjust size of the coin */
            height: 40px;
            animation: floatCrypto 8s infinite ease-in-out;
            opacity: 0.8;
          }

          /* Random Positioning for Coins */
          ${cryptoImages
            .map(
              (_, i) => `
                .crypto-coin:nth-child(${i + 1}) {
                  top: ${Math.random() * 100}%;
                  left: ${Math.random() * 100}%;
                  animation-duration: ${Math.random() * 5 + 5}s;
                  animation-delay: ${Math.random() * 3}s;
                }
              `
            )
            .join('')}

          /* Floating Coin Animation */
          @keyframes floatCrypto {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateY(-30px) scale(1.1);
              opacity: 0.7;
            }
            100% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;