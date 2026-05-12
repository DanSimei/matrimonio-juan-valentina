import React from 'react';

const Header = () => {
    const baseUrl = import.meta.env.BASE_URL;
    return (
        <header className="header">
            <p className="nos-casamos">Nos Casamos</p>
            <img src={`${baseUrl}assets/images/separador1.png`} className="separator-img" alt="Separador" />
            <h1 className="names">Juan</h1>
            <span className="ampersand">&</span>
            <h1 className="names">Valentina</h1>

            <svg className="vine-divider" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20 Q50 10 100 20 Q150 30 190 20" stroke="#2d4a1e" strokeWidth="1" />
                <path d="M40 15 L45 10 M160 15 L155 10" stroke="#b8963e" strokeWidth="1" />
                <circle cx="100" cy="20" r="3" fill="#b8963e" />
            </svg>
        </header>
    );
};

export default Header;
