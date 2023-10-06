import FormContainer from '../../components/common/FormContainer.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import { ChangeEvent, useState } from 'react';
import ButtonForm from '../../components/common/ButtonForm.tsx';
import ButtonLink from '../../components/common/ButtonLink.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';

const Login = () => {
  // EMAIL
  const [emailInput, setEmailInput] = useState('');
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };
  const inputEmail = {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'jean.dupont@gmail.com',
    errorMessage: 'Ça doit être une adresse mail valide !',
    label: 'Courriel :',
    required: true,
  };

  // PASSWORD
  const [passwordInput, setPasswordInput] = useState('');

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const inputPassword = {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: '',
    errorMessage: 'ERROR MESSAGE HERE',
    label: 'Mot de passe :',
    required: true,
  };

  return (
    <PageWrapper>
      <FormContainer title="Se connecter">
        <form>
          <FormInput
            {...inputEmail}
            value={emailInput}
            onChange={handleChangeEmail}
          />

          <FormInput
            {...inputPassword}
            value={passwordInput}
            onChange={handleChangePassword}
          />

          <div className="flex justify-center">
            <ButtonForm text="Se connecter" />
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
