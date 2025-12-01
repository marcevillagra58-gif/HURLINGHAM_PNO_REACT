import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/mercadolingham.css';
import { API_ML } from '../utils/API';

/**
 * ============================================================================
 * COMPONENTE: Producers
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Lista de productores del MercadoLingham. Carga y muestra todos los
 * productores con su información básica y botón para ver detalles.
 * 
 * RECIBE DATOS DE:
 * - API_ML (MockAPI con lista de productores)
 * - ProductoresPage.jsx (componente padre)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (navegación a detalles via window.open)
 * 
 * PROPS:
 * - Ninguna (obtiene datos de API directamente)
 * 
 * DEPENDENCIAS:
 * - axios: Peticiones HTTP
 * - API_ML: URL de API de productores
 * ============================================================================
 */

const Producers = () => {
    const [producers, setProducers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducers = async () => {
            try {
                const response = await axios.get(API_ML);
                setProducers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProducers();
    }, []);

    if (loading) {
        return <div>Cargando productores...</div>;
    }

    if (error) {
        return <div>Error al cargar los productores: {error.message}</div>;
    }

    return (
        <div className="producer-list">
            {producers.map(producer => (
                <div key={producer.id} className="producer-card">
                    <img src={producer.avatar} alt={producer.name} className="producer-image" />
                    <div className="producer-info">
                        <h3>{producer.name}</h3>
                        <p>{producer.description}</p>
                        <strong>Contacto:</strong>
                        <p>{producer.contact1}</p>
                        <p>{producer.contact2}</p>
                        <button onClick={() => window.open(`/mercadolingham/producer/${producer.id}`, '_blank')}>Ver más</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Producers;
