import Span from '../../components/common/Span.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../../components/common/FormInput.tsx';
import DivBalise from '../../components/common/DivBalise.tsx';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';
import ButtonForm from '../../components/common/ButtonForm.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import PageWrapper from '../../components/common/PageWrapper.tsx';

function ContactPage() {
  const [emailInput, setEmailInput] = useState('');
  const [textAreaField, setTextAreaFild] = useState('');

  const inputEmail = {
    name: 'email',
    type: 'email',
    placeholder: 'jean.dupont@gmail.com',
    errorMessage: 'Ça doit être une adresse mail valide !',
    label: 'Courriel',
    required: true,
  };

  const textAreaFieldContent = {
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
        <DivBalise style="flex justify-center items-center w-screen h-screen bg-red">
          <DivBalise style="container mx-auto my-4 px-4 lg:px-20">
            <DivBalise style="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <Span style="font-bold uppercase md:text-5xl sm:text-xs" text="Contactez-nous" />
              <DivBalise style="grid grid-cols-1 gap-5 mt-5">
                <FormInput
                  {...inputEmail}
                  value={emailInput}
                  onChange={handleChangeEmail}
                  styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </DivBalise>
              <TextAreaInput
                {...textAreaFieldContent}
                value={textAreaField}
                onChange={handleChangeTextArea}
                styleTextArea="my-4 w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              />
              <DivBalise style="my-2 w-1/2 lg:w-1/4">
                <ButtonForm
                  text="Envoyer"
                  style="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                />
              </DivBalise>
            </DivBalise>

            <DivBalise style="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
              <DivBalise style="flex flex-col text-white">
                <Span style="font-bold uppercase md:text-5xl sm:text-xs" text="Passez à notre agence" />
                <p>☀️ Envie d'un petit voyage ☀️ </p>
                <p className="text-gray-300">
                  A la recherche de l'évasion parfaite ? Que vous soyez en quête d'une escapade romantique, d'une
                  aventure entre amis, ou d'un séjour en famille, nous avons exactement ce qu'il vous faut.
                </p>
                <p>Ne tardez plus, venez nous découvrir ! 🤗</p>

                <DivBalise style="flex my-4 w-2/3 lg:w-1/2">
                  <DivBalise style="flex flex-col">
                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                  </DivBalise>
                  <DivBalise style="flex flex-col">
                    <h2 className="text-2xl">Agence principale</h2>
                    <p className="text-gray-400">5555 Thaïlande, Rue des fleurs, UT 73533</p>
                  </DivBalise>
                </DivBalise>

                <DivBalise style="flex my-4 w-2/3 lg:w-1/2">
                  <DivBalise style="flex flex-col">
                    <i className="fas fa-phone-alt pt-2 pr-2" />
                  </DivBalise>
                  <DivBalise style="flex flex-col">
                    <h2 className="text-2xl">Notre numéro</h2>
                    <p className="text-gray-400">Tel: 123-456-777</p>
                  </DivBalise>
                </DivBalise>
                <DivBalise style="flex my-4 w-2/3 lg:w-1/2">
                  <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" className="mr-2">
                    <FontAwesomeIcon icon={faFacebook} size="2xl" />
                  </a>
                  <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                  </a>
                </DivBalise>
              </DivBalise>
            </DivBalise>
          </DivBalise>
        </DivBalise>
      </form>
    </PageWrapper>
  );
}

export default ContactPage;
