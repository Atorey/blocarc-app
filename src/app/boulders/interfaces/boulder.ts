// MODELOS
export interface Boulder {
  name: string;
  grade: string;
  wall: string;
  share: boolean;
  image: string;
  creator?: string;
  mine?: boolean;
  comments?: [];
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

//OTROS
export interface WallImage {
  image: string;
}

export interface Coords {
  output: string;
}
