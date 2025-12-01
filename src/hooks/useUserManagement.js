import { useState, useEffect } from 'react';
import { API_USERS } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useUserManagement
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook para obtener y gestionar la lista completa de usuarios desde la API.
 * Proporciona funciones CRUD para manipular usuarios.
 * 
 * USADO POR:
 * - AdminPage.jsx (gestión de usuarios)
 * 
 * RETORNA:
 * - users {Array}: Lista de usuarios
 * - loading {boolean}: Estado de carga inicial
 * - error {string|null}: Error si falla la petición
 * - refreshUsers {Function}: Recarga la lista de usuarios
 * - addUser {Function}: Agrega usuario al estado local
 * - removeUser {Function}: Elimina usuario del estado local
 * - updateUser {Function}: Actualiza usuario en estado local
 * 
 * DEPENDENCIAS:
 * - fetch: API nativa del browser
 * - API_USERS: URL de la API de usuarios
 * ============================================================================
 */

export const useUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch(API_USERS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Filtrar administrador (idProductor === 0)
            const nonAdminUsers = data.filter(u => u.idProductor !== 0);
            setUsers(nonAdminUsers);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Error al cargar usuarios.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const refreshUsers = () => {
        setLoading(true);
        fetchUsers();
    };

    const addUser = (user) => {
        setUsers(prev => [...prev, user]);
    };

    const removeUser = (userId) => {
        setUsers(prev => prev.filter(u => u.id !== userId));
    };

    const updateUser = (userId, updates) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    };

    return { users, loading, error, refreshUsers, addUser, removeUser, updateUser };
};
