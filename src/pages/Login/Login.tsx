import FormContainer from '../../components/common/FormContainer.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import ButtonLink from '../../components/Header/ButtonLink/ButtonLink.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import { useAuth } from '../../provider/AuthProvider.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginAccount } from '../../api/Queries/AuthentificationQueries.ts';

const inputEmail = {
  id: 'email',
  name: 'email',
  type: 'text',
  placeholder: 'john.doe@gmail.com',
  pattern: '^[#$%&\'*+\\/=?^`\\{\\|\\}~\\-\\.\\w]+@[\\-A-Za-z0-9]+(?:\\.[\\-a-zA-Z0-9]+)+$',
  errorMessage: 'Veuillez entrer une adresse e-mail valide. Par exemple,"john.doe@gmail.com"',
  label: 'Courriel :',
  required: true,
};

const inputPassword = {
  id: 'password',
  name: 'password',
  type: 'password',
  placeholder: '',
  errorMessage:
    'Votre mot de passe doit comporter au moins 8 caractères, incluant au minimum un caractère spécial, une majuscule, une minuscule et un chiffre ! ',
  pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*\\.!@$%^&\\(\\)\\{\\}\\[\\]\\:;<>,\\.?\\/~_\\+\\-=\\|çÇ]).{8,32}$',
  label: 'Mot de passe :',
  required: true,
};

const Login = () => {
  const { setJwtToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: mutateLogin } = useLoginAccount();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateLogin(
      {
        email: emailInput,
        password: passwordInput,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setJwtToken(data.data);
          navigate('/holidays', { replace: true });
        },
      }
    );
  };

  return (
    <PageWrapper>
      <FormContainer title="Se connecter">
        {location.state && <p className="text-red-600 font-bold text-center">{location.state.message}</p>}
        <form onSubmit={handleSubmit}>
          <FormInput {...inputEmail} value={emailInput} onChange={handleChangeEmail} />

          <FormInput {...inputPassword} value={passwordInput} onChange={handleChangePassword} />

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
              Se connecter
            </button>
          </div>
        </form>

        <div className="flex items-center mt-12 flex-col">
          <div className="h-1 bg-gray-100 w-1/2 rounded-lg mb-10" />
          <p className="text-xl text-blue-800 font-semibold mb-8">Vous n'avez pas encore de compte ? </p>
          <ButtonLink text="S'enregistrer" to="/register" />
        </div>
      </FormContainer>
    </PageWrapper>
  );
};
export default Login;
