import React from 'react';
import useCountdown from '../hooks/useCountdown';

const Countdown = ({ targetDate }) => {
    const timeLeft = useCountdown(targetDate);
    const baseUrl = import.meta.env.BASE_URL;

    return (
        <section className="countdown reveal">
            <div className="countdown-title">
                <img src={`${baseUrl}assets/images/hearth.png`} alt="heart" style={{ width: '14px', height: 'auto' }} />
                <span>Faltan para nuestro gran día</span>
                <img src={`${baseUrl}assets/images/hearth.png`} alt="heart" style={{ width: '14px', height: 'auto' }} />
            </div>
            <div className="countdown-row">
                <div className="count-item">
                    <span className="count-number">{timeLeft.days}</span>
                    <span className="count-label">Días</span>
                </div>
                <div className="count-item">
                    <span className="count-number">{timeLeft.hours}</span>
                    <span className="count-label">Horas</span>
                </div>
                <div className="count-item">
                    <span className="count-number">{timeLeft.minutes}</span>
                    <span className="count-label">Minutos</span>
                </div>
                <div className="count-item">
                    <span className="count-number">{timeLeft.seconds}</span>
                    <span className="count-label">Segundos</span>
                </div>
            </div>
            <img src={`${baseUrl}assets/images/separador1.png`} className="separator-img" alt="Separador" />
        </section>
    );
};

export default Countdown;
