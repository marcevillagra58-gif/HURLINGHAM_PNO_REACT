import { useState, useEffect } from 'react';
import { uploadImageToImgBB } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useProductCarousel
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook que encapsula toda la lógica del carrusel de productos: edición,
 * eliminación, carga de imágenes y gestión de estado del Swiper.
 * 
 * USADO POR:
 * - ProductCarousel.jsx (componente principal)
 * - ProducerDetailsPage.jsx (usa el carrusel)
 * 
 * PARÁMETROS:
 * - products {Array}: Array de productos a mostrar
 * - onSaveProduct {Function}: Callback (index, formData) al guardar
 * - onDeleteProduct {Function}: Callback (index) al eliminar
 * - onCancelNewProduct {Function}: Callback al cancelar nuevo producto
 * 
 * RETORNA:
 * - editingIndex {number}: Índice del producto en edición (-1 si ninguno)
 * - editForm {Object}: {name, description, image}
 * - deleteModalOpen {boolean}: Estado del modal de eliminación
 * - uploading {boolean}: Estado de carga de imagen
 * - swiper {Object}: Instancia de Swiper
 * - setSwiper {Function}: Setter para instancia de Swiper
 * - handleEditClick, handleCancelClick, handleSaveClick, handleDeleteClick
 * - confirmDelete, cancelDelete, handleInputChange, handleImageUpload
 * 
 * DEPENDENCIAS:
 * - uploadImageToImgBB: Función de carga de imágenes a ImgBB
 * ============================================================================
 */

export const useProductCarousel = (products, onSaveProduct, onDeleteProduct, onCancelNewProduct) => {
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editForm, setEditForm] = useState({ name: '', description: '', image: '' });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Efecto para entrar automáticamente en modo de edición para nuevos productos
    useEffect(() => {
        const newProductIndex = products.findIndex(p => p.isNew);
        if (newProductIndex !== -1 && editingIndex !== newProductIndex) {
            setEditingIndex(newProductIndex);
            setEditForm({ name: '', description: '', image: '' });
            if (swiper) {
                swiper.slideToLoop(newProductIndex);
            }
        }
    }, [products, editingIndex, swiper]);

    const handleEditClick = (index, product) => {
        setEditingIndex(index);
        setEditForm({ name: product.name, description: product.description, image: product.image });
    };

    const handleCancelClick = (product) => {
        if (product.isNew && onCancelNewProduct) {
            onCancelNewProduct();
        }
        setEditingIndex(-1);
        setEditForm({ name: '', description: '', image: '' });
    };

    const handleSaveClick = (originalIndex) => {
        if (!editForm.name || !editForm.description || !editForm.image) {
            alert("Por favor completa todos los datos (Nombre, Descripción e Imagen).");
            return;
        }
        if (onSaveProduct) {
            onSaveProduct(originalIndex, editForm);
        }
        setEditingIndex(-1);
    };

    const handleDeleteClick = (originalIndex) => {
        setProductToDelete(originalIndex);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (onDeleteProduct && productToDelete !== null) {
            onDeleteProduct(productToDelete);
        }
        setDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const imageUrl = await uploadImageToImgBB(file);
            setEditForm(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            alert("Error al subir la imagen. Intenta nuevamente.");
        } finally {
            setUploading(false);
        }
    };

    return {
        // Estado
        editingIndex,
        editForm,
        deleteModalOpen,
        uploading,
        swiper,
        // Setters
        setSwiper,
        // Handlers
        handleEditClick,
        handleCancelClick,
        handleSaveClick,
        handleDeleteClick,
        confirmDelete,
        cancelDelete,
        handleInputChange,
        handleImageUpload
    };
};
