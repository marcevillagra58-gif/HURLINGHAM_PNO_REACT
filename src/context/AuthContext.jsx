import React, { createContext, useState, useContext, useEffect } from 'react';
import { validateUserCredentials } from '../hooks/useAuthValidation';

/**
 * ============================================================================
 * CONTEXT: AuthContext
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Contexto global para manejar el estado de autenticación del usuario.
 * Centraliza la lógica de login, logout, persistencia de sesión y disponibiliza
 * la información del usuario actual a toda la aplicación.
 * 
 * USADO POR:
 * - App.jsx (envuelve a toda la aplicación en el AuthProvider)
 * - ProtectedRoute.jsx (verifica isAuthenticated para permitir acceso)
 * - LoginPage.jsx (consume la función login)
 * - Header/NavBar (consume user y logout para mostrar perfil/salir)
 * 
 * ESTADO GLOBAL (_value_):
 * - user {Object|null}: Datos del usuario logueado (id, nombre, rol, etc.)
 * - isAuthenticated {boolean}: Flag simple para saber si hay sesión activa
 * - loading {boolean}: Flag para saber si se está verificando sesión inicial
 * - error {string|null}: Mensajes de error de autenticación
 * - login {Function}: (name, password) -> Promise<boolean>
 * - logout {Function}: () -> void
 * - setError {Function}: Setter manual de errores
 * 
 * PERSISTENCIA:
 * - Usa localStorage ('user') para mantener la sesión viva entre recargas.
 * ============================================================================
 */

const AuthContext = createContext();

/**
 * Hook personalizado para consumir el contexto de autenticación fácilmente.
 * @returns {Object} El valor del contexto (user, login, logout, etc.)
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // EFECTO: Cargar sesión persistente al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Error parsing stored user data", e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Función para iniciar sesión
   * @param {string} name - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<boolean>} TRUE si el login fue exitoso, FALSE si falló
   */
  const login = async (name, password) => {
    setLoading(true);
    setError(null);

    // Delega la validación real al hook de lógica de negocio (o servicio)
    const { success, userData, error: validationError } = await validateUserCredentials(name, password);

    if (success) {
      setUser(userData);
      setIsAuthenticated(true);
      // Guardar en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return true;
    } else {
      setError(validationError);
      setLoading(false);
      return false;
    }
  };

  /**
   * Función para cerrar sesión
   * Limpia el estado y borra los datos del localStorage
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
