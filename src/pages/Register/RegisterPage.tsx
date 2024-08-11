import FormContainer from '../../components/common/FormContainer.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import ButtonLink from '../../components/Header/ButtonLink/ButtonLink.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import { useCreateAccount } from '../../api/Queries/AuthentificationQueries.ts';
import { useAuth } from '../../provider/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';
import ErrosForm from '../../components/ErrorsForm/ErrorsForm.tsx';
import { AxiosError } from 'axios';
import Loading from '../../components/common/Loading.tsx';

const buildInputRegister = (password: string) => {
  return [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'john.doe@gmail.com',
      errorMessage: 'Veuillez entrer une adresse e-mail valide. Par exemple,"john.doe@gmail.com"',
      pattern: '^[#$%&\'*+\\/=?^`\\{\\|\\}~\\-\\.\\w]+@[\\-A-Za-z0-9]+(?:\\.[\\-a-zA-Z0-9]+)+$',
      label: 'Courriel',
      required: true,
    },
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      placeholder: 'Doe',
      errorMessage: 'Veuillez saisir un nom valide, qui ne doit pas être vide, ne doit pas inclure de chiffres et doit comporter entre 3 et 48 caractères.',
      label: 'Nom :',
      pattern: '[a-zA-ZÀ-ÿ][çÇ\\-\\.a-z\' ]{1,48}[a-zÀ-ÿ]',
      required: true,
    },
    {
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      placeholder: 'John',
      errorMessage: 'Veuillez sasir un prénom valide, qui ne doit pas être vide, ne doit pas inclure de chiffres et doit comporter entre 3 et 28 caractères.',
      pattern: '[a-zA-ZÀ-ÿ][çÇ\\-\\.a-z\' ]{1,28}[a-zÀ-ÿ]',
      label: 'Prénom :',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: '*************',
      errorMessage:
        'Votre mot de passe doit comporter entre 8 à 32 caractères, incluant au minimum un caractère spécial, une majuscule, une minuscule et un chiffre !',
      label: 'Mot de passe :',
      pattern:
        '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*\\.!@$%^&\\(\\)\\{\\}\\[\\]\\:;<>,\\.?\\/~_\\+\\-=\\|çÇ]).{8,32}$',
      required: true,
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: '*************',
      errorMessage: 'Oops! Les mots de passe ne correspondent pas. Veuillez réessayer.',
      label: 'Confirmation du mot de passe :',
      pattern: password,
      required: true,
    },
  ];
};

const RegisterPage = () => {
  const { setJwtToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutateRegister, error: errorMutateRegister } = useCreateAccount() as {
    mutate: any;
    error: AxiosError<unknown>;
  };

  const [values, setValues] = useState({
    email: '',
    lastName: '',
    firstName: '',
    password: '',
    confirmPassword: '',
  });

  const inputRegister = buildInputRegister(values.password);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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
        onSuccess: (response: any) => {
          const accessToken = String(response.data.access_token);
          console.log('AccessToken in onSuccess:', accessToken);
          setJwtToken(accessToken);
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <PageWrapper>
      <FormContainer title="S'enregister">
        <form onSubmit={handleSubmit}>
          {errorMutateRegister ? <ErrosForm axiosError={errorMutateRegister?.response?.data} /> : <> </>}

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
            {isLoading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
              >
                S'enregistrer
              </button>
            )}
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
export default RegisterPage;
