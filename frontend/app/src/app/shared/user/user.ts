import moment from 'moment';

export interface LoggedInUser {
  id: number;
  username: string;
  token: string;
}

export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  friends: IUser[];
  lastActivity: moment.Moment;
}

export interface IUserCredentials {
  username: string;
  password: string;
  password2: string;
}

export interface IUserWithAlias {
  user: IUser;
  alias: string;
}
