export interface User {
  id: string;
  onesignal_id: string;
  name: string;
  email: string;
  email_verified: boolean;
  role: string;
  picture_url?: string;
  remember_me_token: string;
  created_at: Date;
  updated_at: Date;
  groups: any[];
  group_invites: any[];
  notifications: any[];
  admin?: boolean;
}

// Converts JSON strings to/from your types
export class UserConvert {
  public static toUser(json: string): User {
    return JSON.parse(json);
  }

  public static userToJson(value: User): string {
    return JSON.stringify(value);
  }
}
