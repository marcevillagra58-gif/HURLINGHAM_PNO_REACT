import { useState } from 'react';
import axios from 'axios';
import { API_ML } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useProducerEdit
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook para gestionar edición inline de datos de productor
 * (nombre, descripción, contactos). Alterna modo edición/vista.
 * 
 * USADO POR:
 * - ProducerDetailsPage.jsx (edición de perfil)
 * - ProducerHeader.jsx (recibe estado y handlers)
 * - ProducerInfo.jsx (recibe estado y handlers)
 * 
 * PARÁMETROS:
 * - producer {Object}: Objeto productor actual
 * - producerId {string}: ID para actualización en API
 * - setProducer {Function}: Setter de estado del productor
 * 
 * RETORNA:
 * - isEditing {boolean}: Modo edición activo
 * - editFormData {Object}: {name, description, contact1, contact2}
 * - handleEditClick {Function}: Toggle modo edición
 * - handleInputChange {Function}: Handler para inputs
 * 
 * COMPORTAMIENTO:
 * - Al activar edición: carga datos actuales en formulario
 * - Al finalizar edición: hace PUT a API y actualiza estado local
 * 
 * DEPENDENCIAS:
 * - axios: PUT a API para actualización
 * - API_ML: URL de API de productores
 * ============================================================================
 */

export const useProducerEdit = (producer, producerId, setProducer) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        contact1: '',
        contact2: ''
    });

    const handleEditClick = async () => {
        if (isEditing) {
            // Guardar cambios
            try {
                const updatedProducer = {
                    ...producer,
                    name: editFormData.name,
                    description: editFormData.description,
                    contact1: editFormData.contact1,
                    contact2: editFormData.contact2
                };

                // Actualización optimista
                setProducer(updatedProducer);

                // Actualización de API
                await axios.put(`${API_ML}/${producerId}`, updatedProducer);
            } catch (err) {
                console.error("Error updating producer info:", err);
                // Revertir actualización optimista en caso de error
                alert("Error al actualizar la información del productor.");
            }
        } else {
            // Entrar en modo de edición: inicializar datos del formulario
            setEditFormData({
                name: producer.name,
                description: producer.description,
                contact1: producer.contact1,
                contact2: producer.contact2
            });
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    return { isEditing, editFormData, handleEditClick, handleInputChange };
};
