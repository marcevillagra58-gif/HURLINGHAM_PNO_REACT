import React, { useEffect, useRef } from 'react';
import Vara from 'vara';

/**
 * ============================================================================
 * COMPONENTE: TextoManuscrito
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Componente de animación de texto manuscrito usando librería Vara.js.
 * Genera animación de escritura a mano con fuente personalizada.
 * 
 * RECIBE DATOS DE:
 * - Escritor.jsx (componente wrapper)
 * - Utilizado indirectamente por EducacionPage, HistoriaPage, etc.
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de animación visual)
 * 
 * PROPS:
 * - texto {string}: Texto a animar
 * - tamano {number}: Tamaño de fuente en píxeles
 * - color {string}: Color del trazo
 * 
 * DEPENDENCIAS:
 * - vara: Librería para animación de escritura manuscrita
 * - Fuente: /fonts/SatisfySL.json
 * ============================================================================
 */

const TextoManuscrito = ({
  texto = "",
  tamano = 0,
  color = ""
}) => {
  // Generamos un ID único para cada instancia del componente
  const idUnico = useRef(`vara-container-${Math.random().toString(36).substr(2, 9)}`).current;
  const varaInstanceRef = useRef(null);

  useEffect(() => {
    // Si ya hay una animación, no hacemos nada (evita doble render en modo estricto)
    if (varaInstanceRef.current) return;

    // Limpiamos el contenido previo por si acaso
    const container = document.getElementById(idUnico);
    if (container) {
      container.innerHTML = "";
    }

    // Inicializamos Vara con el ID del contenedor
    varaInstanceRef.current = new Vara(
      `#${idUnico}`, // Pasamos el ID como un selector de CSS
      "/fonts/SatisfySL.json",
      [
        {
          text: texto,
          fontSize: tamano,
          strokeWidth: 2,
          color: color,
          duration: 2000,
          delay: 1000, // Retraso de 1 segundo
          textAlign: "center",
          y: tamano / 2 // Reduce el desplazamiento vertical a la mitad para disminuir el padding
        }
      ],
      {
        autoAnimation: true,
      }
    );

    // Función de limpieza para cuando el componente se desmonte
    return () => {
      // Destruimos la instancia de Vara para liberar recursos
      if (varaInstanceRef.current) {
        // Vara.js no tiene un método documentado de "destroy",
        // pero limpiar el HTML y la referencia es una buena práctica.
        const el = document.getElementById(idUnico);
        if (el) el.innerHTML = '';
        varaInstanceRef.current = null;
      }
    };
  }, [texto, tamano, color, idUnico]); // Dependencias del efecto

  // Asignamos el ID único al div y un margen inferior negativo para compensar la altura
  return <div
    id={idUnico}
    style={{
      width: "100%",
      height: `${tamano * 2}px`,
      overflow: "hidden",
      marginBottom: `-${tamano / 10}px`
    }}
  />;
};

export default TextoManuscrito;