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

      <ul className="flex justify-around w-full md:w-1/3 mb-3 md:m-0">
        <ButtonLink text="ContactPage" to="/contact" />
        <ButtonLink text="Holidays" to="/holidays" />
        <ButtonLink text="Chats" to="/chats" />
        <ButtonLink text="ContactPage" to="/contact" />
        {user ? (
          <div>
            <p>
              Bonjour,{' '}
              <span className="font-bold">
                {' '}
                {user.firstName} {user.lastName}
              </span>{' '}
            </p>
            <button type="button" onClick={handleSubmit} className="text-red-600 font-bold">
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <ButtonLink text="Login" to="/login" />
            <ButtonLink text="Register" to="/register" />
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
