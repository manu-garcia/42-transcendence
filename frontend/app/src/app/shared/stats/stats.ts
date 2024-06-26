export interface IUserStatsPlayedVsWon {
  userId: number;
  played: number;
  won: number;
}

export interface IChartData {
  title: string;
  labels: string[];
  values: number[];
}
