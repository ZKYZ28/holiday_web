import FormContainer from '../../components/common/FormContainer.tsx';
import { ChangeEvent, useState } from 'react';
import FormInput from '../../components/common/FormInput.tsx';
import ListUsers from '../../components/ListUsers/ListUsers.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import {Participant} from "../../api/Models/Participant.ts";
import {useParams} from "react-router-dom";
import {useGetParticipantsByHoliday} from "../../api/Queries/HolidayQueries.ts";

const EncodeParticipantHolidayPage = () => {
  const { id } = useParams();
  const [searchInput, setSearchText] = useState('');
  const { data: participants, isLoading }: { data: Participant[]; isLoading: boolean } = useGetParticipantsByHoliday(id!, false);

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
    required: true,
  };

  return (
    <PageWrapper>
      <PageContent pageTitle="Encoder participant">
        <FormContainer title="Encoder participant">
          <div className="search">
            <FormInput {...inputSearch} id="outlined-basic" value={searchInput} onChange={searchHandler} />
          </div>
          <ListUsers input={searchInput} participants={participants} isLoading={isLoading} isForHoliday={true} />
        </FormContainer>
      </PageContent>
    </PageWrapper>
  );
};
export default EncodeParticipantHolidayPage;
