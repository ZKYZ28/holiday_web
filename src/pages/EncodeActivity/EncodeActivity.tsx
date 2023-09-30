import FormContainer from "../../components/common/FormContainer.tsx";
import FormInput from "../../components/common/FormInput.tsx";
import {ChangeEvent, useState} from "react";
import ButtonForm from "../../components/common/ButtonForm.tsx";
import TextAreaInput from "../../components/common/TextAreaInput.tsx";

const EncodeActivity = () => {

    // NOM
    const [nameInput, setNameInput] = useState('')
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };
    const inputName = {
        name: 'name',
        type: 'text',
        placeholder: 'Aqua poney',
        errorMessage: 'Ça doit être un nom valide !',
        label: 'Nom :',
        required: true,
    }

    // LOCATION
    const [locationInput, setLocationInput] = useState('')
    const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        setLocationInput(e.target.value);
    };
    const inputLocation = {
        name: 'location',
        type: 'text',
        placeholder: 'Rue des caravanes 10 4020 Liège',
        errorMessage: 'Ça doit être un lieu valide !',
        label: 'Lieu :',
        required: true,
    }

    // DATE
    const [startDateInput, setStartDateInput] = useState('')
    const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
        setStartDateInput(e.target.value);
    };
    const inputStartDate = {
        name: 'startDate',
        type: 'datetime',
        placeholder: '',
        errorMessage: 'Ça doit être une date valide !',
        label: 'Date :',
        required: true,
    }

    // PRICE
    const [priceInput, setPriceInput] = useState('')
    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPriceInput(e.target.value);
    };
    const inputPrice = {
        name: 'price',
        type: 'number',
        placeholder: '',
        errorMessage: 'Ça doit être un nombre valide !',
        label: 'Prix :',
        required: true,
    }

    // DESCRIPTION
    const [descriptionTextAreaField, setDescriptionAreaField] = useState('')

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionAreaField(e.target.value);
    };

    const descriptionTextArea = {
        name : 'description',
        type : 'message',
        placeholder : "On va faire de l'aquaponey, trop bien !",
        errorMessage: "",
        label : 'Description',
        required: false
    }

    return (
        <FormContainer title="Encoder activité">
            <form>
                <div className="block lg:flex justify-between w-full">
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputName}
                                   value={nameInput}
                                   onChange={handleChangeName}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputLocation}
                                   value={locationInput}
                                   onChange={handleChangeLocation}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <div className="block lg:flex justify-between w-full">
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputStartDate}
                                   value={startDateInput}
                                   onChange={handleChangeStartDate}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="w-full lg:w-2/5">
                        <FormInput {...inputPrice}
                                   value={priceInput}
                                   onChange={handleChangePrice}
                                   styleInput="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <TextAreaInput {...descriptionTextArea}
                               value={descriptionTextAreaField}
                               onChange={handleChangeDescription}/>

                <div className="flex justify-center">
                    <ButtonForm text="Encoder"/>
                </div>
            </form>
        </FormContainer>
    );
};
export default EncodeActivity