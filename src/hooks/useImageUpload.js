import { useState } from 'react';
import { uploadImageToImgBB } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useImageUpload
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook reutilizable para carga de imágenes a ImgBB con gestión de estado.
 * Proporciona estado de carga, URL de imagen y funciones de subida/limpieza.
 * 
 * USADO POR:
 * - AdminPage.jsx (creación de usuarios con avatar)
 * - CreateUserModal.jsx (carga de avatares)
 * 
 * RETORNA:
 * - uploading {boolean}: Estado de carga (true durante upload)
 * - imageUrl {string|null}: URL de imagen cargada
 * - uploadImage {Function}: Función async para subir File object
 * - clearImage {Function}: Limpia URL de imagen
 * - error {string|null}: Mensaje de error si falla upload
 * 
 * DEPENDENCIAS:
 * - uploadImageToImgBB: Función de utilidad para carga a ImgBB API
 * ============================================================================
 */

/**
 * Hook personalizado para cargar imágenes a ImgBB
 * Reutilizable en toda la aplicación para cualquier necesidad de carga de imágenes
 * @returns {Object} { uploading, imageUrl, uploadImage, clearImage, error }
 */
export const useImageUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        setUploading(true);
        setError(null);
        try {
            const url = await uploadImageToImgBB(file);
            setImageUrl(url);
            return url;
        } catch (err) {
            setError("Error al subir la imagen");
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const clearImage = () => {
        setImageUrl(null);
        setError(null);
    };

    return {
        uploading,
        imageUrl,
        uploadImage,
        clearImage,
        error
    };
};
