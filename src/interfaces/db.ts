export interface DBStructure {
  goals: Goals;
  customers: Customer[];
}

export type Goals = { [key: string]: Goal };

export interface Goal {
  id: string;
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
  coupons: Coupons;
  comments: Comment[];
}

export type Coupons = { [key: string]: Coupon };

export interface Coupon {
  text: string;
  label: string;
  link: string;
}

export interface Comment {
  image: string;
  text: string;
}

export interface SubscribedGoal {
  goalId: string;
  actualBalance: number;
  progress: number;
  startingAt: string;
  startingBalance: number;
  remainingDays: number;
}

export interface Customer {
  badges: string[];
  events: Event[];
  id: string;
  image: string;
  mail: string;
  mobile: string;
  name: string;
  peers: string;
  subscribedGoals: SubscribedGoal[];
  username: string;
}
