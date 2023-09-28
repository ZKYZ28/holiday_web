import Span from "../../components/common/Span.tsx";
import {ChangeEvent, useState} from "react";
import FormInput from "../../components/common/FormInput.tsx";
import DivBalise from "../../components/common/DivBalise.tsx";
import TextAreaInput from "../../components/common/TextAreaInput.tsx";
import ButtonForm from "../../components/common/ButtonForm.tsx";


const inputs = [
    {
        id: 1,
        name: 'email',
        type: 'email',
        placeholder: 'jean.dupont@gmail.com',
        errorMessage: 'It should be a valid email address!',
        label: 'Courriel*',
        required: true,
    },
    {
        id: 2,
        name: 'phone',
        type: 'phone',
        placeholder: '+32495768732',
        errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
        label: 'Numéro de téléphone',
        pattern: '^[A-Za-z0-9]{3,16}$',
        required: false,
    },
    {
        id: 3,
        name: 'lastName',
        type: 'text',
        placeholder: 'Dupont',
        errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
        label: 'Nom',
        pattern: '^[A-Za-z0-9]{3,16}$',
        required: true,
    },
    {
        id: 4,
        name: 'firstName',
        type: 'text',
        placeholder: 'Jean',
        errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
        label: 'Prénom',
        pattern: '^[A-Za-z0-9]{3,16}$',
        required: true,
    }
];


function Contact() {

    const [values, setValues] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
    });

    const handleSubmit = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    return <>
        <form onSubmit={handleSubmit}>
            <DivBalise style="flex justify-center items-center w-screen h-screen bg-red">
                <DivBalise style="container mx-auto my-4 px-4 lg:px-20">

                    <DivBalise style="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <Span style="font-bold uppercase text-5xl" text="Contactez-nous"/>
                        <DivBalise style="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            {inputs.map((input) => (
                                <FormInput key={input.id}
                                           {...input}
                                           value={values[input.name]}
                                           onChange={onChange}
                                           styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                />
                            ))}
                            <FormInput/>
                        </DivBalise>
                        <TextAreaInput placeholder="Bonjour, où se trouve votre agence ?" textLabel="Message*"
                                       styleTextArea="my-4 w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></TextAreaInput>
                        <DivBalise style="my-2 w-1/2 lg:w-1/4">
                            <ButtonForm text="Envoyer" style="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline" />
                        </DivBalise>
                    </DivBalise>

                    <div
                        className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
                        <div className="flex flex-col text-white">
                            <h1 className="font-bold uppercase text-4xl my-4">Drop in our office</h1>
                            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Aliquam
                                tincidunt arcu diam,
                                eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed,
                                scelerisque ex.
                            </p>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-map-marker-alt pt-2 pr-2"/>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Main Office</h2>
                                    <p className="text-gray-400">5555 Tailwind RD, Pleasant Grove, UT 73533</p>
                                </div>
                            </div>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-phone-alt pt-2 pr-2"/>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Call Us</h2>
                                    <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                                    <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
                                </div>
                            </div>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer"
                                   className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                                    <i className="fab fa-facebook-f text-blue-900"/>
                                </a>
                                <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank"
                                   rel="noreferrer"
                                   className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                                    <i className="fab fa-linkedin-in text-blue-900"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </DivBalise>
            </DivBalise>
        </form>
    </>
}

export default Contact;

