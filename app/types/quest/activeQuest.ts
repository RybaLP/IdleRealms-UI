export interface ActiveQuest {
  monsterName: string;
  monsterImageUrl: string;
  goldReward: number;
  expReward: number;

  startTime: string;  
  finishTime: string; 

  totalDurationSeconds: number;
  secondsLeft: number;

  completed: boolean;
  rewardsClaimed: boolean;
}
