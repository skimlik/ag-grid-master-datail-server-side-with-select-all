export interface IEntity {
  id: number;
  name: string;
  year: number;
  details: Array<{ name: string; year: number }>;
}
