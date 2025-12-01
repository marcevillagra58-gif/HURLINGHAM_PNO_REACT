import { useState } from 'react';
import { API_ML } from '../utils/API';
import { getNextAvailableSlot, buildProductsArray } from '../utils/productSlotManager';

/**
 * ============================================================================
 * CUSTOM HOOK: useProductManager
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook que gestiona operaciones CRUD de productos de un productor.
 * Maneja slots de productos (máximo 20), creación, edición y eliminación.
 * 
 * USADO POR:
 * - ProducerDetailsPage.jsx (gestión de productos de productor)
 * 
 * RETORNA:
 * - newProductIndex {number|null}: Índice del producto nuevo en creación
 * - handleNewProduct {Function}: Crea slot para nuevo producto
 * - handleSaveProduct {Function}: Guarda producto (nuevo o editado)
 * - handleDeleteProduct {Function}: Elimina producto (vacía slot)
 * - handleCancelNewProduct {Function}: Cancela creación de producto
 * - buildProductsList {Function}: Construye array de productos desde producer
 * 
 * LÓGICA DE SLOTS:
 * - Máximo 20 productos por productor (name1-20, description1-20, imagen1-20)
 * - getNextAvailableSlot: encuentra primer slot vacío
 * - Producto "nuevo" marcado con isNew=true hasta guardar
 * 
 * DEPENDENCIAS:
 * - fetch: API nativa del browser
 * - API_ML: URL de API de productores
 * - productSlotManager: Utilidades para manejo de slots
 * ============================================================================
 */

export const useProductManager = () => {
    const [newProductIndex, setNewProductIndex] = useState(null);

    const handleNewProduct = (producer) => {
        if (!producer) return;

        const availableSlot = getNextAvailableSlot(producer);

        if (availableSlot === -1) {
            alert("No tienes espacio para más productos (máximo 20).");
            return;
        }

        setNewProductIndex(availableSlot);
    };

    const handleCancelNewProduct = () => {
        setNewProductIndex(null);
    };

    const handleSaveProduct = async (producerId, originalIndex, updatedData, producer, setProducer) => {
        if (!producer) return;
        try {
            const updatedProducer = {
                ...producer,
                [`name${originalIndex}`]: updatedData.name,
                [`description${originalIndex}`]: updatedData.description,
                [`imagen${originalIndex}`]: updatedData.image
            };
            setProducer(updatedProducer);
            setNewProductIndex(null);

            const response = await fetch(`${API_ML}/${producerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProducer)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Error al actualizar el producto.");
        }
    };

    const handleDeleteProduct = async (producerId, originalIndex, producer, setProducer, currentNewProductIndex, cancelNewProduct) => {
        if (!producer) return;
        try {
            const updatedProducer = {
                ...producer,
                [`name${originalIndex}`]: "",
                [`description${originalIndex}`]: "",
                [`imagen${originalIndex}`]: ""
            };
            setProducer(updatedProducer);
            if (currentNewProductIndex === originalIndex) {
                cancelNewProduct();
            }

            const response = await fetch(`${API_ML}/${producerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProducer)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Error al eliminar el producto.");
        }
    };

    const buildProductsList = (producer, includeNewProductIndex) => {
        return buildProductsArray(producer, includeNewProductIndex);
    };

    return {
        newProductIndex,
        handleNewProduct,
        handleSaveProduct,
        handleDeleteProduct,
        handleCancelNewProduct,
        buildProductsList
    };
};
