import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import PhotoSection from './components/PhotoSection';
import Countdown from './components/Countdown';
import Details from './components/Details';
import GiftSection from './components/GiftSection';
import Footer from './components/Footer';
import RSVPModal from './components/RSVPModal';
import WelcomeScreen from './components/WelcomeScreen';

const WeddingInvitation = () => {
    const { guestName, status } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const weddingDate = '2026-05-23T16:00:00';
    const baseUrl = import.meta.env.BASE_URL;

    // Check if the guest is restricted to coming alone
    const canHaveGuest = status !== 'alone';

    // Format the guest name: decode URL characters and replace hyphens with spaces
    const formattedName = guestName ? decodeURIComponent(guestName).replace(/-/g, ' ') : '';

    useEffect(() => {
        if (!hasEntered) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);
        }
    }, [hasEntered]);

    useEffect(() => {
        if (hasEntered) {
            // Delay slightly to match the fade-in start
            const timer = setTimeout(() => {
                const revealElements = document.querySelectorAll('.reveal');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                        }
                    });
                }, { threshold: 0.15 });

                revealElements.forEach(el => observer.observe(el));

                return () => observer.disconnect();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [hasEntered]);

    return (
        <>
            {!hasEntered && (
                <WelcomeScreen 
                    guestName={formattedName} 
                    onEnter={() => setHasEntered(true)} 
                />
            )}
            
            <div 
                className={`container ${hasEntered ? 'visible' : ''}`} 
                style={{ visibility: hasEntered ? 'visible' : 'hidden' }}
            >
                <div className="top-wrapper">
                    <div className="corner-fl corner-tl">
                        <img src={`${baseUrl}assets/images/corner_br.png`} alt="" />
                    </div>
                    <div className="corner-fl corner-tr">
                        <img src={`${baseUrl}assets/images/corner_br.png`} alt="" />
                    </div>

                    <Header />
                    <PhotoSection />
                </div>

                <div className="corner-fl corner-bl">
                    <img src={`${baseUrl}assets/images/corner_br.png`} alt="" />
                </div>
                <div className="corner-fl corner-br">
                    <img src={`${baseUrl}assets/images/corner_br.png`} alt="" />
                </div>

                <Countdown targetDate={weddingDate} />
                <Details />
                <GiftSection />

                <button className="btn-confirm" onClick={() => setIsModalOpen(true)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                        </path>
                    </svg>
                    Confirmar Asistencia
                </button>

                <Footer />

                <RSVPModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    prefilledName={formattedName}
                    canHaveGuest={canHaveGuest}
                />
            </div>
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<WeddingInvitation />} />
            <Route path="/:guestName" element={<WeddingInvitation />} />
            <Route path="/:guestName/:status" element={<WeddingInvitation />} />
        </Routes>
    );
}

export default App;
