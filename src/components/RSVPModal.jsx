import React, { useState, useEffect } from 'react';

const RSVPModal = ({ isOpen, onClose, prefilledName }) => {
    const baseUrl = import.meta.env.BASE_URL;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasGuest, setHasGuest] = useState(false);
    const [formData, setFormData] = useState({
        nombre: prefilledName || '',
        asistencia: 'Sí',
        invitados: '1',
        acompanante: '',
        mensaje: ''
    });

    useEffect(() => {
        if (prefilledName) {
            setFormData(prev => ({ ...prev, nombre: prefilledName }));
        }
    }, [prefilledName]);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwV2oUwSO_PJZ0qE5bdGwAKm2csQ8IDgxWQEkpEgqpaLHTa0Wimy3SpsKczivNElSda/exec';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'hasGuest') {
            setHasGuest(checked);
            // We update invitados immediately to keep it in sync
            setFormData(prev => ({ ...prev, invitados: checked ? '2' : '1' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Explicitly construct the data to ensure keys are exactly as expected by GAS
        const payload = {
            nombre: formData.nombre.trim(),
            asistencia: formData.asistencia,
            invitados: hasGuest ? "2" : "1",
            acompanante: hasGuest ? (formData.acompanante.trim() || "Acompañante pendiente") : "N/A",
            mensaje: formData.mensaje.trim() || "Sin mensaje",
            key: "boda2026"
        };

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(payload)
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
                                <label htmlFor="nombre">Tu Nombre Completo</label>
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

                            {formData.asistencia === 'Sí' && (
                                <>
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            id="hasGuest"
                                            name="hasGuest"
                                            checked={hasGuest}
                                            onChange={handleChange}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="checkbox-label">Llevaré un acompañante</span>
                                    </label>

                                    {hasGuest && (
                                        <div className="form-group reveal active" style={{ animation: 'fadeInUp 0.5s ease' }}>
                                            <label htmlFor="acompanante">Nombre del Acompañante</label>
                                            <input
                                                type="text"
                                                id="acompanante"
                                                name="acompanante"
                                                placeholder="Nombre de tu pareja o amigo"
                                                required={hasGuest}
                                                value={formData.acompanante}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}
                                </>
                            )}

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
