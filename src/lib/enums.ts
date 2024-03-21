export const RoleType = {
  SUPER: 'SUPER',
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
} as const;
export const AgentStatus = {
  ACTIVE: 'ACTIVE',
  OFFLINE: 'OFFLINE',
  AWAY: 'AWAY',
} as const;

export const Directions: { [key: string]: string } = {
  descend: 'DESC',
  ascend: 'ASC',
} as const;

export const SearchItemType = {
  DATE: 'date',
  USE: 'use',
  TEAM: 'team',
  MESSAGE: 'message',
  TEXT: 'text',
} as const;
