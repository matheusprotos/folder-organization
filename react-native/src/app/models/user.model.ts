export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_calling_code: string;
  email: string;
}

export class UserConvert {
  public static toUser(json: string): User {
    return JSON.parse(json);
  }

  public static userToJson(value: User): string {
    return JSON.stringify(value);
  }
}
