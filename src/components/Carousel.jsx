import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/carrusel.css';
import { getAssetPath } from '../utils/assetPath.js';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

/**
 * ============================================================================
 * COMPONENTE: Carousel
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Carrusel de imágenes de lugares emblemáticos de Hurlingham con efecto
 * coverflow. Muestra 10 imágenes con descripciones en un slider 3D.
 * 
 * RECIBE DATOS DE:
 * - PrincipalPage.jsx u otras páginas que lo implementen
 * - carouselImages (array local con rutas de imágenes)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 * 
 * PROPS:
 * - Ninguna (usa datos locales)
 * 
 * DEPENDENCIAS:
 * - swiper/react: Librería de carruseles
 * - Módulos: EffectCoverflow, Pagination, Navigation
 * ============================================================================
 */

const carouselImages = [
  { imagePath: getAssetPath("/assets/Carrusel/imagen 1.jpg"), description: "Centro Cultural Leopoldo Marechal" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 10.jpg"), description: "Centro Comercial Peseo Florido" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 2.jpg"), description: "Estación Hurlingham" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 3.jpg"), description: "Edificio Municipal de noche" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 4.jpg"), description: "Hospital San Bernardino" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 5.jpg"), description: "Edificio Municipal" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 6.jpg"), description: "Parroquia Nuestra Señora del Camino" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 7.jpeg"), description: "Plaza Jhon Ravenscroft" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 8.webp"), description: "Hurlingham Club" },
  { imagePath: getAssetPath("/assets/Carrusel/imagen 9.jpg"), description: "Universidad de Hurlingham" }
];

function Carousel() {
  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, Navigation]}
      loop={true}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      breakpoints={{
        480: { slidesPerView: 1, coverflowEffect: { rotate: 0, stretch: 0, depth: 200, modifier: 2 } },
        768: { slidesPerView: 2, coverflowEffect: { rotate: 30, stretch: 10, depth: 150, modifier: 1 } }
      }}
      className="swiper-container mySwiper"
    >
      {carouselImages.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="img-card">
            <img className="image-card" src={item.imagePath} alt={item.description} />
            <p className="description-card">{item.description}</p>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
}

export default Carousel;
