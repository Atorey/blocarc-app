import { User } from 'src/app/users/interfaces/user';

// MODELOS
export interface Boulder {
  _id?: string;
  name: string;
  grade: string;
  wall: string;
  share: boolean;
  image: string;
  creationDate?: string;
  creator?: User;
  mine?: boolean;
  valoration: number;
  holds: Hold[];
}

export interface Wall {
  name: string;
  section: number;
  image: string;
  coordHolds: string;
}

export interface Hold {
  coords: string;
  color: string;
}

export interface Achievement {
  date: string;
  attemps: number;
  grade?: string;
  comment?: string;
  video?: string;
  valoration?: number;
}

// RESPONSES
export interface BouldersResponse {
  boulders: Boulder[];
}

export interface BoulderResponse {
  boulder: Boulder;
}

export interface WallsResponse {
  walls: Wall[];
}
export interface WallResponse {
  wall: Wall;
}

export interface GradesResponse {
  grades: [];
}
export interface AchievementsResponse {
  achievements: Achievement[];
}
export interface AchievementResponse {
  achievement: Achievement;
}

//OTROS
export interface WallImage {
  image: string;
}

export interface Coords {
  output: string;
}
