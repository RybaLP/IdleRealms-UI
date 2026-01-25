export interface Quest {
  monsterId: number; 
  title: string;
  description: string;
  imageUrl: string;
  goldReward: number;
  expReward: number;
  durationInSeconds: number;
  difficulty: number; 
  energyCost: number;
}
