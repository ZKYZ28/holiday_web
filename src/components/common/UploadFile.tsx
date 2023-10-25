import { ChangeEvent, FC, useState } from 'react';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isAllowedTypes, isHigherFiveMo } from './utils/imageUtils.ts';

type UploadFileProps = {
  onFileSelected: (file: File | null) => void;
};

const UploadFile: FC<UploadFileProps> = ({onFileSelected}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        if (!isAllowedTypes(file.type)) {
          setError('Veuillez sélectionner un fichier au format PNG, JPG ou JPEG.');
          return;
        }

        if (isHigherFiveMo(file.size)) {
          setError('La taille du fichier dépasse la limite de 5 Mo');
          return;
        }
        setError('');

        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImageSrc(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
      // Renvoyer l'image vers le parent
      onFileSelected(file);
      return;
    }
    onFileSelected(null);
  };

  const removeImage = () => {
    setImageSrc(null);
  };

  return (
    <label
      htmlFor="dropzone-file"
      className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-800 bg-white p-6 text-center relative"
    >
      {imageSrc ? (
        <div>
          <img src={imageSrc} alt="Visulation de l'image téléversé" className="object-contain rounded-xl w-60 h-60 " />
          <button onClick={removeImage} className="absolute top-2 right-2  p-1 rounded-full">
            <FontAwesomeIcon
              icon={faX}
              beat
              size="xl"
              className="text-red-500 hover:border-b-2 border-solid border-red-500"
            />
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <h2 className="mt-4 text-xl font-medium text-gray-800 tracking-wide">Personnalisez votre espace !</h2>

          <p className="mt-2 text-gray-500 tracking-wide">Sélectionnez un fichier au format PNG, JPG ou JPEG. </p>

          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
        </div>
      )}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </label>
  );
};

export default UploadFile;
