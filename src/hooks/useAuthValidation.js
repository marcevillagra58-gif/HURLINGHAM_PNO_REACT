import { API_USERS } from '../utils/API';
import { AUTH_ERRORS } from '../utils/authErrors';

/**
 * ============================================================================
 * MÓDULO DE UTILIDADES: useAuthValidation
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Funciones de validación de autenticación. Valida credenciales de usuario
 * contra la API y verifica el estado de bloqueo.
 * 
 * USADO POR:
 * - AuthContext.jsx (función login)
 * - LoginForm.jsx (indirectamente via AuthContext)
 * 
 * EXPORTS:
 * - validateUserCredentials(name, password): Función async de validación
 * 
 * RETORNA:
 * - { success: true, userData: Object } si credenciales correctas
 * - { success: false, error: string } si falla validación
 * 
 * ERRORES POSIBLES:
 * - AUTH_ERRORS.USER_NOT_FOUND
 * - AUTH_ERRORS.INCORRECT_PASSWORD
 * - AUTH_ERRORS.USER_BLOCKED
 * - Error de conexión
 * 
 * DEPENDENCIAS:
 * - fetch: API nativa del browser
 * - API_USERS: URL de API de usuarios
 * - AUTH_ERRORS: Constantes de mensajes de error
 * ============================================================================
 */

export const validateUserCredentials = async (name, password) => {
    try {
        const response = await fetch(API_USERS);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        const foundUser = users.find(u => u.name === name);

        // Usuario no encontrado
        if (!foundUser) {
            return {
                success: false,
                userData: null,
                error: AUTH_ERRORS.INVALID_CREDENTIALS,
            };
        }

        // Verificar si el usuario está bloqueado
        const isBlocked = foundUser.state === false || foundUser.status === false;
        if (isBlocked) {
            return {
                success: false,
                userData: null,
                error: AUTH_ERRORS.USER_BLOCKED,
            };
        }

        // Validar contraseña
        if (foundUser.password === password) {
            const userData = { ...foundUser };
            delete userData.password; // No almacenar contraseña en el estado

            return {
                success: true,
                userData,
                error: null,
            };
        } else {
            return {
                success: false,
                userData: null,
                error: AUTH_ERRORS.INVALID_CREDENTIALS,
            };
        }
    } catch (err) {
        console.error('Auth validation error:', err);
        return {
            success: false,
            userData: null,
            error: AUTH_ERRORS.CONNECTION_ERROR,
        };
    }
};
