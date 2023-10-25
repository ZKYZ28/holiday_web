import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/common/FormInput.tsx';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';
import SideContact from './SideContact/SideContact.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import {useSendMail} from "../../api/Queries/MailQueries.ts";

function ContactPage() {
  const [emailInput, setEmailInput] = useState('');
  const [textAreaField, setTextAreaFild] = useState('');
  const {mutate: Mail} = useSendMail();

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
    errorMessage: 'Votre message doit au moins comporter 10 caractères !',
    label: 'Message',
    required: true,
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(textAreaField.length)
    if(textAreaField.length > 10){
      Mail(
        {
          senderEmail : emailInput,
          content : textAreaField
        },
        {
          onError: () => alert('An error occurred'),
          onSuccess: () => alert("SUCCES"),
        }
      );
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaFild(e.target.value);
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit} className="page-chat">
        <div className="flex justify-center items-center w-screen bg-red pb-10 h-full">
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <span className="font-bold uppercase md:text-5xl sm:text-xs">Contactez-nous</span>
              <div className="grid grid-cols-1 gap-5 mt-5">
                <FormInput {...inputEmail} value={emailInput} onChange={handleChangeEmail} />
              </div>
              <TextAreaInput {...textAreaFieldContent} value={textAreaField} onChangeDescritpion={handleChangeTextArea} />
              <div className="my-2 w-1/2 lg:w-1/4">
                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                >
                  Envoyer
                </button>
              </div>
            </div>

            <SideContact />
          </div>
        </div>
      </form>
    </PageWrapper>
  );
}

export default ContactPage;
