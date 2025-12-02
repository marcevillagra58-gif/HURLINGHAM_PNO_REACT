/**
 * Utility function to get the correct asset path for GitHub Pages deployment
 * 
 * In development: returns /assets/image.jpg
 * In production (GitHub Pages): returns /HURLINGHAM_PNO_REACT/assets/image.jpg
 * 
 * @param {string} path - The asset path relative to public folder (e.g., "/assets/image.jpg")
 * @returns {string} - The full path with base URL
 */
export const getAssetPath = (path) => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // import.meta.env.BASE_URL already includes trailing slash
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
