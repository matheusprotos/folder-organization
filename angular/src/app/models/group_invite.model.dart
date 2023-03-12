import 'dart:convert';

GroupInvite groupInviteFromJson(String str) =>
    GroupInvite.fromJson(json.decode(str));

String groupInviteToJson(GroupInvite data) => json.encode(data.toJson());

class GroupInvite {
  GroupInvite({
    required this.id,
    required this.userEmail,
    required this.groupId,
    required this.groupName,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
  });

  int id;
  String userEmail;
  String groupId;
  String groupName;
  int status;
  DateTime createdAt;
  DateTime updatedAt;

  factory GroupInvite.fromJson(Map<String, dynamic> json) => GroupInvite(
        id: json["id"],
        userEmail: json["user_email"],
        groupId: json["group_id"],
        groupName: json["group_name"],
        status: json["status"],
        createdAt: DateTime.parse(json["created_at"]),
        updatedAt: DateTime.parse(json["updated_at"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "user_email": userEmail,
        "group_id": groupId,
        "group_name": groupName,
        "status": status,
        "created_at": createdAt.toIso8601String(),
        "updated_at": updatedAt.toIso8601String(),
      };
}
