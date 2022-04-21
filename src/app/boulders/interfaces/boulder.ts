export interface Boulder {
  name: string;
  grade: string;
  wall: string;
  section: string;
  share: Boolean;
  image: string;
  coordHolds: string;
  creationDate?: Date;
  creator?: string;
  mine?: Boolean;
  comments?: [];
}

export interface BouldersResponse {
  boulders: Boulder[];
}

export interface BoulderResponse {
  boulder: Boulder;
}

export interface Wall {
  name: string;
  section: number;
  image: string;
  coordHolds: string;
}

export interface WallsResponse {
  walls: Wall[];
}
export interface WallResponse {
  wall: Wall;
}

export interface WallImage {
  image: string;
}

export interface Coords {
  output: string;
}
