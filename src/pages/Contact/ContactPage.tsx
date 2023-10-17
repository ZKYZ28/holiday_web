import Span from '../../components/common/Span.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/common/FormInput.tsx';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';
import SideContact from './SideContact/SideContact.tsx';

function ContactPage() {
  const [emailInput, setEmailInput] = useState('');
  const [textAreaField, setTextAreaFild] = useState('');

  const inputEmail = {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'jean.dupont@gmail.com',
    errorMessage: 'Ça doit être une adresse mail valide !',
    label: 'Courriel',
    required: true,
  };

  const textAreaFieldContent = {
    id: 'message',
    name: 'message',
    type: 'message',
    placeholder: 'Bonjour, où se trouve votre agence ?',
    errorMessage: 'Votre message doit au moins comporter 10 caractères !',
    label: 'Message',
    required: true,
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaFild(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-screen h-screen bg-red">
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <Span style="font-bold uppercase md:text-5xl sm:text-xs" text="Contactez-nous" />
              <div className="grid grid-cols-1 gap-5 mt-5">
                <FormInput {...inputEmail} value={emailInput} onChange={handleChangeEmail} />
              </div>
              <TextAreaInput {...textAreaFieldContent} value={textAreaField} onChange={handleChangeTextArea} />
              <div className="my-2 w-1/2 lg:w-1/4">
                <ButtonForm text="Envoyer" />
              </div>
            </div>

            <SideContact />
          </div>
        </div>
      </form>
    </>
  );
}

export default ContactPage;
