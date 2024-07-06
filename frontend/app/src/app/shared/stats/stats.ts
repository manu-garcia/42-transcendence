export interface IUserStatsPlayedVsWon {
  userId: number;
  played: number;
  won: number;
  lost: number;
}

export interface IChartData {
  title: string;
  labels: string[];
  values: number[];
}
