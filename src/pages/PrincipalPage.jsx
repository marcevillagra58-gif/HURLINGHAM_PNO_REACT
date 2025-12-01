import React from 'react';
import '../css/principal.css';
import Escritor from '../components/Escritor';

/**
 * ============================================================================
 * PÁGINA: PrincipalPage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Página principal con bienvenida y imagen del municipio.
 * Primera página después del HomePage al hacer click en "Ingresar".
 * 
 * RUTA:
 * - /principal
 * 
 * FUNCIONALIDADES:
 * - Título animado "Bienvenidos a Hurlingham"
 * - Imagen principal del edificio municipal
 * - Layout centrado y responsive
 * 
 * DISEÑO:
 * - Contenedor principal con imagen destacada
 * - Texto manuscrito animado como header
 * - Imagen de alta calidad del municipio
 * 
 * NAVEGACIÓN:
 * - Punto de entrada principal tras HomePage
 * - Header con navegación a otras secciones disponible
 * 
 * COMPONENTES:
 * - Escritor/TextoManuscrito: Título animado
 * ============================================================================
 */

const PrincipalPage = () => {
  return (
    <div className="container">
      <div className="main-content">
        <Escritor
          texto="Bienvenidos a Hurlingham"
          tamano={50}
          color="white"
        />
        <img className="imagen-principal" src="/assets/Municipio-de-Hurlingham-HOME.jpg" alt="Municipalidad" />
      </div>
    </div>
  );
};

export default PrincipalPage;