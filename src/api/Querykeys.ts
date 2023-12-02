export const holidayKeys = {
  all: ['holiday'] as const,
  get: (id: string) => [...holidayKeys.all, id] as const,
  getParticipant: (id: string) => [...holidayKeys.all, 'participant', id] as const,
  listPublished: () => [...holidayKeys.all, 'list-published'] as const,
  list: () => [...holidayKeys.all, 'list-holiday'] as const,
};

export const activityKeys = {
  all: ['activity'] as const,
  get: (id: string) => [...activityKeys.all, id] as const,
  getParticipant: (id: string) => [...activityKeys.all, 'activity-participant', id] as const,
  list: () => [...activityKeys.all, 'list'] as const,
};

export const authentificationKeys = {
  all: ['authentification'] as const,
};

export const statisticsKey = {
  all: ['statistics'] as const,
};

export const mailKeys = {
  all: ['mail'] as const,
};

export const invitationsKeys = {
  all: ['invitation'] as const,
  list: () => [...invitationsKeys.all, 'list'] as const,
};

export const participantKeys = {
  all: ['participant'] as const,
  queryList: (id: string) => [...participantKeys.all, 'list', id] as const,
  queryListByHoliday: (id: string) => [...participantKeys.all, 'list-holiday', id] as const,
  queryListNotYet: (id: string) => [...participantKeys.all, 'list-not-yet', id] as const,
  list: () => [...participantKeys.all, 'list'] as const,
  count: () => [...participantKeys.all, 'count'] as const,
};

export const participateKeys = {
  all: ['participate'] as const,
  list: () => [...participateKeys.all, 'list'] as const,
};

export const weatherKeys = {
  all: ['weather'] as const,
  get: (id: string) => [...weatherKeys.all, 'list', id] as const,
  list: () => [...weatherKeys.all, 'list'] as const,
};
