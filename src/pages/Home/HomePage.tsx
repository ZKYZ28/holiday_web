import PageWrapper from '../../components/common/PageWrapper.tsx';
import Point from '../../components/common/Point.tsx';
import ButtonForm from '../../components/common/ButtonForm.tsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <PageWrapper>
      <div className="page-size flex w-full justify-center items-center background">

        <div className="lg:w-4/6 w-11/12 p-16 bg-white rounded-2xl box-shadow">
          <div className="flex flex-col">
            <p className="text-blue-800 font-bold lg:text-3xl text-xl">Welcome to</p>
            <div>
              <h1 className="lg:text-8xl text-5xl font-bold lg:mb-0 mb-4">
                Holiday
                <Point />
              </h1>
            </div>
            <p className="mt-3.5 lg:text-3xl text-lg font-bold">
              Rejoingnez nos ??? membres actifs en cliquant juste ici !
            </p>
          </div>

          <div className="h-1/2 flex flex-col justify-around">
            <form className="mb-6 mt-12">
              <ButtonForm text="Chercher" />
            </form>

            <form className="">
              <ButtonForm text="Chercher" />
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
