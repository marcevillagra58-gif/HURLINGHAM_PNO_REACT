import { useState } from 'react';
import axios from 'axios';
import { API_USERS, API_ML } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useUserBlockToggle
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook para bloquear/desbloquear usuarios en AdminPage.
 * Actualiza estado en API_USERS y API_ML (productor asociado).
 * 
 * USADO POR:
 * - AdminPage.jsx (gestión de usuarios)
 * 
 * RETORNA:
 * - isTogglingBlock {boolean}: Estado de operación en progreso
 * - toggleUserBlock {Function}: (user, updateUserCallback) async
 * 
 * LÓGICA:
 * 1. Toggle del estado `state` del usuario
 * 2. Actualiza en API_USERS
 * 3. Busca productor asociado en API_ML (mismo ID)
 * 4. Si existe, actualiza estado en API_ML
 * 5. Llama updateUserCallback para actualizar UI local
 * 
 * DEPENDENCIAS:
 * - axios: PUT a APIs
 * - API_USERS: API de usuarios
 * - API_ML: API de productores
 * ============================================================================
 */

export const useUserBlockToggle = () => {
    const [isTogglingBlock, setIsTogglingBlock] = useState(false);

    const toggleUserBlock = async (user) => {
        setIsTogglingBlock(true);
        try {
            const newState = !user.state;

            // Actualizar en API_USERS
            const updatedUser = { ...user, state: newState };
            delete updatedUser.status;
            await axios.put(`${API_USERS}/${user.id}`, updatedUser);

            // Actualizar en API_ML usando idProductor
            const producersResponse = await axios.get(API_ML);
            const matchingProducer = producersResponse.data.find(p => p.idProductor === user.idProductor);

            if (matchingProducer) {
                const updatedProducer = { ...matchingProducer, state: newState };
                delete updatedProducer.status;
                await axios.put(`${API_ML}/${matchingProducer.id}`, updatedProducer);
            }

            setIsTogglingBlock(false);
            return { ...user, state: newState };
        } catch (err) {
            console.error("Error updating user state:", err);
            alert("Error al actualizar estado del usuario.");
            setIsTogglingBlock(false);
            return null;
        }
    };

    return { isTogglingBlock, toggleUserBlock };
};
