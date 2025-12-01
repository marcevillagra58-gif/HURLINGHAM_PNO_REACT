import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ML } from '../utils/API';

/**
 * ============================================================================
 * CUSTOM HOOK: useLoginRedirect
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook para manejar lógica de redirección post-login. Redirige al usuario
 * a su perfil de productor si existe en la API, o a /mercadolingham si no.
 * 
 * USADO POR:
 * - LoginForm.jsx (tras login exitoso)
 * - AuthContext.jsx (posiblemente)
 * 
 * RETORNA:
 * - redirectAfterLogin {Function}: Función async (userId) que redirige
 * 
 * LÓGICA:
 * 1. Busca usuario en API_ML por ID
 * 2. Si existe → navega a `/mercadolingham/producer/{id}`
 * 3. Si no existe → navega a `/mercadolingham`
 * 
 * DEPENDENCIAS:
 * - react-router-dom: useNavigate para redirección
 * - axios: Para petición GET a API
 * - API_ML: URL de API de productores
 * ============================================================================
 */

export const useLoginRedirect = () => {
    const navigate = useNavigate();

    const redirectAfterLogin = async () => {
        // Esperar a que se actualice localStorage
        setTimeout(async () => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user) return;

            // Redirección de administrador
            if (user.idProductor === 0) {
                console.log('Redirecting admin to /admin');
                navigate('/admin');
                return;
            }

            // Redirección de productor
            if (user.idProductor !== 0) {
                try {
                    const response = await axios.get(API_ML);
                    const producer = response.data.find(p => p.idProductor === user.idProductor);

                    if (producer) {
                        navigate(`/mercadolingham/producer/${producer.id}`);
                    } else {
                        navigate('/mercadolingham');
                    }
                } catch (err) {
                    console.error('Error finding producer:', err);
                    navigate('/mercadolingham');
                }
            }
        }, 100);
    };

    return { redirectAfterLogin };
};
