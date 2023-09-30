import FormContainer from '../../components/common/FormContainer.tsx';
import {ChangeEvent, useState} from 'react';
import List from './ListUsers/ListUsers.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import ButtonForm from '../../components/common/ButtonForm.tsx';

const EncodeParticipant = () => {
  const [searchInput,  setSearchText] = useState('');
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
  };

  const inputSearch = {
    name: 'search',
    type: 'text',
    placeholder: 'John Doe',
    errorMessage: 'Ça doit être un nom valide !',
    label: 'Recherche :',
    required: true,
  };

  return (
    <FormContainer title="Encoder participant">
      <div className="search">
        <FormInput {...inputSearch} id="outlined-basic" value={searchInput} onChange={searchHandler} />
      </div>
      <List input={searchInput} />

      <ButtonForm text="Ajouter" />
    </FormContainer>
  );
};
export default EncodeParticipant;
