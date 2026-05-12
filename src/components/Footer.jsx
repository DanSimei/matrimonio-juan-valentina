import React from 'react';

const Footer = () => {
    const baseUrl = import.meta.env.BASE_URL;
    return (
        <footer className="footer">
            <div className="location-info reveal">
                <h3>Ubicación</h3>

                <div className="map-buttons"
                    style={{ display: 'inline-flex', background: 'white', border: '1px solid rgba(184, 150, 62, 0.3)', borderRadius: '50px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                    <a href="https://maps.app.goo.gl/7uwZscuCfjEFgqQR6" target="_blank" rel="noreferrer"
                        style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'background 0.3s' }}>
                        <img src={`${baseUrl}assets/images/google_maps.png`} alt="Google Maps"
                            style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        Google Maps
                    </a>
                    <div style={{ width: '1px', background: 'rgba(184, 150, 62, 0.2)' }}></div>
                    <a href="https://waze.com/ul?ll=6.345234,-75.543663&navigate=yes" target="_blank" rel="noreferrer"
                        style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'background 0.3s' }}>
                        <img src={`${baseUrl}assets/images/waze.png`} alt="Waze"
                            style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        Waze
                    </a>
                </div>
            </div>

            <p style={{ marginTop: '50px', opacity: 0.6, fontSize: '10px', letterSpacing: '2px' }}>
                JUAN & VALENTINA • 2026
            </p>
        </footer>
    );
};

export default Footer;
