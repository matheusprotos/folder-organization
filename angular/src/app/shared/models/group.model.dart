import 'dart:convert';

import 'user.model.dart';

Group groupFromJson(String str) => Group.fromJson(json.decode(str));

String groupToJson(Group data) => json.encode(data.toJson());

class Group {
  Group({
    required this.id,
    required this.name,
    required this.membersCount,
    required this.createdAt,
    required this.updatedAt,
    this.admin,
    this.users,
  });

  String id;
  String name;
  int membersCount;
  DateTime createdAt;
  DateTime updatedAt;
  bool? admin;
  List<User>? users;

  factory Group.fromJson(Map<String, dynamic> json) => Group(
        id: json["id"],
        name: json["name"],
        membersCount: json["members_count"],
        createdAt: DateTime.parse(json["created_at"]),
        updatedAt: DateTime.parse(json["updated_at"]),
        admin: json["admin"],
        users: json["users"] != null
            ? List<User>.from(json["users"].map((x) => User.fromJson(x)))
            : null,
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "members_count": membersCount,
        "created_at": createdAt.toIso8601String(),
        "updated_at": updatedAt.toIso8601String(),
        "admin": admin,
        "users": users != null
            ? List<dynamic>.from(users!.map((x) => x.toJson()))
            : null,
      };
}
