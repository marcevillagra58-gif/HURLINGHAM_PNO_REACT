import { useState, useEffect } from 'react';

function useResponsiveFontSize(baseSize = 50) {
    const [fontSize, setFontSize] = useState(baseSize);

    useEffect(() => {
        const calculateFontSize = () => {
            const width = window.innerWidth;

            if (width <= 480) {
                return baseSize * 0.5;
            } else if (width <= 600) {
                return baseSize * 0.6;
            } else if (width <= 768) {
                return baseSize * 0.7;
            } else if (width <= 912) {
                return baseSize * 0.85;
            } else if (width <= 1200) {
                return baseSize * 0.95;
            } else {
                return baseSize;
            }
        };

        const handleResize = () => {
            setFontSize(calculateFontSize());
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [baseSize]);

    return fontSize;
}

export default useResponsiveFontSize;
