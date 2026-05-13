import React, { useState, useEffect } from 'react';

const RSVPModal = ({ isOpen, onClose, prefilledName, maxGuests = 2 }) => {
    const baseUrl = import.meta.env.BASE_URL;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasGuest, setHasGuest] = useState(false);
    const [companionNames, setCompanionNames] = useState(['']); // Array to hold multiple guest names
    const [formData, setFormData] = useState({
        nombre: prefilledName || '',
        asistencia: 'Sí',
        invitados: '1',
        mensaje: ''
    });

    useEffect(() => {
        if (prefilledName) {
            setFormData(prev => ({ ...prev, nombre: prefilledName }));
        }
    }, [prefilledName]);

    // Update companionNames array when invitados changes
    useEffect(() => {
        const numGuests = parseInt(formData.invitados) - 1;
        if (numGuests > 0) {
            setCompanionNames(prev => {
                const newNames = [...prev];
                if (newNames.length < numGuests) {
                    // Add empty fields if needed
                    while (newNames.length < numGuests) newNames.push('');
                } else {
                    // Keep existing names but truncate if number decreased
                    return newNames.slice(0, numGuests);
                }
                return newNames;
            });
            setHasGuest(true);
        } else {
            setHasGuest(false);
            setCompanionNames(['']);
        }
    }, [formData.invitados]);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwV2oUwSO_PJZ0qE5bdGwAKm2csQ8IDgxWQEkpEgqpaLHTa0Wimy3SpsKczivNElSda/exec';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'hasGuest') {
            setHasGuest(checked);
            setFormData(prev => ({ ...prev, invitados: checked ? '2' : '1' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCompanionNameChange = (index, value) => {
        setCompanionNames(prev => {
            const newNames = [...prev];
            newNames[index] = value;
            return newNames;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Join companion names with commas
        const companionsString = hasGuest 
            ? companionNames.filter(n => n.trim() !== '').join(', ') || "Acompañante(s) pendiente(s)"
            : "N/A";

        const payload = {
            nombre: formData.nombre.trim(),
            asistencia: formData.asistencia,
            invitados: formData.invitados,
            acompanante: companionsString,
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

    const guestOptions = [];
    for (let i = 1; i <= maxGuests; i++) {
        guestOptions.push(i);
    }

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
                                    {maxGuests === 2 ? (
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
                                    ) : maxGuests > 2 ? (
                                        <div className="form-group">
                                            <label htmlFor="invitados">¿Cuántas personas asistirán?</label>
                                            <select
                                                id="invitados"
                                                name="invitados"
                                                value={formData.invitados}
                                                onChange={handleChange}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {guestOptions.map(num => (
                                                    <option key={num} value={num}>
                                                        {num} {num === 1 ? 'Persona' : 'Personas'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : null}

                                    {hasGuest && (
                                        <div className="companion-fields reveal active" style={{ animation: 'fadeInUp 0.5s ease', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            {companionNames.map((name, index) => (
                                                <div className="form-group" key={index}>
                                                    <label htmlFor={`companion-${index}`}>
                                                        {companionNames.length > 1 ? `Nombre del Acompañante ${index + 1}` : 'Nombre del Acompañante'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={`companion-${index}`}
                                                        placeholder="Nombre completo"
                                                        required
                                                        value={name}
                                                        onChange={(e) => handleCompanionNameChange(index, e.target.value)}
                                                    />
                                                </div>
                                            ))}
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
