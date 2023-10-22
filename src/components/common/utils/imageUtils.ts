export const isAllowedTypes = (typeFile: string) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return allowedTypes.includes(typeFile);
};

export const isHigherFiveMo = (sizeFile: number) => {
  const maxSize = 5 * 1024 * 1024; // 5 Mo en octets
  return sizeFile > maxSize;
};
