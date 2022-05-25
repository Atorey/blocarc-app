export interface User {
  _id?: string;
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

// RESPONSES
export interface UsersResponse {
  users: User[];
}

export interface UserResponse {
  user: User;
}