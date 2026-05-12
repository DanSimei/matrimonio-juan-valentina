import React, { useState, useEffect } from 'react';

const RSVPModal = ({ isOpen, onClose, prefilledName }) => {
    const baseUrl = import.meta.env.BASE_URL;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: prefilledName || '',
        asistencia: 'Sí',
        invitados: '1',
        mensaje: ''
    });

    // Update name if prefilledName prop changes
    useEffect(() => {
        if (prefilledName) {
            setFormData(prev => ({ ...prev, nombre: prefilledName }));
        }
    }, [prefilledName]);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWHVICDd2GsUJ-FMRqz6Re0BYTTiDnttyHg5cgGkuFd9dzh3e3IPYbvLyFUJvXR_OO/exec';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            ...formData,
            key: 'boda2026'
        };

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar. Por favor intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>&times;</button>

                {!isSubmitted ? (
                    <div id="rsvp-form-container">
                        <h2 className="rsvp-title">Confirmar Asistencia</h2>
                        <form className="rsvp-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Escribe tu nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>¿Asistirás?</label>
                                <div className="radio-group">
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name="asistencia"
                                            value="Sí"
                                            checked={formData.asistencia === 'Sí'}
                                            onChange={handleChange}
                                        /> Sí, ¡allí estaré!
                                    </label>
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name="asistencia"
                                            value="No"
                                            checked={formData.asistencia === 'No'}
                                            onChange={handleChange}
                                        /> Lo siento, no puedo
                                    </label>
                                </div>
                            </div>

                            {/* Removed guests select as per user request (1 person per link) */}
                            <input type="hidden" name="invitados" value="1" />

                            <div className="form-group">
                                <label htmlFor="mensaje">Mensaje (Opcional)</label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    rows="3"
                                    placeholder="Alguna restricción alimenticia o saludo..."
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-submit" disabled={isLoading}>
                                {isLoading ? 'Enviando...' : 'Enviar Confirmación'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div id="success-message" style={{ display: 'block' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <img src={`${baseUrl}assets/images/hearth.png`} alt="heart" style={{ width: '50px', height: 'auto' }} />
                        </div>
                        <h2>¡Muchas Gracias!</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Tu respuesta ha sido registrada.</p>
                        <button className="btn-submit" style={{ width: '100%', marginTop: '20px' }} onClick={onClose}>Cerrar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RSVPModal;
