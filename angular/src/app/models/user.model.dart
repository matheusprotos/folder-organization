import 'dart:convert';

import 'package:despesas_coletivas/shared/models/group_invite.model.dart';

import 'group.model.dart';
import 'notification_item.model.dart';

User userFromJson(String str) => User.fromJson(json.decode(str));

String userToJson(User data) => json.encode(data.toJson());

class User {
  User({
    required this.id,
    this.onesignalID,
    required this.name,
    required this.email,
    required this.emailVerified,
    required this.role,
    this.pictureUrl,
    this.rememberMeToken,
    required this.createdAt,
    required this.updatedAt,
    this.groups,
    this.groupInvites,
    this.notifications,
    this.admin,
  });

  String id;
  String? onesignalID;
  String name;
  String email;
  bool emailVerified;
  String role;
  dynamic pictureUrl;
  dynamic rememberMeToken;
  DateTime createdAt;
  DateTime updatedAt;
  List<Group>? groups;
  List<GroupInvite>? groupInvites;
  List<NotificationItem>? notifications;
  bool? admin;

  factory User.fromJson(Map<String, dynamic> json) => User(
      id: json["id"],
      onesignalID: json["onesignal_id"],
      name: json["name"],
      email: json["email"],
      emailVerified: json["email_verified"],
      role: json["role"],
      pictureUrl: json["picture_url"],
      rememberMeToken: json["remember_me_token"],
      createdAt: DateTime.parse(json["created_at"]),
      updatedAt: DateTime.parse(json["updated_at"]),
      groups: json["groups"] != null
          ? List<Group>.from(json["groups"].map((x) => Group.fromJson(x)))
          : null,
      groupInvites: json["group_invites"] != null
          ? List<GroupInvite>.from(
              json["group_invites"].map((x) => GroupInvite.fromJson(x)))
          : null,
      notifications: json["notifications"] != null
          ? List<NotificationItem>.from(
              json["notifications"].map((x) => NotificationItem.fromJson(x)))
          : null,
      admin: json["admin"]);

  Map<String, dynamic> toJson() => {
        "id": id,
        "onesignal_id": onesignalID,
        "name": name,
        "email": email,
        "email_verified": emailVerified,
        "role": role,
        "picture_url": pictureUrl,
        "remember_me_token": rememberMeToken,
        "created_at": createdAt.toIso8601String(),
        "updated_at": updatedAt.toIso8601String(),
        "groups": groups != null
            ? List<dynamic>.from(groups!.map((x) => x.toJson()))
            : null,
        "group_invites": groupInvites != null
            ? List<dynamic>.from(groupInvites!.map((x) => x.toJson()))
            : null,
        "notifications": notifications != null
            ? List<dynamic>.from(notifications!.map((x) => x.toJson()))
            : null,
        "admin": admin,
      };
}
