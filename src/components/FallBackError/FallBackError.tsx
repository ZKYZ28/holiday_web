import {NavLink} from "react-router-dom";

function FallBackError() {

  return (
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-800">Erreur</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Oops ...</p>
            <div className="w-full flex justify-center my-8">
              <img src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif" alt="ERROR IMAGE"/>
            </div>
            <p className="mb-4 text-lg font-light text-gray-500">Nous sommes désolés pour ce désagrément.</p>
            <NavLink to={'/'}>
              <p className=" inline bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-1/6 mt-3.5">Back to Homepage</p>
            </NavLink>
          </div>
        </div>
      </section>
  );
}

export default FallBackError;
