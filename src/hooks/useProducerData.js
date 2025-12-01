import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ML } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useProducerData
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook para obtener datos de un productor específico por ID.
 * Gestiona carga inicial, estado y función de recarga.
 * 
 * USADO POR:
 * - ProducerDetailsPage.jsx (muestra detalles de productor)
 * 
 * PARÁMETROS:
 * - id {string}: ID del productor desde URL params
 * 
 * RETORNA:
 * - producer {Object|null}: Datos del productor
 * - setProducer {Function}: Setter para actualizar estado local
 * - loading {boolean}: Estado de carga
 * - error {Error|null}: Error si falla petición
 * - refreshProducer {Function}: Recarga datos del productor
 * 
 * COMPORTAMIENTO:
 * - Carga automática al montar con useEffect
 * - Valida presencia de ID
 * - Logging de debugging en consola
 * 
 * DEPENDENCIAS:
 * - axios: Para GET a API
 * - API_ML: URL de API de productores
 * ============================================================================
 */

export const useProducerData = (id) => {
    const [producer, setProducer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducer = async () => {
        console.log("Fetching producer with ID:", id);
        try {
            const response = await axios.get(`${API_ML}/${id}`);
            console.log("Producer fetched successfully:", response.data);
            setProducer(response.data);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("Error fetching producer:", err);
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProducer();
        } else {
            console.error("No ID provided in URL parameters.");
            setError(new Error("No ID provided"));
            setLoading(false);
        }
    }, [id]);

    const refreshProducer = () => {
        setLoading(true);
        fetchProducer();
    };

    return { producer, setProducer, loading, error, refreshProducer };
};
