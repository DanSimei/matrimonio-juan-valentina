import React from 'react';

const PhotoSection = () => {
    return (
        <section className="photo-container">
            <div className="photo-wrapper">
                <img src="/matrimonio-juan-valentina/assets/images/valentina.png" className="photo-half photo-valentina" alt="Valentina" />
                <img src="/matrimonio-juan-valentina/assets/images/juan.png" className="photo-half photo-juan" alt="Juan" />
            </div>
            <div className="wavy-divider">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,213.3C960,224,1056,192,1152,160C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path>
                </svg>
            </div>
        </section>
    );
};

export default PhotoSection;
