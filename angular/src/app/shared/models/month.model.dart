import 'dart:convert';

Month monthFromJson(String str) => Month.fromJson(json.decode(str));

String monthToJson(Month data) => json.encode(data.toJson());

class Month {
  Month(
      {required this.date,
      required this.name,
      required this.active,
      this.onTap});

  DateTime date;
  String name;
  bool active;
  Function()? onTap;

  factory Month.fromJson(Map<String, dynamic> json) => Month(
        date: json["date"],
        name: json["name"],
        active: json["active"],
        onTap: json["on_tap"],
      );

  Map<String, dynamic> toJson() => {
        "date": date,
        "name": name,
        "active": active,
        "on_tap": onTap,
      };
}
