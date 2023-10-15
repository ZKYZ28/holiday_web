export const holidayKeys = {
  all: ['holiday'] as const,
  get: (id: string) => [...holidayKeys.all, id] as const,
  list: () => [...holidayKeys.all, 'list'] as const,
};

export const authentificationKeys = {
  all: ['authentification'] as const,
};

export const invitationsKeys = {
  all: ['invitations'] as const,
  list: () => [...invitationsKeys.all, 'list'] as const,
};
