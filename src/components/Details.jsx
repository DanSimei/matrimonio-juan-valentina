import React from 'react';

const Details = () => {
    return (
        <section className="details reveal">
            <div className="detail-item">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="detail-text">23 de mayo</span>
            </div>
            <div className="detail-item">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="1.5" />
                    <circle cx="12" cy="10" r="3" strokeWidth="1.5" />
                </svg>
                <span className="detail-text">Salón Betsaida</span>
                <span className="detail-sub">Hermosa Provincia, Bello</span>
            </div>
            <div className="detail-item">
                <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    <polyline points="12 6 12 12 16 14" strokeWidth="1.5" />
                </svg>
                <span className="detail-text">4:00 p.m.</span>
            </div>
        </section>
    );
};

export default Details;
