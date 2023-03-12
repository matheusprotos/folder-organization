class DateHelper {
  static List<String> monthsNames = [
    "",
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ"
  ];

  static String formatDateForAPI(String date) {
    List<String> dateParts = date.split("/");

    return "${dateParts[2]}-${dateParts[1]}-${dateParts[0]}";
  }

  static String formatHour(int seconds) {
    Duration duration = Duration(seconds: seconds);
    return "${duration.inHours.toString().padLeft(2, '0')}:${duration.inMinutes.remainder(60).toString().padLeft(2, '0')}:${(duration.inSeconds.remainder(60).toString().padLeft(2, '0'))}";
  }
}
