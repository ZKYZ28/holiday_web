export const holidayKeys = {
  all: ['holiday'] as const,
  list: () => [...holidayKeys.all, 'list'] as const,
};
