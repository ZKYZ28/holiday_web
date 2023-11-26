export const inputsHolidayTab = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Vacances 2023-2024',
    errorMessage:
      'Le nom doit contenir entre 3 et 50 caractères et peut inclure des lettres, des chiffres, des apostrophes, des tirets et des espaces.',
    label: 'Nom :',
    pattern: '^[#$%*+@[]\\(\\)A-Za-z0-9À-ÿ \'\\-,]{3,50}$',
    required: true,
  },
  {
    id: 'country',
    name: 'country',
    type: 'text',
    placeholder: 'Pays',
    errorMessage:
      'Veuillez entrer un nom de pays valide entre 3 et 50 caractères. Les lettres, chiffres, apostrophes, tirets et espaces sont autorisés.',
    pattern: '^[A-Za-z0-9À-ÿ \'\\-,]{3,50}$',
    label: 'Pays :',
    required: true,
  },
  {
    id: 'number',
    name: 'number',
    type: 'text',
    placeholder: '77 A',
    errorMessage: 'Veuillez entrer un numéro de boîte valide entre 1 à 10 caractères. Exemples : 77, 77A, PO Box 123, PMB 456B.',
    pattern: '^[\\- A-Za-z0-9]{1,10}$',
    label: 'Numéro de boite :',
    required: true,
  },
  {
    id: 'street',
    name: 'street',
    type: 'text',
    placeholder: 'Rue du port',
    errorMessage:
      'Veuillez saisir une adresse de rue valide contenant entre 1 et 100 caractères. Seules les lettres, chiffres, espaces, apostrophes, points, virgules et tirets sont autorisés.',
    pattern: '^[A-Za-zÀ-ÿ0-9 \'.\\,\\-]{1,100}$',
    label: 'Rue :',
    required: true,
  },
  {
    id: 'postalCode',
    name: 'postalCode',
    type: 'text',
    placeholder: '4000',
    errorMessage:
      'Veuillez saisir un code postal valide entre 1 à 15 caractères. Exemples : 4000 (Belgique), 75000 (France), 90210 (USA), K8N 5W6 (Canada).',
    pattern: '^[\\-, A-Za-z0-9]{1,15}$',
    label: 'Code postal :',
    required: true,
  },
  {
    id: 'locality',
    name: 'locality',
    type: 'text',
    placeholder: 'Liège',
    errorMessage:
      'Veuillez saisir une localité valide contenant entre 1 et 100 caractères. Seules les lettres, chiffres, espaces, apostrophes, points, virgules et tirets sont autorisés.',
    pattern: '^[A-Za-zÀ-ÿ0-9 \'\\.,\\-]{1,100}$',
    label: 'Lieu :',
    required: true,
  },
  {
    id: 'startDate',
    name: 'startDate',
    type: 'date',
    placeholder: '20/10/2023',
    errorMessage:
      'La date de début doit respecter le format de valide comme JJ/MM/YYYY (20/10/2023) ou YYYY/MM/DD(2023/10/20)',
    label: 'Date de début :',
    required: true,
  },
  {
    id: 'endDate',
    name: 'endDate',
    type: 'date',
    placeholder: '23/10/2023',
    errorMessage:
      'La date de fin doit respecter le format de valide comme JJ/MM/YYYY (23/10/2023) ou YYYY/MM/DD (2023/10/23)',
    label: 'Date de fin :',
    required: true,
  },
];

export const descriptionTextAreaHolidayObject =  {
  id: 'description',
  name: 'description',
  type: 'message',
  placeholder: 'On va faire de l\'aqua poney, trop bien !',
  errorMessage: 'Veuillez saisir un message d\'au moins 10 caractères',
  label: 'Description',
  required: false,
};


