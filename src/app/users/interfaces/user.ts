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

export interface Timer {
  timer: {
    preparationTime: string;
    workTime: string;
    restTime: string;
    rounds: string;
  };
}
export interface PullUp {
  pullUp: {
    reps: number;
    weight: number;
    ballast: number;
    intensity: number;
  };
}

// RESPONSES
export interface UsersResponse {
  users: User[];
}

export interface UserResponse {
  user: User;
}

export interface GoalResponse {
  goal: number;
}
