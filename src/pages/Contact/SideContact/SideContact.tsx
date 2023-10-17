import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function SideContact() {
  return (
    <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
      <div className="flex flex-col text-white">
        <span className="font-bold uppercase md:text-5xl sm:text-xs">Passez à notre agence</span>
        <p>☀️ Envie d'un petit voyage ☀️ </p>
        <p className="text-gray-300">
          A la recherche de l'évasion parfaite ? Que vous soyez en quête d'une escapade romantique, d'une aventure entre
          amis, ou d'un séjour en famille, nous avons exactement ce qu'il vous faut.
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
  );
};

export default SideContact;
