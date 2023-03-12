import { User } from './user.interface';

export interface Group {
  id: string;
  name: string;
  members_count: number;
  expenditures_count: number;
  created_at: string;
  updated_at: string;
  admin: boolean;
  users: User[];
}

export class GroupConvert {
  public static toGroup(json: string): Group {
    return JSON.parse(json);
  }

  public static groupToJson(value: Group): string {
    return JSON.stringify(value);
  }
}
