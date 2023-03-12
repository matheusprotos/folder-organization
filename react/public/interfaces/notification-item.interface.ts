export interface NotificationItem {
  id: string;
  user_id: string;
  message: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export class NotificationItemConvert {
  public static toNotificationItem(json: string): NotificationItem {
    return JSON.parse(json);
  }

  public static notificationItemToJson(value: NotificationItem): string {
    return JSON.stringify(value);
  }
}
