import React, { useEffect, useRef } from 'react';
import Vara from 'vara';
import { getAssetPath } from '../utils/assetPath.js';

const TextoManuscrito = ({
  texto = "",
  tamano = 0,
  color = ""
}) => {
  const idUnico = useRef(`vara-container-${Math.random().toString(36).substr(2, 9)}`).current;
  const varaInstanceRef = useRef(null);

  useEffect(() => {
    if (varaInstanceRef.current) return;

    const container = document.getElementById(idUnico);
    if (container) {
      container.innerHTML = "";
    }

    varaInstanceRef.current = new Vara(
      `#${idUnico}`,
      getAssetPath("/fonts/SatisfySL.json"),
      [
        {
          text: texto,
          fontSize: tamano,
          strokeWidth: 2,
          color: color,
          duration: 2000,
          delay: 1000,
          textAlign: "center",
          y: tamano / 2
        }
      ],
      {
        autoAnimation: true,
      }
    );

    return () => {
      if (varaInstanceRef.current) {
        const el = document.getElementById(idUnico);
        if (el) el.innerHTML = '';
        varaInstanceRef.current = null;
      }
    };
  }, [texto, tamano, color, idUnico]);

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