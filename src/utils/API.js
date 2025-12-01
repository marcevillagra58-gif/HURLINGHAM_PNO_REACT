import axios from 'axios';

/**
 * ============================================================================
 * MÓDULO DE UTILIDADES: API.js
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Configuración centralizada de APIs y funciones de utilidad para
 * interacción con servicios externos (MockAPI e ImgBB).
 * 
 * EXPORTS:
 * - API_ML: URL de API de productores (MockAPI) desde env
 * - API_USERS: URL de API de usuarios (MockAPI) desde env
 * - uploadImageToImgBB(file): Función async para subir imágenes
 * 
 * VARIABLES DE ENTORNO (desde .env):
 * - VITE_API_ML: URL de MockAPI para productores/MercadoLingham
 * - VITE_API_USERS: URL de MockAPI para usuarios
 * - VITE_IMGBB_API_KEY: API key para servicio ImgBB
 * 
 * VALIDACIÓN:
 * - Verifica que todas las env vars estén definidas
 * - console.error si falta alguna variable
 * - No bloquea ejecución (permite desarrollo parcial)
 * 
 * FUNCIÓN uploadImageToImgBB:
 * - Parámetros: file (File object)
 * - Retorna: Promise<string> URL de imagen subida
 * - Usa FormData para envío multipart
 * - Throw error si falla upload
 * 
 * USADO POR:
 * - Todos los hooks que hacen peticiones HTTP
 * - Componentes que necesitan subir imágenes
 * - useImageUpload hook
 * - useProductCarousel hook
 * 
 * DEPENDENCIAS:
 * - axios: Para peticiones HTTP
 * - Vite env vars: import.meta.env.VITE_*
 * ============================================================================
 */

// Variables de entorno de Vite
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
export const API_ML = import.meta.env.VITE_API_ML;
export const API_USERS = import.meta.env.VITE_API_USERS;

// Validación de variables de entorno
if (!IMGBB_API_KEY) {
    console.error('Error: VITE_IMGBB_API_KEY no está definida en el archivo .env');
}
if (!API_ML) {
    console.error('Error: VITE_API_ML no está definida en el archivo .env');
}
if (!API_USERS) {
    console.error('Error: VITE_API_USERS no está definida en el archivo .env');
}

export const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
        return response.data.data.url;
    } catch (error) {
        console.error('Error uploading image to ImgBB:', error);
        throw error;
    }
};