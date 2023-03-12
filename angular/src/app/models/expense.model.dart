import 'dart:convert';

import 'payment.model.dart';
import 'user.model.dart';

Expense expenseFromJson(String str) => Expense.fromJson(json.decode(str));

String expenseToJson(Expense data) => json.encode(data.toJson());

class Expense {
  Expense({
    required this.id,
    required this.groupId,
    required this.name,
    required this.value,
    required this.status,
    required this.recurrent,
    required this.dueDate,
    required this.createdAt,
    required this.updatedAt,
    required this.payers,
    required this.payments,
  });

  String id;
  String groupId;
  String name;
  double value;
  int status;
  bool recurrent;
  DateTime dueDate;
  DateTime createdAt;
  DateTime updatedAt;
  List<User> payers;
  List<Payment> payments;

  factory Expense.fromJson(Map<String, dynamic> json) => Expense(
        id: json["id"],
        groupId: json["group_id"],
        name: json["name"],
        value: json["value"].toDouble(),
        status: json["status"],
        recurrent: json["recurrent"],
        dueDate: DateTime.parse(json["due_date"]),
        createdAt: DateTime.parse(json["created_at"]),
        updatedAt: DateTime.parse(json["updated_at"]),
        payers: json["payers"] != null
            ? List<User>.from(
                json["payers"].map(
                  (x) => User.fromJson(x),
                ),
              )
            : [],
        payments: json["payments"] != null
            ? List<Payment>.from(
                json["payments"].map(
                  (x) => Payment.fromJson(x),
                ),
              )
            : [],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "group_id": groupId,
        "name": name,
        "value": value,
        "status": status,
        "recurrent": recurrent,
        "due_date": dueDate.toIso8601String(),
        "created_at": createdAt.toIso8601String(),
        "updated_at": updatedAt.toIso8601String(),
        "payers": List<dynamic>.from(
          payers.map(
            (x) => x.toJson(),
          ),
        ),
        "payments": List<dynamic>.from(
          payments.map(
            (x) => x.toJson(),
          ),
        ),
      };
}
