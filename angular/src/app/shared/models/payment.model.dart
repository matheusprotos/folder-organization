import 'dart:convert';

Payment paymentFromJson(String str) => Payment.fromJson(json.decode(str));

String paymentToJson(Payment data) => json.encode(data.toJson());

class Payment {
  Payment({
    required this.id,
    required this.userId,
    required this.expenditureId,
    required this.value,
    required this.userName,
    required this.userPictureURL,
    required this.attachment,
    required this.createdAt,
    required this.updatedAt,
  });

  String id;
  String userId;
  String expenditureId;
  double value;
  String userName;
  String? userPictureURL;
  String? attachment;
  DateTime createdAt;
  DateTime updatedAt;

  factory Payment.fromJson(Map<String, dynamic> json) => Payment(
        id: json["id"],
        userId: json["user_id"],
        expenditureId: json["expenditure_id"],
        value: json["value"].toDouble(),
        userName: json["user_name"],
        userPictureURL: json["user_picture_url"],
        attachment: json["attachment"],
        createdAt: DateTime.parse(json["created_at"]),
        updatedAt: DateTime.parse(json["updated_at"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "user_id": userId,
        "expenditure_id": expenditureId,
        "value": value,
        "user_name": userName,
        "user_picture_url": userPictureURL,
        "attachment": attachment,
        "created_at": createdAt.toIso8601String(),
        "updated_at": updatedAt.toIso8601String(),
      };
}
