import React, { useState } from 'react';

/**
 * ============================================================================
 * COMPONENTE: CreateUserModal
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Modal para creación de nuevos usuarios con formulario de nombre y avatar.
 * Integra carga de imagen y validación de datos before de submit.
 * 
 * RECIBE DATOS DE:
 * - AdminPage.jsx (componente padre que controla apertura y maneja creación)
 * - useImageUpload hook (para carga de imágenes)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de formulario)
 * 
 * PROPS:
 * - isOpen {boolean}: Control de visibilidad del modal
 * - onClose {Function}: Handler para cerrar modal
 * - onCreate {Function}: Handler async que recibe userData {name, avatar}
 * - uploading {boolean}: Estado de carga de imagen
 * - imageUrl {string}: URL de imagen cargada
 * - onImageUpload {Function}: Handler para carga de archivo de imagen
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable modal for creating new users
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {Function} props.onCreate - Handler for creating user with userData
 * @param {boolean} props.uploading - Whether an image is currently uploading
 * @param {string} props.imageUrl - URL of uploaded image
 * @param {Function} props.onImageUpload - Handler for image file upload
 */
const CreateUserModal = ({ isOpen, onClose, onCreate, uploading, imageUrl, onImageUpload }) => {
    const [formData, setFormData] = useState({ name: '', avatar: '' });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !imageUrl) {
            alert("Por favor completa nombre y avatar.");
            return;
        }

        onCreate({ ...formData, avatar: imageUrl });
        setFormData({ name: '', avatar: '' });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await onImageUpload(file);
        }
    };

    const handleClose = () => {
        setFormData({ name: '', avatar: '' });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Nuevo Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nombre del usuario"
                        />
                    </div>
                    <div className="form-group">
                        <label>Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {uploading && <p>Subiendo imagen...</p>}
                        {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '50px', marginTop: '10px' }} />}
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={handleClose}>CANCELAR</button>
                        <button type="submit" className="save-btn" disabled={uploading}>GUARDAR</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;
