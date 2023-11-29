import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider.tsx';
import { isInvalidToken } from '../provider/utils/JwtUtils.ts';

const useWarden = (checkInterval = 10000) => {
  const navigate = useNavigate();
  const { setJwtToken, jwtTokenInfo } = useAuth();

  const checkValidity = () => {
    if (jwtTokenInfo && isInvalidToken(jwtTokenInfo.exp)) {
      setJwtToken(undefined);
      navigate('/login', {
        replace: true,
        state: {
          message: 'Votre session a expiré. Veuillez, vous reconnecter ...',
        },
      });
    }
  };

  useEffect(() => {
    checkValidity();
    const intervalId = setInterval(checkValidity, checkInterval);
    return () => clearInterval(intervalId);
  }, [navigate, checkInterval]);
};

export default useWarden;
