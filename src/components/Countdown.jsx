import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

const Countdown = ({ targetDate }) => {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);

    return (
        <section className="countdown reveal">
            <div className="countdown-title">
                <img src="assets/images/hearth.png" alt="heart" style={{ width: '14px', height: 'auto' }} />
                <span>Faltan para nuestro gran día</span>
                <img src="assets/images/hearth.png" alt="heart" style={{ width: '14px', height: 'auto' }} />
            </div>
            <div className="countdown-row">
                <div className="count-item">
                    <span className="count-num">{days}</span>
                    <span className="count-label">Días</span>
                </div>
                <div className="count-item">
                    <span className="count-num">{hours}</span>
                    <span className="count-label">Horas</span>
                </div>
                <div className="count-item">
                    <span className="count-num">{minutes}</span>
                    <span className="count-label">Minutos</span>
                </div>
                <div className="count-item">
                    <span className="count-num">{seconds}</span>
                    <span className="count-label">Segundos</span>
                </div>
            </div>
            <img src="assets/images/separador1.png" className="separator-img" alt="Separador" />
        </section>
    );
};

export default Countdown;
