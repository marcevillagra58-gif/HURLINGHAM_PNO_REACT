import { useState } from 'react';
import { API_USERS, API_ML } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useUserDelete
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook para eliminar usuarios y sus registros de productor asociados.
 * Elimina de API_USERS y API_ML para mantener consistencia.
 * 
 * USADO POR:
 * - AdminPage.jsx (eliminación de usuarios)
 * - DeleteConfirmModal.jsx (confirmación de eliminación)
 * 
 * RETORNA:
 * - isDeleting {boolean}: Estado de operación en progreso
 * - deleteUser {Function}: (userId, removeUserCallback) async
 * 
 * PROCESO DE ELIMINACIÓN:
 * 1. DELETE en API_USERS con userId
 * 2. DELETE en API_ML con mismo userId (productor asociado)
 * 3. Llama removeUserCallback para actualizar lista local
 * 4. Maneja errores si alguna operación falla
 * 
 * MANEJO DE ERRORES:
 * - No falla si productor no existe en API_ML
 * - Logging de errores en consola
 * - Muestra alert al usuario en caso de error
 * 
 * DEPENDENCIAS:
 * - fetch: API nativa del browser
 * - API_USERS: API de usuarios
 * - API_ML: API de productores
 * ============================================================================
 */

export const useUserDelete = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteUser = async (user) => {
        setIsDeleting(true);
        try {
            // Eliminar de API_USERS
            const response1 = await fetch(`${API_USERS}/${user.id}`, {
                method: 'DELETE'
            });

            if (!response1.ok) {
                throw new Error(`HTTP error! status: ${response1.status}`);
            }

            // Buscar y eliminar de API_ML usando idProductor
            const producersResponse = await fetch(API_ML);

            if (!producersResponse.ok) {
                throw new Error(`HTTP error! status: ${producersResponse.status}`);
            }

            const producers = await producersResponse.json();
            const matchingProducer = producers.find(p => p.idProductor === user.idProductor);

            if (matchingProducer) {
                const response2 = await fetch(`${API_ML}/${matchingProducer.id}`, {
                    method: 'DELETE'
                });

                if (!response2.ok) {
                    throw new Error(`HTTP error! status: ${response2.status}`);
                }
            }

            setIsDeleting(false);
            return true;
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Error al eliminar usuario.");
            setIsDeleting(false);
            return false;
        }
    };

    return { isDeleting, deleteUser };
};