export const inputsActivityTab = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Drift',
    errorMessage:
      'Le nom doit contenir entre 3 et 50 caractères et peut inclure des lettres, des chiffres, des apostrophes, des tirets et des espaces et certains caractères spéciaux.',
    label: 'Nom :',
    pattern: '^[#$%*+@[]\\(\\)A-Za-z0-9À-ÿ \'\\-,]{3,50}$',
    required: true,
  },
  {
    id: 'country',
    name: 'country',
    type: 'text',
    placeholder: 'Pays',
    errorMessage:
      'Veuillez entrer un nom de pays valide entre 3 et 50 caractères. Les lettres, chiffres, apostrophes, tirets et espaces sont autorisés.',
    pattern: '^[A-Za-z0-9À-ÿ \'\\-,]{3,50}$',
    label: 'Pays :',
    required: true,
  },
  {
    id: 'number',
    name: 'number',
    type: 'text',
    placeholder: '77 A',
    errorMessage: 'Veuillez entrer un numéro de boîte valide entre 1 à 10 caractères. Exemples : 77, 77A, PO Box 123, PMB 456B.',
    pattern: '^[\\- A-Za-z0-9]{1,10}$',
    label: 'Numéro de boite :',
    required: true,
  },
  {
    id: 'street',
    name: 'street',
    type: 'text',
    placeholder: 'Rue du port',
    label: 'Rue :',
    errorMessage:
      'Veuillez saisir une adresse de rue valide contenant entre 1 et 100 caractères. Seules les lettres, chiffres, espaces, apostrophes, points, virgules et tirets sont autorisés.',
    pattern: '^[A-Za-zÀ-ÿ0-9 \'.\\,\\-]{1,100}$',
    required: true,
  },
  {
    id: 'postalCode',
    name: 'postalCode',
    type: 'text',
    placeholder: '4000',
    errorMessage:
      'Veuillez saisir un code postal valide entre 1 à 15 caractères. Exemples : 4000 (Belgique), 75000 (France), 90210 (USA), K8N 5W6 (Canada).',
    pattern: '^[\\-, A-Za-z0-9]{1,15}$',
    label: 'Code postal :',
    required: true,
  },
  {
    id: 'locality',
    name: 'locality',
    type: 'text',
    placeholder: 'Liège',
    errorMessage:
      'Veuillez saisir une localité valide contenant entre 1 et 100 caractères. Seules les lettres, chiffres, espaces, apostrophes, points, virgules et tirets sont autorisés.',
    pattern: '^[A-Za-zÀ-ÿ0-9 \'\\.,\\-]{1,100}$',
    label: 'Lieu :',
    required: true,
  },
  {
    id: 'startDate',
    name: 'startDate',
    type: 'datetime-local',
    placeholder: '',
    errorMessage:
      'La date de début doit respecter le format de valide comme JJ/MM/YYYY HH:mm (20/10/2023 20:00) ou YYYY/MM/DD HH:mm (2023/10/23 20:30)',
    label: 'Date de début :',
    required: true,
  },
  {
    id: 'endDate',
    name: 'endDate',
    type: 'datetime-local',
    placeholder: '',
    errorMessage:
      'La date de fin doit respecter le format de valide comme JJ/MM/YYYY HH:mm (23/10/2023 20:00) ou YYYY/MM/DD HH:mm (2023/10/23 20:30)',
    label: 'Date de fin :',
    required: true,
  },
  {
    id: 'price',
    name: 'price',
    type: 'number',
    placeholder: '',
    min: 0,
    step: 0.01,
    pattern: '^\\d+(\\.\\d{1,2})?$\n',
    errorMessage: 'Ça doit être un nombre valide !',
    label: 'Prix :',
    required: true,
  },
];

export const descriptionTextAreaActivityObject = {
  id: 'description',
  name: 'description',
  type: 'message',
  placeholder: 'On va faire de l\'aqua poney, trop bien !',
  errorMessage: 'Veuillez saisir un message d\'au moins 10 caractères',
  label: 'Description',
  required: false,
};
