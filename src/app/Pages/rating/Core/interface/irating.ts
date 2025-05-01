export interface IRating {
    name: string;
    stars: number;
    comment?: string;
    date: string;
}
export interface ReviewsByDate {
    date: string;
    reviews: IRating[];
  }