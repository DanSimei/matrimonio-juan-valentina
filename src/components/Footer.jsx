import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">¡Te esperamos para celebrar juntos<br />este día tan especial!</p>

            <div className="location-section">
                <div className="icon-btn" style={{ margin: '0 auto 10px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </div>
                <p className="detail-text" style={{ marginBottom: '20px', letterSpacing: '2px' }}>Cómo llegar</p>

                <div className="nav-capsule"
                    style={{ display: 'inline-flex', background: 'white', border: '1px solid rgba(184, 150, 62, 0.3)', borderRadius: '50px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                    <a href="https://maps.app.goo.gl/7uwZscuCfjEFgqQR6" target="_blank" rel="noreferrer"
                        style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'background 0.3s' }}>
                        <img src="/matrimonio-juan-valentina/assets/images/google_maps.png" alt="Google Maps"
                            style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        Google Maps
                    </a>
                    <div style={{ width: '1px', background: 'rgba(184, 150, 62, 0.3)', margin: '10px 0' }}></div>
                    <a href="https://waze.com/ul?ll=6.345234,-75.543663&navigate=yes" target="_blank" rel="noreferrer"
                        style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'background 0.3s' }}>
                        <img src="/matrimonio-juan-valentina/assets/images/waze.png" alt="Waze"
                            style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        Waze
                    </a>
                </div>
            </div>

            <div style={{ marginTop: '25px', opacity: 0.3 }}>
                <svg width="100" height="10" viewBox="0 0 100 10">
                    <path d="M0 5 Q25 0 50 5 Q75 10 100 5" stroke="var(--accent)" fill="none" />
                </svg>
            </div>
        </footer>
    );
};

export default Footer;
