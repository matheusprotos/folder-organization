export class DateHelper {
  static monthsNames: string[] = [
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
    "DEZ",
  ];

  static formatDateToDatabase = (date: string): string => {
    if (date.length < 10) {
      return "";
    }

    return `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
  };
}
