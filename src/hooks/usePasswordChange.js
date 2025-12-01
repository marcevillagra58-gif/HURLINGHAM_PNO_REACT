import { useState } from 'react';
import { API_USERS } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: usePasswordChange
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook que gestiona funcionalidad completa de cambio de contraseña:
 * modal, validación y actualización en API.
 * 
 * USADO POR:
 * - ProducerDetailsPage.jsx (cambio de contraseña de productor)
 * - PasswordModal.jsx (recibe handlers y estado)
 * 
 * RETORNA:
 * - isPasswordModalOpen {boolean}: Estado de visibilidad del modal
 * - passwordData {Object}: {oldPassword, newPassword, confirmPassword}
 * - handlePasswordChange {Function}: Procesa cambio de contraseña
 * - openPasswordModal {Function}: Abre modal
 * - closePasswordModal {Function}: Cierra modal y limpia datos
 * - setPasswordField {Function}: (field, value) para inputs
 * 
 * VALIDACIONES:
 * - Campos completos
 * - Nueva contraseña mínimo 4 caracteres
 * - Nueva contraseña y confirmación coinciden
 * - Contraseña actual correcta (API)
 * 
 * DEPENDENCIAS:
 * - fetch: API nativa del browser
 * - API_USERS: URL de API de usuarios
 * ============================================================================
 */

export const usePasswordChange = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    };

    const setPasswordField = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = async (producerName) => {
        // Validación
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            alert("Por favor completa todos los campos.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Las contraseñas nuevas no coinciden.");
            return;
        }

        if (passwordData.newPassword.length < 4) {
            alert("La contraseña debe tener al menos 4 caracteres.");
            return;
        }

        try {
            // Obtener usuario de API_USERS para verificar contraseña anterior
            const response = await fetch(API_USERS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            const currentUser = users.find(u => u.name === producerName);

            if (!currentUser) {
                alert("Usuario no encontrado en el sistema.");
                return;
            }

            // Verificar contraseña anterior
            if (currentUser.password !== passwordData.oldPassword) {
                alert("La contraseña anterior es incorrecta.");
                return;
            }

            // Actualizar contraseña
            const updatedUser = { ...currentUser, password: passwordData.newPassword };

            const updateResponse = await fetch(`${API_USERS}/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser)
            });

            if (!updateResponse.ok) {
                throw new Error(`HTTP error! status: ${updateResponse.status}`);
            }

            alert("Contraseña actualizada correctamente.");
            closePasswordModal();
        } catch (err) {
            console.error("Error changing password:", err);
            alert("Error al cambiar la contraseña.");
        }
    };

    return {
        isPasswordModalOpen,
        passwordData,
        handlePasswordChange,
        openPasswordModal,
        closePasswordModal,
        setPasswordField
    };
};
