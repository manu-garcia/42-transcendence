import { IUser, IUserWithAlias } from 'shared/user/user';

export const enum EEventType {
  NONE = '',
  QUICK_GAME = 'quickgame',
  TOURNAMENT = 'tournament',
}

export interface IEvent {
  id: number;
  name: string;
  played: boolean;
  type: EEventType;
  winnerEventGroupId: number;
}

export interface IEventGroup {
  id: number;
  event: IEvent;
  maxUsers: number;
  users: IUser[];
}

export interface IEventGroupUser {
  id: number;
  user: IUser;
  group: IEventGroup;
  alias: string;
}

export interface IEventMatch {
  id: number;
  event: IEvent;
  group1: IEventGroup;
  group2: IEventGroup;
  played: boolean;
  pointsDelta: number;
  winnerEventMatchGroupId: number;
}

export interface IEventPayload {
  name: string;
  type: EEventType;
  users1: IUserWithAlias[];
  users2: IUserWithAlias[];
}
