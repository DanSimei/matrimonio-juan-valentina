import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <p className="nos-casamos">Nos Casamos</p>
            <img src="/matrimonio-juan-valentina/assets/images/separador1.png" className="separator-img" alt="Separador" />
            <h1 className="names">Juan Esteban</h1>
            <span className="ampersand">&</span>
            <h1 className="names">Valentina</h1>

            <svg className="vine-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 Q40 0 100 10 Q160 20 190 10" stroke="#b8963e" strokeWidth="0.8" />
                <path d="M70 12 Q80 18 90 12 M110 12 Q120 18 130 12" stroke="#b8963e" strokeWidth="0.5" />
                <circle cx="100" cy="10" r="2.5" fill="#b8963e" />
            </svg>
        </header>
    );
};

export default Header;
