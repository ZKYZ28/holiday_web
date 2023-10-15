import Span from '../../components/common/Span.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/common/FormInput.tsx';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';
import ButtonForm from '../../components/common/ButtonForm.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import PageWrapper from '../../components/common/PageWrapper.tsx';

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
    <PageWrapper>
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

            <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
              <div className="flex flex-col text-white">
                <Span style="font-bold uppercase md:text-5xl sm:text-xs" text="Passez à notre agence" />
                <p>☀️ Envie d'un petit voyage ☀️ </p>
                <p className="text-gray-300">
                  A la recherche de l'évasion parfaite ? Que vous soyez en quête d'une escapade romantique, d'une
                  aventure entre amis, ou d'un séjour en famille, nous avons exactement ce qu'il vous faut.
                </p>
                <p>Ne tardez plus, venez nous découvrir ! 🤗</p>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl">Agence principale</h2>
                    <p className="text-gray-400">5555 Thaïlande, Rue des fleurs, UT 73533</p>
                  </div>
                </div>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-phone-alt pt-2 pr-2" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl">Notre numéro</h2>
                    <p className="text-gray-400">Tel: 123-456-777</p>
                  </div>
                </div>
                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" className="mr-2">
                    <FontAwesomeIcon icon={faFacebook} size="2xl" />
                  </a>
                  <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageWrapper>
  );
}

export default ContactPage;
