export interface Boulder {
    name: String;
    grade: String;
    wall: String;
    section: String;
    share: Boolean;
    image: String;
    coordHolds: String;
    creationDate?: Date;
    creator?: String;
    mine?: Boolean;
    comments?: []
}

export interface BouldersResponse {
    boulders: Boulder[];
  }
  
  export interface BoulderResponse {
    boulder: Boulder;
  }
  