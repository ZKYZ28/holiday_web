import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/common/FormInput.tsx';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';
import SideContact from './SideContact/SideContact.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import { useSendMail } from '../../api/Queries/MailQueries.ts';
import { AxiosError } from 'axios';
import ErrosForm from '../../components/ErrorsForm/ErrorsForm.tsx';
import Modal from '../../components/Modal/Modal.tsx';
import Loading from "../../components/common/Loading.tsx";

function ContactPage() {
  const [emailInput, setEmailInput] = useState('');
  const [textAreaField, setTextAreaField] = useState('');
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: Mail, error: errorMail } = useSendMail() as {
    mutate: any;
    error: AxiosError<unknown>;
  };

  const inputEmail = {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'john.doe@gmail.com',
    errorMessage: 'Veuillez entrer une adresse e-mail valide. Par exemple,"john.doe@gmail.com"',
    pattern: '^[#$%&\'*+\\/=?^`\\{\\|\\}~\\-\\.\\w]+@[\\-A-Za-z0-9]+(?:\\.[\\-a-zA-Z0-9]+)+$',
    label: 'Votre adresse mail',
    required: true,
  };

  const textAreaFieldContent = {
    id: 'message',
    name: 'message',
    type: 'message',
    placeholder: 'Bonjour, où se trouve votre agence ?',
    errorMessage:
      'La description doit contenir entre 5 et 500 caractères et peut inclure des lettres, des chiffres, des apostrophes, des tirets, des espaces et certains caractères spéciaux. !',
    label: 'Message',
    required: true,
  };

  const closeModalConfirmation = (): void => {
    setShowModalConfirmation(false);
  };

  const openModalConfirmation = (): void => {
    setShowModalConfirmation(true);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (textAreaField.length > 4) {
      setIsLoading(true);
      Mail(
        {
          senderEmail: emailInput,
          content: textAreaField,
        },
        {
          onSuccess: () => {
            setEmailInput('');
            setTextAreaField('');
            setIsLoading(false);
            openModalConfirmation();
          },
          onError: () => {
            setIsLoading(false);
          }
        }
      );
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaField(e.target.value);
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit} className="page-chat mt-6">
        <div className="flex justify-center items-center w-screen bg-red pb-10">
          <div className="container mx-auto my-4 px-4 lg:px-20 md:mt-0">
            <div className="p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <span className="font-bold uppercase md:text-5xl sm:text-xs">Contactez-nous</span>

              {errorMail ? <ErrosForm axiosError={errorMail?.response?.data} /> : <> </>}

              <div className="grid grid-cols-1 gap-5 mt-5">
                <FormInput {...inputEmail} value={emailInput} onChange={handleChangeEmail} />
              </div>
              <TextAreaInput
                {...textAreaFieldContent}
                value={textAreaField}
                onChange={handleChangeTextArea}
                isOptional={false}
              />
              <div className="my-2 w-1/2 lg:w-1/4">
                {isLoading ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                  >
                    Envoyer
                  </button>
                )}
              </div>
            </div>

            <SideContact />
          </div>
        </div>

        <Modal show={showModalConfirmation} onClose={closeModalConfirmation} title={'Confirmation'}>
          <div className="flex flex-col justify-center items-center w-full">
            <h3 className="font-bold text-green-600">Mail envoyé avec succès !</h3>
            <p className="font-semibold text-blue-800">
              Merci pour votre message, nous traiterons votre demande dès que possible.
            </p>
          </div>
        </Modal>
      </form>
    </PageWrapper>
  );
}

export default ContactPage;
