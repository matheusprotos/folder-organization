export interface GroupInvite {
  id: number;
  user_email: string;
  group_id: string;
  group_name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

// Converts JSON strings to/from your types
export class GroupInviteConvert {
  public static toGroupInvite(json: string): GroupInvite {
    return JSON.parse(json);
  }

  public static groupInviteToJson(value: GroupInvite): string {
    return JSON.stringify(value);
  }
}
