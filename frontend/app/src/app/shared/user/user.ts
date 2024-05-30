export interface LoggedInUser {
  id: number;
  username: string;
  token: string;
}

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
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
