export interface DBStructure {
  availableGoals: AvailableGoal[];
  customers: Customer[];
}

export interface AvailableGoal {
  comments: Comment[];
  goal: Goal;
}

export interface Customer {
  badges: string[];
  id: string;
  image: string;
  mail: string;
  mobile: string;
  name: string;
  peers: string;
  subscribedGoals: SubscribedGoal[];
  username: string;
}

export interface SubscribedGoal {
  actualBalance: number;
  goal: Goal;
  progress: number;
  startingAt: string;
  startingBalance: number;
}

export interface Goal {
  actualTotalSaving: number;
  benefit: string;
  deadline: string;
  description: string;
  numberOfFollowers: number;
  image: string;
  name: string;
  peers: string;
  progress: number;
  rewardImage: string;
  rewardTextSuccess: string;
  target: number;
  targetTotalSaving: number;
  vendor: string;
}

export interface Comment {
  image: string;
  text: string;
}
