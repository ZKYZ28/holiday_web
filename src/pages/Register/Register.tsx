import FormContainer from "../../components/common/FormContainer.tsx";
import FormInput from "../../components/common/FormInput.tsx";
import {ChangeEvent, useState} from "react";
import ButtonForm from "../../components/common/ButtonForm.tsx";
import ButtonLink from "../../components/common/ButtonLink.tsx";

const Register = () => {
    // EMAIL
    const [emailInput, setEmailInput] = useState('')
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
    };
    const inputEmail = {
        name: 'email',
        type: 'email',
        placeholder: 'jean.dupont@gmail.com',
        errorMessage: 'Ça doit être une adresse mail valide !',
        label: 'Courriel :',
        required: true,
    }

    // NOM
    const [nameInput, setNameInput] = useState('')
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };
    const inputName = {
        name: 'name',
        type: 'text',
        placeholder: 'Doe',
        errorMessage: 'Ça doit être un nom valide !',
        label: 'Nom :',
        required: true,
    }

    // PRENOM
    const [firstnameInput, setFirstnameInput] = useState('')
    const handleChangeFirstname = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstnameInput(e.target.value);
    };
    const inputFirstName = {
        name: 'email',
        type: 'email',
        placeholder: 'John',
        errorMessage: 'Ça doit être un prénom valide !',
        label: 'Prénom :',
        required: true,
    }

    // PASSWORD
    const [passwordInput, setPasswordInput] = useState('')

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value);
    };

    const inputPassword = {
        name: 'password',
        type: 'password',
        placeholder: '',
        errorMessage: 'ERROR MESSAGE HERE',
        label: 'Mot de passe :',
        required: true,
    }

    // CONFRIM PASSWORD
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

    const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordInput(e.target.value);
    };

    const inputConfirmPassword = {
        name: 'confirmPassword',
        type: 'password',
        placeholder: '',
        errorMessage: 'ERROR MESSAGE HERE',
        label: 'Confirmer mot de passe :',
        required: true,
    }

    return (
        <FormContainer title="S'enregister">
            <form>
                <FormInput {...inputEmail}
                           value={emailInput}
                           onChange={handleChangeEmail}
                           styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />

                <div className="block lg:flex justify-between w-full">
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputName}
                                   value={nameInput}
                                   onChange={handleChangeName}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputFirstName}
                                   value={firstnameInput}
                                   onChange={handleChangeFirstname}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <div className="block lg:flex justify-between w-full">
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputPassword}
                                   value={passwordInput}
                                   onChange={handleChangePassword}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputConfirmPassword}
                                   value={confirmPasswordInput}
                                   onChange={handleChangeConfirmPassword}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <ButtonForm text="S'enregister"/>
                </div>
            </form>

            <div className="flex items-center mt-12 flex-col">
                <div className="h-1 bg-gray-100 w-1/2 rounded-lg mb-10"/>
                <p className="text-xl text-blue-800 font-semibold mb-8">Vous avez déjà un compte ? </p>
                <ButtonLink text="Se connecter" />
            </div>
        </FormContainer>
    );
};
export default Register