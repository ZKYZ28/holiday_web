export const holidayKeys = {
  all: ['holiday'] as const,
  get: (id: string) => [...holidayKeys.all, id] as const,
  list: () => [...holidayKeys.all, 'list'] as const,
};

export const authentificationKeys = {
  all: ['authentification'] as const,
};
