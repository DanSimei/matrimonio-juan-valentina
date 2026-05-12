import React, { useState } from 'react';

const WelcomeScreen = ({ guestName, onEnter }) => {
    const [isFading, setIsFading] = useState(false);
    const baseUrl = import.meta.env.BASE_URL;

    const handleEnter = () => {
        setIsFading(true);
        setTimeout(onEnter, 800); // Wait for transition
    };

    return (
        <div className={`welcome-overlay ${isFading ? 'fade-out' : ''}`}>
            <div className="welcome-content">
                {/* Decorative corners */}
                <div className="corner-fl corner-tl" style={{ opacity: 0.4 }}>
                    <img src={`${baseUrl}assets/images/corner_br.png`} alt="" />
                </div>
                <div className="corner-fl corner-br" style={{ opacity: 0.4 }}>
                    <img src={`${baseUrl}assets/images/corner_br.png`} alt="" />
                </div>

                <p className="welcome-greeting">¡Hola!</p>
                
                {guestName ? (
                    <h2 className="welcome-name">{guestName}</h2>
                ) : (
                    <h2 className="welcome-name">Te estábamos esperando</h2>
                )}

                <svg className="welcome-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10 Q40 0 100 10 Q160 20 190 10" stroke="#b8963e" strokeWidth="0.8" />
                    <circle cx="100" cy="10" r="2.5" fill="#b8963e" />
                </svg>

                <p className="welcome-message">
                    Estamos muy felices de compartir este momento tan especial contigo.
                </p>

                <button className="btn-confirm" onClick={handleEnter}>
                    Ver Invitación
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
