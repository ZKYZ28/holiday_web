import FormContainer from '../../components/common/FormContainer.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import { FormEvent, useState } from 'react';
import ButtonForm from '../../components/common/ButtonForm.tsx';
import ButtonLink from '../../components/common/ButtonLink.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import { useCreateAccount } from '../../api/Queries/AuthentificationQueries.ts';
import { useAuth } from '../../provider/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';

const inputRegister = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'john.doe@gmail.com',
    errorMessage: 'L\'adresse mail doit être valide !',
    label: 'Courriel',
    required: true,
  },
  {
    id: 'lastName',
    name: 'lastName',
    type: 'text',
    placeholder: 'Doe',
    errorMessage: 'Votre prénom ne peut pas être vide, ni contenir de chiffres. !',
    label: 'Nom :',
    required: true,
  },
  {
    id: 'firstName',
    name: 'firstName',
    type: 'text',
    placeholder: 'John',
    errorMessage: 'Votre prénom ne peut pas être vide, ni contenir de chiffres.  !',
    label: 'prénom :',
    required: true,
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: '*************',
    errorMessage: 'Votre mot de passe ne peut pas être vide, au minimum 8 caractères  !',
    label: 'Mot de passe :',
    required: true,
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password',
    placeholder: '*************',
    errorMessage: '',
    label: 'Mot de passe :',
    required: true,
  },
];

const Register = () => {
  const { token, setJwtToken } = useAuth();
  const navigate = useNavigate();

  const { mutate: mutateRegister } = useCreateAccount();

  const [values, setValues] = useState({
    email: '',
    lastName: '',
    firstName: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateRegister(
      {
        email: values.email,
        lastName: values.lastName,
        firstName: values.firstName,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
      {
        // Recuperer le token renvoyé par l'api
        onSuccess: (data) => {
          // console.log(data);
          setJwtToken(data.data);
          // Récupérer les infos de l'utilisateru ???
          console.log(token);
          navigate('/holidays', { replace: true });
        },
      }
    );
  };

  return (
    <PageWrapper>
      <FormContainer title="S'enregister">
        <form onSubmit={handleSubmit}>
          <FormInput {...inputRegister[0]} value={values.email} onChange={onChange} />

          <div className="block lg:flex justify-between w-full">
            <div className="w-full lg:w-2/5">
              <FormInput {...inputRegister[1]} value={values.lastName} onChange={onChange} />
            </div>
            <div className="w-full lg:w-2/5">
              <FormInput {...inputRegister[2]} value={values.firstName} onChange={onChange} />
            </div>
          </div>

          <div className="block lg:flex justify-between w-full">
            <div className="w-full lg:w-2/5">
              <FormInput {...inputRegister[3]} value={values.password} onChange={onChange} />
            </div>
            <div className="w-full lg:w-2/5">
              <FormInput {...inputRegister[4]} value={values.confirmPassword} onChange={onChange} />
            </div>
          </div>

          <div className="flex justify-center">
            <ButtonForm text="S'enregister" />
          </div>
        </form>

        <div className="flex items-center mt-12 flex-col">
          <div className="h-1 bg-gray-100 w-1/2 rounded-lg mb-10" />
          <p className="text-xl text-blue-800 font-semibold mb-8">Vous avez déjà un compte ? </p>
          <ButtonLink text="Se connecter" to="/login" />
        </div>
      </FormContainer>
    </PageWrapper>
  );
};
export default Register;
