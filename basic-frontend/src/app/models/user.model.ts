export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface User {
  username: string;
  settings: any;
  email: string,
  _id: string;
}
