export const holidayKeys = {
  all: ['holiday'] as const,
  get: (id: string) => [...holidayKeys.all, id] as const,
  list: () => [...holidayKeys.all, 'list'] as const,
};

export const authentificationKeys = {
  all: ['authentification'] as const,
};

export const invitationsKeys = {
  all: ['invitation'] as const,
  list: () => [...invitationsKeys.all, 'list'] as const,
};

export const participantKeys = {
  all: ['participant'] as const,
  list: () => [...invitationsKeys.all, 'list'] as const,
};

export const weatherKeys = {
  all: ['weather'] as const,
  list: () => [...invitationsKeys.all, 'list'] as const,
};

