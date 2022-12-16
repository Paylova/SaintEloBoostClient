import { ListTier } from '../tiers/list-tier';

export class ListDivision {
  id: string;
  name: string;
  price: number;
  rank: number;
  lp: string;
  image: string;
  Tier: ListTier;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
