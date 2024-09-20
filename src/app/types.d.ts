declare type Player = {
  id: number;
  name: string;
  age: number;
  profilepic: string;
  teamId: number;
  createdAt: Date;
  updatedAt: Date;
};

declare type Team = {
  id: number;
  name: string;
  image: string; 
  players: Player[];
  createdAt: string;
  updatedAt: string;
};