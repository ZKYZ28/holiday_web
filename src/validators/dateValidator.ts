import * as dayjs from 'dayjs';
import('dayjs/plugin/isSameOrBefore');

const validateDatesWithoutHour = (startDate: string, endDate: string, withHour: boolean = false): string | null => {
  const now = withHour ? dayjs() : dayjs().startOf('day');

  // Méthode de parse de dayjs : https://day.js.org/docs/en/parse/string
  // Les dates daysjs sont précises à la milleseconde, si on souhaite comparer deux dates sans prendre en considération cela, il faut effectuera un startOf('day'), qui met l'heure à minuit
  const formattedStartDate = withHour ? dayjs(startDate) : dayjs(startDate).startOf('day');
  const formattedEndDate = withHour ? dayjs(endDate) : dayjs(endDate).startOf('day');

  // Pour faire quelque chose de plus strict, exemple ici : https://day.js.org/docs/en/parse/is-valid
  if (!formattedStartDate.isValid() || !formattedEndDate.isValid()) {
    return 'Les dates fournies ne sont pas valides.';
  }

  if (formattedStartDate.isBefore(now)) {
    return 'La date de début doit être supérieure ou égale à la date actuelle.';
  }

  if (formattedEndDate.isBefore(formattedStartDate)) {
    return 'La date de fin doit être supérieure à la date de début.';
  }

  return null;
};

export { validateDatesWithoutHour };
