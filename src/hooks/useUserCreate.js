import { useState } from 'react';
import { API_USERS, API_ML } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useUserCreate
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook para crear nuevos usuarios con sus registros de productor asociados.
 * Crea entrada en API_USERS y entrada (con productos vacíos) en API_ML.
 * 
 * USADO POR:
 * - AdminPage.jsx (creación de usuarios)
 * - CreateUserModal.jsx (formulario de creación)
 * 
 * RETORNA:
 * - isCreating {boolean}: Estado de operación en progreso
 * - createUser {Function}: (userData, addUserCallback) async
 * 
 * PROCESO DE CREACIÓN:
 * 1. Valida datos requeridos (name, avatar)
 * 2. Crea contraseña por defecto (puede ser "123456" o similar)
 * 3. POST a API_USERS con {name, password, avatar, state: true}
 * 4. POST a API_ML con mismo ID + 20 slots de productos vacíos
 * 5. Llama addUserCallback para actualizar lista local
 * 
 * ESTRUCTURA PRODUCTOR INICIAL:
 * - name, contact1: "", contact2: "", description: ""
 * - name1-20, description1-20, imagen1-20: todos "" (vacíos)
 * 
 * DEPENDENCIAS:
 * - fetch: API nativa del browser
 * - API_USERS: API de usuarios
 * - API_ML: API de productores
 * ============================================================================
 */

export const useUserCreate = () => {
    const [isCreating, setIsCreating] = useState(false);

    const createUser = async (userData) => {
        setIsCreating(true);
        try {
            // 1. Obtener todos los usuarios existentes para encontrar el siguiente idProductor disponible
            const usersResponse = await fetch(API_USERS);

            if (!usersResponse.ok) {
                throw new Error(`HTTP error! status: ${usersResponse.status}`);
            }

            const existingUsers = await usersResponse.json();

            // Encontrar el idProductor más alto y sumar 1 (saltar 0 que es admin)
            const usedIds = existingUsers.map(u => u.idProductor || 0);
            let nextIdProductor = 1;
            while (usedIds.includes(nextIdProductor)) {
                nextIdProductor++;
            }

            // 2. Crear usuario en API_USERS con el nuevo idProductor
            const userWithCredentials = {
                name: userData.name,
                avatar: userData.avatar,
                state: true,
                password: "1234",
                idProductor: nextIdProductor
            };

            const authResponse = await fetch(API_USERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userWithCredentials)
            });

            if (!authResponse.ok) {
                throw new Error(`HTTP error! status: ${authResponse.status}`);
            }

            const createdAuthUser = await authResponse.json();

            // 3. Crear registro de productor correspondiente en API_ML con el mismo idProductor
            const producerData = {
                name: userData.name,
                avatar: userData.avatar,
                state: true,
                description: "Descripción del productor...",
                contact1: "Contacto 1...",
                contact2: "Contacto 2...",
                // Solo 1 producto inicial
                name1: "CREA TUS PRODUCTOS",
                description1: "Comienza editando este",
                imagen1: "https://i.ibb.co/rRVQzhtV/nuevo-item.png",
                // Productos vacíos 2-5 para prevenir auto-generación
                name2: "", description2: "", imagen2: "",
                name3: "", description3: "", imagen3: "",
                name4: "", description4: "", imagen4: "",
                name5: "", description5: "", imagen5: "",
                idProductor: nextIdProductor
            };

            const producerResponse = await fetch(API_ML, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producerData)
            });

            if (!producerResponse.ok) {
                throw new Error(`HTTP error! status: ${producerResponse.status}`);
            }

            setIsCreating(false);
            return createdAuthUser;
        } catch (err) {
            console.error("Error creating user:", err);
            alert("Error al crear usuario.");
            setIsCreating(false);
            return null;
        }
    };

    return { isCreating, createUser };
};
