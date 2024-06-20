import { IUser, IUserWithAlias } from 'shared/user/user';

export const enum EEventType {
  NONE = '',
  QUICK_GAME = 'quick-game',
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
  users: IUserWithAlias[];
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
  winnerEventMatchGroup: IEventGroup;
}

export interface IEventPayload {
  name: string;
  type: EEventType;
  maxUsers: number;
  users1: IUserWithAlias[];
  users2: IUserWithAlias[];
}

export interface IEventGroupDiego {
  id: number;
  event: IEvent;
  maxUsers: number;
  users: IUserWithAlias[];
}

export interface IEventMatchDiego {
  id: number;
  event: IEvent;
  group1: IEventGroupDiego;
  group2: IEventGroupDiego;
  played: boolean;
  pointsDelta: number;
  winnerEventMatchGroup: IEventGroupDiego;
}
