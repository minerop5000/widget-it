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
  _id: string;
}
