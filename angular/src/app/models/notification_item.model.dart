import 'dart:convert';

NotificationItem notificationItemFromJson(String str) =>
    NotificationItem.fromJson(json.decode(str));

String notificationItemToJson(NotificationItem data) =>
    json.encode(data.toJson());

class NotificationItem {
  NotificationItem({
    required this.id,
    required this.userId,
    required this.message,
    required this.createdAt,
    required this.updatedAt,
  });

  String id;
  String userId;
  String message;
  DateTime createdAt;
  DateTime updatedAt;

  factory NotificationItem.fromJson(Map<String, dynamic> json) =>
      NotificationItem(
        id: json["id"],
        userId: json["user_id"],
        message: json["message"],
        createdAt: DateTime.parse(json["created_at"]),
        updatedAt: DateTime.parse(json["updated_at"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "user_id": userId,
        "message": message,
        "created_at": createdAt.toIso8601String(),
        "updated_at": updatedAt.toIso8601String(),
      };
}
