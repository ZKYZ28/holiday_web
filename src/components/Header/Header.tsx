import ButtonLink from './ButtonLink/ButtonLink.tsx';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider.tsx';

function Header() {
  const { user, setJwtToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (evt :  React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setJwtToken(undefined);
    // Supprime toute la stack des pages visitées.
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-white w-full flex md:flex-row flex-col justify-between items-center alig px-12 custom-height border-b-2 border-blue-600">
      <NavLink to="/">
        <h2 className="font-bold text-2xl mt-3 md:m-0">
          Holiday
          <span className="text-blue-800">.</span>
        </h2>
      </NavLink>

        {user ? (
        <>
          <div>
            <ButtonLink text="Vacances" to="/holidays" />
            <ButtonLink text="Chats" to="/chats" />
          </div>
          <div>
            <p>
              <span className="font-bold">
                {' '}
                {user.firstName} {user.lastName}
              </span>{' '}
            </p>
            <button type="button" onClick={handleSubmit} className="text-red-600 font-bold">
              Se déconnecter
            </button>
          </div>
          </>
        ) : (
          <div>
            <ButtonLink text="Nous contacter" to="/contact" />
            <ButtonLink text="Se connecter" to="/login" />
            <ButtonLink text="S'enregister" to="/register" />
          </div>
        )}
    </header>
  );
}

export default Header;
