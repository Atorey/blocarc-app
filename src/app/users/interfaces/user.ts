export interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  me?: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}
