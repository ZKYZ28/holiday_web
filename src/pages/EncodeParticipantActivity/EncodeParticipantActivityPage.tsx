import FormContainer from '../../components/common/FormContainer.tsx';
import { ChangeEvent, useState } from 'react';
import FormInput from '../../components/common/FormInput.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import ListUsers from "../../components/ListUsers/ListUsers.tsx";
import {useParams} from "react-router-dom";
import MembersActivity from "./MembersActivity/MembersActivity.tsx";
import {GetParticipantsByActivity} from "../../api/Queries/ActivityQueries.ts";

const EncodeParticipantActivityPage = () => {
  const { id} = useParams();

  const [searchInput, setSearchText] = useState('');
  const {data : participantsNotYetActivity, isLoading: isLoadingNotYetActivity} = GetParticipantsByActivity(id!, false);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
  };

  const inputSearch = {
    name: 'search',
    type: 'text',
    placeholder: 'John Doe',
    errorMessage: 'Ça doit être un nom valide !',
    label: 'Recherche :',
    required: false,
  };

  return (
    <PageWrapper>
      <PageContent pageTitle="Gestion des participants">
        <FormContainer title="Encoder participant">
          <div className="search">
            <FormInput {...inputSearch} id="outlined-basic" value={searchInput} onChange={searchHandler} />
          </div>
          <ListUsers input={searchInput} participants={participantsNotYetActivity} isLoading={isLoadingNotYetActivity} isForHoliday={false} />
            <MembersActivity />
        </FormContainer>
      </PageContent>
    </PageWrapper>
  );
};
export default EncodeParticipantActivityPage;
