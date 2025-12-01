import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: ProducerInfo
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Sección de información del productor mostrando avatar y datos de contacto.
 * Alterna entre visualización y edición de contactos.
 * 
 * RECIBE DATOS DE:
 * - ProducerDetailsPage.jsx (componente padre)
 * - useProducerEdit hook (para datos de edición)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 * 
 * PROPS:
 * - producer {Object}: Datos del productor {avatar, contact1, contact2}
 * - isEditing {boolean}: Estado de modo edición
 * - editFormData {Object}: Datos del formulario de edición
 * - onInputChange {Function}: Handler para cambios en inputs
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable component for producer information section (avatar and contacts)
 * @param {Object} props
 * @param {Object} props.producer - Producer data object
 * @param {boolean} props.isEditing - Whether edit mode is active
 * @param {Object} props.editFormData - Form data for editing
 * @param {Function} props.onInputChange - Handler for input changes
 */
const ProducerInfo = ({
    producer,
    isEditing,
    editFormData,
    onInputChange
}) => {
    return (
        <section className="producer-info-section">
            <img src={producer.avatar} alt={producer.name} className="producer-avatar" />

            <div className="producer-contact">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="contact1"
                            value={editFormData.contact1}
                            onChange={onInputChange}
                            className="edit-producer-contact"
                            placeholder="Contacto 1"
                        />
                        <input
                            type="text"
                            name="contact2"
                            value={editFormData.contact2}
                            onChange={onInputChange}
                            className="edit-producer-contact"
                            placeholder="Contacto 2"
                        />
                    </>
                ) : (
                    <>
                        <p>{producer.contact1}</p>
                        <p>{producer.contact2}</p>
                    </>
                )}
            </div>
        </section>
    );
};

export default ProducerInfo;
