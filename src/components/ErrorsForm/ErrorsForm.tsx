import {ErrorResponse} from "react-router-dom";

function ErrosForm({ axiosError }: { axiosError: ErrorResponse["data"]}) {

    return (
      <section className="bg-white mb-6">
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Erreur
          </div>

          {typeof axiosError === "object" ? (
            <ul className="bg-gray-100 p-3">
              {Object.keys(axiosError.errors as Record<string, any>).map((key) => (
                <div className="my-2" key={key}>
                  <p className="font-bold">{key} :</p>
                  {axiosError.errors[key].map((error: string, index: number) => (
                    <li key={index}>{error}</li>
                  ))}
                </div>
              ))}
            </ul>
          ) : (
            <div className="bg-gray-100 p-3">{axiosError}</div>
          )}

        </div>
      </section>
    );
}

export default ErrosForm;
